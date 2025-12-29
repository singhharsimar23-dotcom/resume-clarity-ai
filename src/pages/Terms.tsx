import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <div className="container max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
          <p className="mt-2 text-muted-foreground">Last updated: January 2025</p>

          <div className="mt-8 space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground">Service Description</h2>
              <p className="mt-3">
                ResumeAI provides AI-powered resume analysis and improvement recommendations.
                Our service analyzes your resume against current hiring market patterns and
                provides actionable feedback.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">No Guarantees</h2>
              <p className="mt-3">
                We do not guarantee employment outcomes. Our analysis provides objective
                feedback based on hiring patterns, but job market success depends on many
                factors outside our control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">User Responsibilities</h2>
              <p className="mt-3">
                You are responsible for the accuracy of information in your resume. Do not
                upload resumes containing false information or content you do not have
                rights to share.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Payment Terms</h2>
              <p className="mt-3">
                Pro analysis is a one-time payment. Refunds are available within 24 hours
                of purchase if you have not accessed the full report. Contact support for
                refund requests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Intellectual Property</h2>
              <p className="mt-3">
                You retain ownership of your resume content. We retain rights to our
                analysis methodology, AI models, and platform design.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Contact</h2>
              <p className="mt-3">
                For questions about these terms, contact us at legal@resumeai.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
