import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import type { Express, RequestHandler } from "express";
import { pool } from "./db";
import { storage } from "./storage";
import type { User } from "@shared/schema";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function verifyPassword(supplied: string, stored: string): Promise<boolean> {
  const [hashed, salt] = stored.split(".");
  if (!hashed || !salt) return false;
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return hashedBuf.length === suppliedBuf.length && timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express): void {
  const PgStore = connectPg(session);

  app.set("trust proxy", 1);
  app.use(
    session({
      store: new PgStore({ pool, tableName: "sessions", createTableIfMissing: false }),
      secret: process.env.SESSION_SECRET || "dev-only-secret-change-me",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await storage.getUserByEmail(email.toLowerCase().trim());
        if (!user || !(await verifyPassword(password, user.passwordHash))) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user: Express.User, done) => done(null, (user as User).id));
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user ?? false);
    } catch (err) {
      done(err);
    }
  });
}

/** Server-side gate for every internal endpoint. */
export const requireStaff: RequestHandler = (req, res, next) => {
  const user = req.user as User | undefined;
  if (!req.isAuthenticated() || !user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  if (user.role !== "admin" && user.role !== "staff") {
    return res.status(403).json({ message: "Staff access required" });
  }
  next();
};

/**
 * Seeds (or re-syncs) the admin user from ADMIN_EMAIL + ADMIN_PASSWORD.
 * Rotating the ADMIN_PASSWORD secret updates the stored hash on next boot.
 */
export async function seedAdminUser(): Promise<void> {
  const email = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn("[auth] ADMIN_EMAIL / ADMIN_PASSWORD not set — admin user not seeded yet");
    return;
  }
  const existing = await storage.getUserByEmail(email);
  if (!existing) {
    await storage.createUser({
      email,
      passwordHash: await hashPassword(password),
      name: "Pope Cleaning Admin",
      role: "admin",
    });
    console.log(`[auth] Seeded admin user ${email}`);
    return;
  }
  if (!(await verifyPassword(password, existing.passwordHash))) {
    await storage.updateUserPassword(existing.id, await hashPassword(password));
    console.log(`[auth] Updated admin password for ${email}`);
  }
}
