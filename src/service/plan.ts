import { Prisma } from "@prisma/client";

import prisma from "../client/prisma";
import {
  createPlanPriceOnStripe,
  createProductOnStripe,
} from "../helpers/stripe/product";

export const createPlanData = async (plan: Prisma.PlanUncheckedCreateInput) => {
  try {
    const { plan: Plan } = prisma;
    const productParams = {
      name: plan.name,
    };
    const product = await createProductOnStripe(productParams);
    const planPriceParams = {
      unit_amount: plan.price * 100,
      currency: "usd",
      recurring: {
        interval: plan.planType,
        interval_count: plan.interval_count || 1,
      },
      product: product?.id,
    };
    const stripePlan = await createPlanPriceOnStripe(planPriceParams);
    if (product?.id && stripePlan?.id) {
      plan.stripe_productId = product.id;
      plan.stripe_priceId = stripePlan.id;
    }
    await Plan.create({
      data: plan,
    });

    return { message: "success" };
  } catch (error: any) {
    return { message: error.message };
  }
};
