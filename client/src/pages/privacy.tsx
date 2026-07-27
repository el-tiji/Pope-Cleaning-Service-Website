import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { businessInfo } from "@/config/businessInfo";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-[120px] pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-bold text-[#00275F] mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">How {businessInfo.businessName} handles your information.</p>

          <div className="space-y-8 text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#00275F] mb-3">What we collect</h2>
              <p>
                When you request a quote or contact us, we collect the details you provide: your name, contact
                information (email, phone), property details relevant to the cleaning service (suburb, postcode,
                property type, rooms, extras, scheduling preferences and access notes), and any messages you send us,
                including through our website chat assistant.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#00275F] mb-3">How we use it</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To prepare and send your cleaning quote and answer your enquiry.</li>
                <li>To coordinate and deliver the services you book.</li>
                <li>To contact you using your preferred method (email, phone or WhatsApp).</li>
                <li>To send occasional promotions — only if you opted in, and you can opt out at any time.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#00275F] mb-3">What we don't do</h2>
              <p>
                We do not sell your personal information. We only share it with service providers we use to run our
                business (such as our website and messaging platforms) as needed to respond to you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#00275F] mb-3">Storage and security</h2>
              <p>
                Your quote request details are stored securely and access is restricted to our team. We keep
                information only as long as needed to provide our services and meet our business obligations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#00275F] mb-3">Your choices</h2>
              <p>
                You can ask us to update or delete your details, or to stop contacting you, at any time. Reach us at{" "}
                <a href={`mailto:${businessInfo.email}`} className="text-[#2F7FD1] font-medium hover:underline">
                  {businessInfo.email}
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${businessInfo.phonePrimary.replace(/\s+/g, "")}`}
                  className="text-[#2F7FD1] font-medium hover:underline"
                >
                  {businessInfo.phonePrimary}
                </a>
                .
              </p>
            </section>

            <p className="text-sm text-muted-foreground pt-4 border-t border-border">
              {businessInfo.businessName} · ABN {businessInfo.abn} · {businessInfo.location}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
