import { User } from "@prisma/client";

export interface IUser extends User {}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IJwtPayload {
  user: {
    id: string;

    email: string;
  };
}

export interface ILoginResponsce {
  message: string;
  accessToken: string;
}
