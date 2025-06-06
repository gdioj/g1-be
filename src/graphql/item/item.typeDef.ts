import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    description: String
    brands: [String!]!
    price: Float!
    checked: Boolean!
    createdBy: User
    household: Household
    updatedAt: String
  }

  extend type Query {
    items: [Item!]!
  }

  extend type Mutation {
    createItem(
      name: String!
      description: String
      brands: [String!]!
      price: Float!
    ): Item!

    updateItem(
      id: ID!
      name: String
      description: String
      brands: [String!]
      price: Float
      checked: Boolean
    ): Item!

    deleteItem(id: ID!): Boolean!
  }
`;
