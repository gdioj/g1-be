import { User, UserDocument } from "../../models/user";
import { Household } from "../../models/household";
import { Context } from "../../types";

export const resolvers = {
  Query: {

    myHousehold: async (_: any, __: any, context: Context) => {
      const user = context.req.user as UserDocument;
      if (!user) throw new Error("Not authenticated");
      return await Household.findById(user.household).populate("members");
    },
  },

  Mutation: {
    createHousehold: async (
      _: any,
      { name }: { name: string },
      context: Context
    ) => {
      const user = context.req.user;
      if (!user) throw new Error("Not authenticated");

      const userDoc = user as UserDocument;
      const household = await Household.create({
        name,
        members: [userDoc._id],
      });

      await User.findByIdAndUpdate(userDoc._id, { household: household._id });

      return household;
    },

    joinHousehold: async (
      _: any,
      { householdId }: { householdId: string },
      context: Context
    ) => {
      const user = context.req.user;
      if (!user) throw new Error("Not authenticated");

      const household = await Household.findById(householdId);
      if (!household) throw new Error("Household not found");

      if (!household.members.includes(user._id)) {
        household.members.push(user._id);
        await household.save();
      }

      await User.findByIdAndUpdate(user._id, { household: household._id });

      return household;
    },
  },
};
