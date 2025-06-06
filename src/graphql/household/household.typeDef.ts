import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Household {
    id: ID!
    name: String!
    shortDescription: String
    createdAt: String
    members: [User!]!
  }

  extend type Query {
    myHousehold: Household
  }

  extend type Mutation {
    createHousehold(name: String!, shortDescription: String): Household!
    joinHousehold(householdId: ID!): Household!
  }
`;
