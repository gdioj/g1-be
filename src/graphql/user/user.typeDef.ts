import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    googleId: String!
    name: String!
    email: String!
    household: Household
  }
`;
