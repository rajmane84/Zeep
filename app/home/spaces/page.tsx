"use client";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  EnterIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/icons";
import clsx from "clsx";

export interface GameItem {
  id: number;
  tag1: string;
  tag2: string;
  title: string;
  desc: string;
  img: string;
}

const games: GameItem[] = [
  {
    id: 1,
    tag1: "Official",
    tag2: "Game",
    title: "Bonbon School Detectives",
    desc: "Uncover the truth behind the missing students!",
    img: "/carousel/the-sandbox-game.png",
  },
  {
    id: 2,
    tag1: "Event",
    tag2: "Game",
    title: "Hide & Seek",
    desc: "Activate the generator and escape the cursed forest.",
    img: "/carousel/the-sandbox-game.png",
  },
  {
    id: 3,
    tag1: "Official",
    tag2: "Game",
    title: "ZEP Running Track",
    desc: "Join our new racing game and show your speed!",
    img: "/carousel/the-sandbox-game.png",
  },
  {
    id: 4,
    tag1: "Event",
    tag2: "Game",
    title: "Mystery Island",
    desc: "Solve puzzles to escape the mysterious island.",
    img: "/carousel/the-sandbox-game.png",
  },
  {
    id: 5,
    tag1: "Official",
    tag2: "Game",
    title: "Sky Tower",
    desc: "Reach the top of the tower before time runs out!",
    img: "/carousel/the-sandbox-game.png",
  },
  {
    id: 6,
    tag1: "Event",
    tag2: "Game",
    title: "Zombie Escape",
    desc: "Survive waves of zombies with your friends.",
    img: "/carousel/the-sandbox-game.png",
  },
];

const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const visibleCount = 2;

  const totalPages = Math.ceil(games.length / visibleCount);

  const nextSlide = () => {
    setCurrent((prev) => {
      // If we are at the last set of cards, loop back to 0
      if (prev + visibleCount >= games.length) {
        return 0;
      }
      return prev + visibleCount;
    });
  };

  const prevSlide = () => {
    setCurrent((prev) => {
      // If the previous index is out of bounds (< 0)
      if (prev - visibleCount < 0) {
        // Go to the last "page"
        // Math.floor((games.length - 1) / visibleCount) * visibleCount
        // finds the starting index of the last set of visible cards.
        return Math.floor((games.length - 1) / visibleCount) * visibleCount;
      }
      // Otherwise, move to the previous set
      return prev - visibleCount;
    });
  };

  return (
    <div className="flex flex-col justify-center pt-8">
      <div className="mb-4 w-full">
        <div className="scrollbar-hide relative flex w-full max-w-full items-center gap-4 overflow-x-scroll">
          <div className="pointer-events-none fixed top-0 left-0 z-100 h-full w-60 bg-linear-to-r from-white to-transparent"></div>
          <div className="pointer-events-none fixed top-0 right-0 z-100 h-full w-60 bg-linear-to-l from-white to-transparent"></div>

          {games.map((game) => (
            <CarouselCard key={game.id} game={game} />
          ))}
        </div>

        {/* Carousel controls */}
        <div className="mt-4 flex w-full items-center justify-center gap-4">
          <div
            onClick={prevSlide}
            className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-neutral-200/80 hover:bg-blue-100/25"
          >
            <ChevronLeft className="size-5" />
          </div>
          <div className="flex items-center justify-center rounded-full border border-neutral-200/80 px-5 py-1 text-sm">
            {Math.floor(current / visibleCount) + 1}/{totalPages}
          </div>
          <div
            onClick={nextSlide}
            className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-neutral-200/80 hover:bg-blue-100/25"
          >
            <ChevronRight className="size-5" />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-black">Recent</span>
            <div className="h-6 w-px bg-neutral-300"></div>
            <span className="text-lg font-semibold text-neutral-300">
              My Spaces
            </span>
          </div>
          <div className="relative flex items-center gap-4">
            <input
              type="text"
              placeholder="Search Spaces"
              className="rounded-lg border border-neutral-300 px-4 py-1 pl-10 focus:ring-1 focus:ring-[#6b66fc] focus:outline-none"
            />
            <SearchIcon className="absolute left-2.5 size-5 text-neutral-500" />
            <button
              className={clsx(
                "cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-[#6b66fc] transition-all duration-300",
                "border-neutral-200 bg-blue-100/25 hover:border-neutral-200/50 hover:bg-blue-200/50",
                "flex items-center gap-2",
              )}
            >
              <EnterIcon className="size-5" />
              Enter with Code
            </button>
            <button
              className={clsx(
                "cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-white transition-all duration-300",
                "border-[#8581ff] bg-[#6C63FF] hover:text-shadow-xs",
                "from-[#6556F3] to-[#5D7CFF] hover:bg-linear-to-tr",
                "flex items-center gap-2",
              )}
            >
              <PlusIcon className="size-5" />
              Create Space
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const CarouselCard = ({ game }: { game: GameItem }) => {
  return (
    <div className="relative flex h-[225px] w-[600px] shrink-0 overflow-hidden rounded-md">
      {/* Background image: Using the dynamic game.img */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${game.img})` }}
      />

      {/* Solid blue base overlay */}
      <div className="absolute top-0 left-0 z-10 h-full w-[45%] bg-blue-500" />

      {/* Gradient overlay to smooth the edge */}
      <div className="absolute top-0 left-[45%] z-20 h-full w-[15%] bg-linear-to-r from-blue-500 to-transparent" />

      {/* Text layer */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between px-3 py-5">
        <div className="flex items-center gap-2 text-xs text-white">
          <div className="rounded-full bg-neutral-100/50 px-2 py-1">
            {game.tag1}
          </div>
          <div className="rounded-full bg-neutral-100/50 px-2 py-1">
            {game.tag2}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4">
          <h1 className="text-2xl font-bold text-white">{game.title}</h1>
          <p className="max-w-[45%] text-xs text-neutral-100">{game.desc}</p>
        </div>
      </div>
    </div>
  );
};
