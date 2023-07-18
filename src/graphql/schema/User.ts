import { gql } from "graphql-tag";

const UserSchema = gql`
  type User {
    id: String
    firstname: String
    lastname: String
    email: String
  }

  type loginresponsce {
    accessToken: String
    message: String
  }
  input LoginInput {
    email: String
    password: String
  }

  input UserInput {
    confirmPassword: String
    firstname: String
    lastname: String
    email: String
    password: String
  }
  type Query {
    me: User
    healthCheck: String
  }
  type Mutation {
    login(user: LoginInput): loginresponsce
    register(user: UserInput): defaultResposnce
    addPaymentMethod(token: String!): String
  }
`;

export default UserSchema;
