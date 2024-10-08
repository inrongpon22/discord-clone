import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { currentProfile } from "@/lib/current-profile";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

import { NavigationItem } from "./navigation-item";
import { NavigationAction } from "./navigation-action";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profile_id: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => {
          return (
            <div key={server.id} className="mb-4">
              <NavigationItem
                id={server.id}
                name={server.name}
                image_url={server.image_url}
              />
            </div>
          );
        })}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};
