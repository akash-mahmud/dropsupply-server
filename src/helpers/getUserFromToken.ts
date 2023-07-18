import prisma from "../client/prisma";

import { User } from "@prisma/client";
import { IJwtPayload } from "../interface/User";
import jwt from "jsonwebtoken";

const getUser = async (token: any): Promise<User | null> => {
  const { user } = prisma;

  let loggedInuser: User | null = null;

  try {
    if (token && token.split(" ")[0] === "Bearer") {
      const authToken = token.split(" ")[1];

      const data = jwt.verify(
        authToken,
        process.env.JWT_SECRET ? process.env.JWT_SECRET : "somesecretkey"
      ) as IJwtPayload;

      const loggedInUserData = await user.findUnique({
        where: {
          id: data.user.id,
        },
      });

      if (loggedInUserData) {
        loggedInuser = loggedInUserData;
      }
    }
  } catch (error: any) {
    loggedInuser = null;
    // console.log(error.message);
  }

  return loggedInuser;
};

export default getUser;
