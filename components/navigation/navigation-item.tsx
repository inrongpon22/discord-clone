/** @format */

"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "../action-tooltip";

interface NavigationItemProps {
  id: string;
  image_url: string;
  name: string;
}

export const NavigationItem = ({
  id,
  image_url,
  name,
}: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`)
  }

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.server_id !== id && "group-hover:h-[20px]",
            params?.server_id === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.server_id === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={image_url} alt="Channel" />
        </div>
      </button>
    </ActionTooltip>
  );
};
