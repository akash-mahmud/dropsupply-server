/// <reference types="stripe-event-types" />

import { Request, Response } from "express";
import stripe from "../../config/stripe";
import Stripe from "stripe";
import prisma from "../../client/prisma";

const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY;

export const stripeWebhookFunction = async (
  request: Request,
  response: Response
) => {
  const sig = request.headers["stripe-signature"] ?? "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      endpointSecret as string
    ) as Stripe.DiscriminatedEvent;
  } catch (err: any) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      break;
    case "invoice.paid":
      // console.log("invoice.paid", event.data.object);

      const invoice = event.data.object;
      if (
        invoice.billing_reason === "subscription_create" ||
        invoice.billing_reason === "subscription_cycle"
      ) {
        if (invoice.status === "paid") {
          const { subscription: Subscription } = prisma;

          await Subscription.update({
            where: {
              stripe_subscriptionId: invoice.subscription as string,
            },
            data: {
              status: "active",
            },
          });
        }
      }

      break;
    case "invoice.payment_action_required":
      const subscriptionId = event.data.object.subscription;
      console.log(subscriptionId);
      const customerEmail = event.data.object.customer_email;
      let clientSecret: string | null | undefined = "";
      if (typeof event.data.object?.payment_intent !== "string") {
        clientSecret = event.data.object?.payment_intent?.client_secret;
      }
      const authenticationLink = `https://yourwebsite.com/authenticate?subscription=${subscriptionId}&email=${customerEmail}&client_secret=${clientSecret}`;
      // Here we will send the customer that we need your authorization for 3d validation
      // in our subscription payment
      console.log("payment_action_required", event.data.object);

      break;
    case "payment_intent.requires_action":
      console.log("payment_intent.requires_action", event.data.object);
      break;
    case "invoice.payment_failed":
      break;
    // case "customer.subscription.created":
    //   // console.log(event.data.object);

    // break

    case "invoice.payment_succeeded":
      //  console.log("invoice.paid", event.data.object);

      const invoicePaymentSuccess = event.data.object;
      if (
        invoicePaymentSuccess.billing_reason === "subscription_create" ||
        invoicePaymentSuccess.billing_reason === "subscription_cycle"
      ) {
        if (invoicePaymentSuccess.status === "paid") {
          const { subscription: Subscription } = prisma;

          await Subscription.update({
            where: {
              stripe_subscriptionId:
                invoicePaymentSuccess.subscription as string,
            },
            data: {
              status: "active",
            },
          });
        }
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
};
