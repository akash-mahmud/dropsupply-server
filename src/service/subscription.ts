import { Prisma } from "@prisma/client";
import { MyContext } from "../server";
import prisma from "../client/prisma";
import { subscribePlan } from "../helpers/stripe/product";

export const createSubscription = async (
  subscriptionData: Prisma.SubscriptionUncheckedCreateInput,
  { user }: MyContext
) => {
  try {
    const { user: User, subscription: Subscription, plan: Plan } = prisma;

    const userData = await User.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        customer_Id: true,
        // plan: {
        //   select: {
        //     stripe_priceId: true,
        //   },
        // },
      },
    });
    const plan = await Plan.findUnique({
      where: {
        id: subscriptionData.planId,
      },
      select: {
        stripe_priceId: true,
        stripe_productId: true,
      },
    });
    // console.log(plan);

    // userData?.plan?.stripe_priceId;
    const subscriptionParams = {
      customer: userData?.customer_Id as string,
      // doing with price id
      items: [{ price: plan?.stripe_priceId }],
    };
    const subscribeUserData = await subscribePlan(subscriptionParams);
    if (subscribeUserData?.id) {
      subscriptionData.stripe_subscriptionId = subscribeUserData.id;
      subscriptionData.status = "pending";
      subscriptionData.userId = user?.id ?? "";
      // subscriptionData.subscription_time = Date.now().toString()

      // // we will remove this lin later
      // subscriptionData.subscription_end = Date.now().toString();

      await Subscription.create({
        data: subscriptionData,
      });
      return { message: "success" };
    } else {
      return { message: "Something went wrong" };
    }
  } catch (error: any) {
    console.log(error);
    return { message: error.message };
  }
};
