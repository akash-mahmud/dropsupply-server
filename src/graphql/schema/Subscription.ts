import { gql } from "graphql-tag";

const SubscriptionSchema = gql`
  enum SubscriptionStatus {
    active
    renew_needed
    failed
    balance_empty
    pending
  }
  type subscription {
    id: String

    plan: Plan
    user: User
    subscription_time: Float
    subscription_end: String
    status: SubscriptionStatus
    createdAt: Float
  }

  input SubscriptionInput {
    planId: String
  }
  type Query {
    subscription(id: String): subscription
  }
  type Mutation {
    createsubscription(subscription: SubscriptionInput): defaultResposnce
    updatesubscription(
      id: String!
      subscription: SubscriptionInput
    ): defaultResposnce
  }
`;

export default SubscriptionSchema;
