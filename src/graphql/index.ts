import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';

import { typeDefs as baseTypeDefs } from './base/base.typeDef';
import { resolvers as baseResolvers } from './base/base.resolver';

import { typeDefs as userTypeDefs } from './user/user.typeDef';
import { resolvers as userResolvers } from './user/user.resolver';

import { typeDefs as itemTypeDefs } from './item/item.typeDef';
import { resolvers as itemResolvers } from './item/item.resolver';

import { typeDefs as householdTypeDefs } from './household/household.typeDef';
import { resolvers as householdResolvers } from './household/household.resolver';

export const typeDefs = ([
  baseTypeDefs,
  userTypeDefs,
  itemTypeDefs,
  householdTypeDefs,
]);

export const resolvers = ([
  baseResolvers,
  userResolvers,
  itemResolvers,
  householdResolvers,
]);
