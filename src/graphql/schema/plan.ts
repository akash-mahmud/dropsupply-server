import { gql } from "graphql-tag";

const PlanSchema = gql`
  enum PlanType {
    week
    month
    year
  }
  type Plan {
    id: String

    name: String
    description: String
    is_default: Boolean
    is_free: Boolean
    trial_days: Int

    planType: PlanType
    price: Float
    createdAt: Float
  }

  input PlanInput {
    name: String!
    description: String!
    is_default: Boolean!
    is_free: Boolean!
    trial_days: Int!

    planType: PlanType!
    price: Float!
    interval_count: Int
  }
  type Query {
    getPlan(id: String): Plan
  }
  type Mutation {
    createPlan(plan: PlanInput): defaultResposnce
    editPlan(id: String!, plan: PlanInput): defaultResposnce
  }
`;

export default PlanSchema;
