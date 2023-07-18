import { PrismaClient, Prisma, User } from "@prisma/client";
import { ApolloServer } from "@apollo/server";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { httpServer } from "./app";

import resolvers from "./graphql/resolver";
import typeDefs from "./graphql/schema";

import permissions from "./graphql/permission";
export interface MyContext {
  token?: String;
  user?: User | null;
}

const server: ApolloServer<MyContext> = new ApolloServer<MyContext>({
  schema: applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),
    permissions
  ),

  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

export { server };
