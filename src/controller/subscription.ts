import Validator from "validatorjs";

import { Prisma } from "@prisma/client";

import prisma from "../client/prisma";

import { createSubscription } from "../service/subscription";
import { MyContext } from "../server";

export const fetchAllSubscriptions = async () => {
  let message;

  const { subscription: Subscription } = prisma;

  try {
    //   return await registerUser(user);
  } catch (error: any) {
    console.log(error.message);
    return { message: error.message };
  }
};

export const createNewSubscription = async (
  subscription: Prisma.SubscriptionUncheckedCreateInput,
  ctx: MyContext
) => {
  try {
    if (true) {
      return await createSubscription(subscription, ctx);
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

export const updatesubscriptiondata = async (
  id: string,
  subscriptiondata: Prisma.SubscriptionUncheckedUpdateInput
) => {
  try {
    if (true) {
      // await UpdateCompanyData(id, companydata);
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

export const getsubscription = async (id: String) => {
  try {
  } catch (error: any) {
    console.log(error.message);
    return {
      message: error.message,
    };
  }
};
