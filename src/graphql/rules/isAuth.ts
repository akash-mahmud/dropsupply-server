import { rule } from "graphql-shield";
import { MyContext } from "../../server";
export const isAuthenticated = rule({ cache: "contextual" })(
  (_: any, __: any, { user }: MyContext) => {
    return user !== null && user !== undefined;
  }
);
