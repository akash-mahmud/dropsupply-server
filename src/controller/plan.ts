import Validator from "validatorjs";

import { Prisma } from "@prisma/client";

import prisma from "../client/prisma";

import { createPlanData } from "../service/plan";

export const fetchAllPlans = async () => {
  let message;

  try {
    //   return await registerUser(user);
  } catch (error: any) {
    console.log(error.message);
    return { message: error.message };
  }
};

export const createNewPlan = async (plan: Prisma.PlanUncheckedCreateInput) => {
  try {
    if (true) {
      return await createPlanData(plan);
    } else {
      return {
        message: "Fill the data properly",
      };
    }
  } catch (error: any) {
    console.log(error.message);
    return {
      message: error.message,
    };
  }
};

export const updatePlanData = async (
  id: string,
  plan: Prisma.PlanUncheckedCreateInput
) => {
  try {
  } catch (error: any) {
    console.log(error.message);
    return {
      message: error.message,
    };
  }
};

export const getPlan = async (id: String) => {
  try {
  } catch (error: any) {
    console.log(error.message);
    return {
      message: error.message,
    };
  }
};
