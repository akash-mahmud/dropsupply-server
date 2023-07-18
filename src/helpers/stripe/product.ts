import Stripe from "stripe";
import stripe from "../../config/stripe";

export const createProductOnStripe = async (
  params: Stripe.ProductCreateParams
) => {
  try {
    const responsce = await stripe.products.create(params);
    return responsce;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createPlanPriceOnStripe = async (
  params: Stripe.PriceCreateParams
) => {
  try {
    const responsce = await stripe.prices.create(params);
    return responsce;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const subscribePlan = async (
  params: Stripe.SubscriptionCreateParams
) => {
  try {
    const responsce = await stripe.subscriptions.create(params);
    return responsce;
  } catch (error: any) {
    console.log(error.message);
  }
};
