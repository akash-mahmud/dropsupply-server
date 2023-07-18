import { hashPassword } from "../helpers/hashPassword";
import prisma from "../client/prisma";
import { Prisma } from "@prisma/client";

import jwt from "jsonwebtoken";
import { createCustomer } from "../helpers/stripe/createCustomer";
export const registerUser = async (user: Prisma.UserCreateInput) => {
  let message;
  const { user: User } = prisma;
  const { password } = user;
  let hashedPassword = await hashPassword(password);

  user.password = hashedPassword;
  user.role = "public";

  const savedUser = await User.create({
    data: user,
  });

  /**
   * @param Add user on stripe as customer
   */

  if (user?.firstname && user?.lastname && user?.email) {
    const params = {
      name: user.firstname + " " + user.lastname,
      email: user.email,
    };
    const customer = await createCustomer(params);
    if (customer && customer.id) {
      await User.update({
        where: {
          id: savedUser.id,
        },
        data: {
          customer_Id: customer.id,
        },
      });
    } else {
    }
  }

  message = "success";

  return { message };
};

export const loginUser = async (user: Prisma.UserCreateInput) => {
  const token = jwt.sign(
    {
      user: {
        id: user.id,

        email: user.email,
      },
    },
    process.env.JWT_SECRET ? process.env.JWT_SECRET : "somesecret",
    {
      algorithm: "HS256",
      subject: user.id,
      expiresIn: "1d",
    }
  );

  return {
    message: "success",
    accessToken: token,
  };
};
