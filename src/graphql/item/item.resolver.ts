import { User, UserDocument } from "../../models/user";
import { Item } from "../../models/item";

interface Context {
  req: Express.Request;
}

export const resolvers = {
  Query: {
    items: async () => {
      return await Item.find().populate("createdBy");
    },
  },

  Mutation: {
    createItem: async (
      _: any,
      {
        name,
        description,
        brands,
        price,
      }: {
        name: string;
        description?: string;
        brands: string[];
        price: number;
      },
      context: Context
    ) => {
      const user = context.req.user;
      if (!user) throw new Error("Not authenticated");

      const populatedUser = await User.findById(user._id).populate("household");
      if (!populatedUser?.household)
        throw new Error("User must join a household first");

      const item = await Item.create({
        name,
        description,
        brands,
        price,
        createdBy: (user as UserDocument)._id,
        household: populatedUser.household._id,
      });

      return (await item.populate("createdBy")).populate("household");
    },

    updateItem: async (
      _: any,
      {
        id,
        name,
        description,
        brands,
        price,
        checked,
      }: {
        id: string;
        name?: string;
        description?: string;
        brands?: string[];
        price?: number;
        checked?: boolean;
      },
      context: Context
    ) => {
      if (!context.req.user) throw new Error("Not authenticated");
      const item = await Item.findById(id);
      if (!item) throw new Error("Item not found");

      // Optional: restrict editing to creator
      if (item.createdBy.toString() !== context.req.user._id.toString()) {
        throw new Error("Unauthorized");
      }

      if (name !== undefined) item.name = name;
      if (description !== undefined) item.description = description;
      if (brands !== undefined) item.brands = brands;
      if (price !== undefined) item.price = price;
      if (checked !== undefined) item.checked = checked;

      await item.save();
      return item.populate("createdBy");
    },

    deleteItem: async (_: any, { id }: { id: string }, context: Context) => {
      if (!context.req.user) throw new Error("Not authenticated");
      const item = await Item.findById(id);
      if (!item) return false;

      if (item.createdBy.toString() !== context.req.user._id.toString()) {
        throw new Error("Unauthorized");
      }

      await Item.deleteOne({ _id: id });
      return true;
    },
  },
};
