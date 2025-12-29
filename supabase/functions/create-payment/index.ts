import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Get request body for optional email
    const body = await req.json().catch(() => ({}));
    const customerEmail = body.email;

    // Create a one-time payment session (guest checkout supported)
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: [
        {
          price: "price_1SjdlhQ04cmoVuRQNO3oXNai",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/report?payment=success`,
      cancel_url: `${req.headers.get("origin")}/pricing?payment=canceled`,
    };

    // If email provided, check for existing customer
    if (customerEmail) {
      logStep("Checking for existing customer", { email: customerEmail });
      const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
      
      if (customers.data.length > 0) {
        sessionParams.customer = customers.data[0].id;
        logStep("Found existing customer", { customerId: customers.data[0].id });
      } else {
        sessionParams.customer_email = customerEmail;
        logStep("No existing customer, will use email", { email: customerEmail });
      }
    }

    logStep("Creating checkout session");
    const session = await stripe.checkout.sessions.create(sessionParams);
    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
