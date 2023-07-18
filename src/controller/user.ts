import bcrypt from "bcryptjs";
import Validator from "validatorjs";

import { Prisma } from "@prisma/client";

import { ILoginInput } from "../interface/User";
import { loginInputRules } from "../validation/user";

import prisma from "../client/prisma";
import { loginUser, registerUser } from "../service/user";
import { MyContext } from "../server";
import { paymentMethod } from "../helpers/stripe/addPayment";

export const register = async (user: Prisma.UserCreateInput) => {
  let message;

  const { user: User } = prisma;
  const { email } = user;
  try {
    const emailCheck = await User.findUnique({
      where: {
        email: email,
      },
    });
    if (emailCheck) {
      message = "User name already exist";
      return { message };
    } else {
      return await registerUser(user);
    }

    // return message;
  } catch (error: any) {
    console.log(error.message);
    return { message: error.message };
  }
};

export const login = async (userdata: ILoginInput) => {
  try {
    const validation = new Validator(userdata, loginInputRules);
    if (validation.passes()) {
      const { user: User } = prisma;
      const { email, password } = userdata;
      const user = await User.findUnique({
        where: { email: email },
      });

      if (user) {
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
          return await loginUser(user);
        } else {
          return {
            message: "Email or password is wrong",
          };
        }
      } else {
        return {
          message: "Email or password is wrong",
        };
      }
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

export const me = async (context: MyContext) => {
  try {
    return context.user;
  } catch (error: any) {
    console.log(error.message);
    return {
      message: error.message,
    };
  }
};

export const addPayment = async (token: string, customerId: string) => {
  try {
    const data = {
      customerId,
      tokenId: token,
    };

    return await paymentMethod(data);
  } catch (error: any) {
    return error.message;
  }
};
