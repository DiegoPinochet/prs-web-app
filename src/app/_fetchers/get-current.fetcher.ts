"use server";

import { currentUser } from "@clerk/nextjs";

export const getCurrentUser = async () => {
  const user = await currentUser();
  return user;
};
