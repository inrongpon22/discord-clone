import React from 'react'
import { redirect } from "next/navigation";

import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profile_id: profile.id,
        },
      },
    },
  });


  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <div>Create a Server</div>
  )
}

export default SetupPage