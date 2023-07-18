import { app, httpServer } from "./app";
import { server } from "./server";
import cors from "cors";
import getUser from "./helpers/getUserFromToken";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import { stripeWebhookFunction } from "./webhook/stripe";
const main = async () => {
  await server.start();
  app.post(
    "/api/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhookFunction
  );

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["http://9e3f-116-12-36-56.ngrok.io"],
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = await getUser(req.headers.authorization);

        return { user, token: req.headers.authorization };
      },
      
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT || 8000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:8000/graphql`);
};

export default main;
