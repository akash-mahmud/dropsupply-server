import defaultSchema from "./Default";
import UserScema from "./User";

import PlanSchema from "./plan";
import SubscriptionSchema from "./Subscription";
const typeDefs = [UserScema, defaultSchema, PlanSchema, SubscriptionSchema];

export default typeDefs;
