import { me as getAuth } from "../../../controller/user";
import { MyContext } from "../../../server";
export const me = async (_: any, __: any, context: MyContext) => {
  return await getAuth(context);
};

export const healthCheck = async (_: any, __: any, context: MyContext) => {
  return "okay!😉";
};
