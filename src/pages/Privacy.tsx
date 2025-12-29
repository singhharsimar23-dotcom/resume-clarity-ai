import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <div className="container max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">Last updated: January 2025</p>

          <div className="mt-8 space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground">Data Collection</h2>
              <p className="mt-3">
                We collect resume files you upload for analysis. These files are processed
                by our AI systems and stored securely. We do not sell or share your resume
                data with third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Data Processing</h2>
              <p className="mt-3">
                Your resume is analyzed using machine learning models to generate scores
                and recommendations. Processing is performed on secure servers with
                encryption in transit and at rest.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Data Retention</h2>
              <p className="mt-3">
                We retain your resume and analysis results for 30 days after your last
                login. You may request deletion of your data at any time by contacting
                support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Payment Information</h2>
              <p className="mt-3">
                Payment processing is handled by Stripe. We do not store credit card
                numbers or full payment details on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Contact</h2>
              <p className="mt-3">
                For privacy inquiries, contact us at privacy@resumeai.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
