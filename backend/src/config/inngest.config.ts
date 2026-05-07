import { Inngest, InngestFunction } from "inngest";
import { connectToDb } from "./db.config.js";
import User from "../models/User.model.js";
import { IUser } from "../interfaces/user.interface.js";

export const inngest = new Inngest({ id: "interviewer" });

const syncUser: InngestFunction.Any = inngest.createFunction(
  {
    id: "sync-user",
    triggers: { event: "clerk/user.created" },
  },
  async ({ event }) => {
    await connectToDb();
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser: IUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };

    await User.create(newUser);

    // TODO: Do something else
  },
);

const deleteUserFromDb: InngestFunction.Any = inngest.createFunction(
  {
    id: "delete-user-from-db",
    triggers: { event: "clerk/user.deleted" },
  },
  async ({ event }) => {
    await connectToDb();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    // TODO: Do something else
  },
);

export const functions = [syncUser, deleteUserFromDb];
