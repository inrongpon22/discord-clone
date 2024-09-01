/** @format */

import { currentUser, redirectToSignIn } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const currentProfile = async () => {
  const user = await currentUser()

  if (!user) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      user_id: user.id,
    },
  });

  return profile;
};
