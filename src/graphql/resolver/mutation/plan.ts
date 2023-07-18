import { createNewPlan } from "../../../controller/plan";
import { Prisma } from "@prisma/client";
import { MyContext } from "../../../server";

export const createPlan = async (
  _: any,
  {
    plan,
  }: {
    plan: Prisma.PlanUncheckedCreateInput;
  },
  ctx: MyContext,
  ___: any
) => {
  return await createNewPlan(plan);
};
