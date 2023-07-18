import { isAuthenticated } from "../rules";
import { shield } from "graphql-shield";
import { IMiddlewareGenerator } from "graphql-middleware";
const permissions: IMiddlewareGenerator<any, any, any> = shield({
  Query: {
    me: isAuthenticated,
  },
  Mutation: {
    createsubscription: isAuthenticated,
  },
});

export default permissions;
