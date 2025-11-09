"use client";

import Image from "next/image";
import { Crown, Dots } from "../icons";
import clsx from "clsx";

type RoomCardProps = {
  id: string;
  name: string;
  thumbnail: string;
  isOpen: boolean;
  onToggle: () => void;
};

const RoomCard = ({ id, name, thumbnail, isOpen, onToggle }: RoomCardProps) => {
  const isOwner = true;

  return (
    <div className="relative flex flex-col space-y-2">
      {/* Room thumbnail */}
      <div className="relative h-40 w-60 overflow-hidden rounded-md">
        <Image
          src={thumbnail}
          alt={`${name} thumbnail`}
          className="h-full w-full cursor-pointer object-cover"
          width={240}
          height={160}
        />

        {isOwner && (
          <div className="absolute top-2 left-2 flex items-center gap-0.5 rounded-full bg-[#8581ff] px-3 py-1 text-xs font-semibold text-white shadow-sm">
            <Crown className="size-4" />
            OWNER
          </div>
        )}
      </div>

      {/* Room name + Options */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold tracking-tight text-black">
          {name}
        </h4>

        <div className="relative">
          <div
            className="cursor-pointer rounded-sm p-1 transition hover:bg-neutral-200"
            onClick={onToggle}
          >
            <Dots className="size-5" />
          </div>

          {/* Dropdown menu */}
          <div
            className={clsx(
              "absolute right-0 mt-2 w-36 rounded-md border border-neutral-200 bg-white shadow-md transition-all duration-150",
              isOpen
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0",
            )}
          >
            <button className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100">
              Edit Room
            </button>

            {/* Separator */}
            <div className="h-px bg-neutral-200" />

            <button className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-neutral-100">
              Delete Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;