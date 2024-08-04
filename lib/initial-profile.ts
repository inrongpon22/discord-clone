/** @format */

// import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser, redirectToSignIn } from "@clerk/nextjs/server";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      user_id: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      user_id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      image_url: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
