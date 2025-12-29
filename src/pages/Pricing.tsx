import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Lock, CreditCard, Shield, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const freeFeatures = [
  "Overall resume score",
  "Category breakdown",
  "Failure summary preview",
  "Basic AI analysis",
];

const proFeatures = [
  "Full AI failure explanation",
  "Section-by-section rebuild guide",
  "Keyword & role mapping",
  "High-impact rewrite suggestions",
  "Market-aligned activity plan",
  "Downloadable PDF report",
];

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Show toast if payment was canceled
  if (searchParams.get("payment") === "canceled") {
    toast({
      title: "Payment canceled",
      description: "No charges were made. You can try again when ready.",
    });
  }

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment");

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "Unable to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <div className="container max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Unlock Your Rebuild Roadmap
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Get the full AI analysis and step-by-step guidance to fix your resume.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Free Plan */}
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="mb-6">
                <p className="text-sm font-medium text-muted-foreground">Free</p>
                <p className="mt-2 text-4xl font-bold text-foreground">$0</p>
                <p className="mt-1 text-sm text-muted-foreground">Basic analysis</p>
              </div>

              <ul className="space-y-3">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
                <li className="flex items-center gap-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Rebuild roadmap locked</span>
                </li>
              </ul>

              <Button asChild variant="outline" size="lg" className="mt-8 w-full">
                <Link to="/upload">Get Free Score</Link>
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-xl border-2 border-accent bg-card p-8">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">
                  Recommended
                </span>
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-accent">Pro AI Analysis</p>
                <p className="mt-2 text-4xl font-bold text-foreground">$29</p>
                <p className="mt-1 text-sm text-muted-foreground">One-time payment</p>
              </div>

              <ul className="space-y-3">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-accent" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                variant="premium"
                size="lg"
                className="mt-8 w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Opening checkout...
                  </>
                ) : (
                  "Unlock with Stripe"
                )}
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Secure checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm">All major cards accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor">
                <path d="M13.6 8h4.8v16h-4.8zM8 8h4v16H8zM19.2 8H24c1.8 0 3.2 1.4 3.2 3.2v9.6c0 1.8-1.4 3.2-3.2 3.2h-4.8V8z" />
              </svg>
              <span className="text-sm">Powered by Stripe</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
