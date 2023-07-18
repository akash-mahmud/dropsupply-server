import {
  login as UserLogin,
  register as UserRegister,
  addPayment,
} from "../../../controller/user";
import { Prisma } from "@prisma/client";
import { ILoginInput } from "../../../interface/User";
import { MyContext } from "../../../server";
import prisma from "../../../client/prisma";

export const login = async (
  _: any,
  {
    user,
  }: {
    user: ILoginInput;
  },
  {}: MyContext,
  ___: any
) => {
  const data = await UserLogin(user);
  return data;
};
export const register = async (
  _: any,
  {
    user,
  }: {
    user: Prisma.UserCreateInput;
  },
  {}: MyContext,
  ___: any
) => {
  const responsce = await UserRegister(user);

  return responsce;
};

export const addPaymentMethod = async (
  _: any,
  {
    token,
  }: {
    token: string;
  },
  { user }: MyContext,
  ___: any
) => {
  const { user: User } = prisma;
  const userData = await User.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      customer_Id: true,
    },
  });
  if (userData?.customer_Id) {
    return await addPayment(token, userData?.customer_Id);
  }
};
