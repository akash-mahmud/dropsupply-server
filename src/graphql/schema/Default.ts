import { gql } from "graphql-tag";

const defaultSchema = gql`
  enum userRole {
    admin
    superadmin
    public
    company
  }

  enum companyRole {
    owner
    employee
  }
  type defaultResposnce {
    message: String
  }
`;

export default defaultSchema;
