import { createNewSubscription } from "../../../controller/subscription";
import { Prisma } from "@prisma/client";
import { MyContext } from "../../../server";

export const createsubscription = async (
  _: any,
  {
    subscription,
  }: {
    subscription: Prisma.SubscriptionUncheckedCreateInput;
  },
  ctx: MyContext,
  ___: any
) => {
  return await createNewSubscription(subscription, ctx);
};
