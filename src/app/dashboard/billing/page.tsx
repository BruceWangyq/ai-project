import React from "react";

import { BillingForm } from "@/components/BillingForm";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";

import { redirect } from "next/navigation";

export default async function page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);
  console.log("subscriptionPlan: ", subscriptionPlan);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return (
    <div>
      billing
      <BillingForm
        subscriptionPlan={{
          ...subscriptionPlan,
          isCanceled,
        }}
      />
    </div>
  );
}
