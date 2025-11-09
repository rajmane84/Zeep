"use client";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  EnterIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/icons";
import { CarouselCard, RoomCard } from "@/components/home";
import Footer from "@/components/home/footer";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const visibleCount = 2;
  const autoplayDelay = 3000;

  const totalPages = Math.ceil(games.length / visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev + visibleCount >= games.length) {
        return 0;
      }
      return prev + visibleCount;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev - visibleCount < 0) {
        return Math.floor((games.length - 1) / visibleCount) * visibleCount;
      }
      return prev - visibleCount;
    });
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [currentIndex, isHovered]);

  const getVisibleGames = () => {
    const visible = [];

    // Add previous card (faded)
    const prevIndex =
      currentIndex - 1 < 0 ? games.length - 1 : currentIndex - 1;
    visible.push({
      ...games[prevIndex],
      isFaded: true,
      key: `prev-${prevIndex}`,
    });

    // Add current visible cards
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % games.length;
      visible.push({
        ...games[index],
        isFaded: false,
        key: `current-${index}`,
      });
    }

    // Add next card (faded)
    const nextIndex = (currentIndex + visibleCount) % games.length;
    visible.push({
      ...games[nextIndex],
      isFaded: true,
      key: `next-${nextIndex}`,
    });

    return visible;
  };

  const [openCardId, setOpenCardId] = useState<string | null>(null);

  const rooms = [
    { id: "1", name: "My Space", thumbnail: "/carousel/the-sandbox-game.png" },
    {
      id: "2",
      name: "Chill Zone",
      thumbnail: "/carousel/the-sandbox-game.png",
    },
    { id: "3", name: "Work Hub", thumbnail: "/carousel/the-sandbox-game.png" },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="flex flex-col justify-center space-y-4 pt-8">
        <div className="mb-4 w-full">
          <div
            className="relative flex w-full items-center justify-center overflow-hidden py-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient overlays for fade effect */}
            <div className="pointer-events-none absolute top-0 left-0 z-50 h-full w-80 bg-linear-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 z-50 h-full w-80 bg-linear-to-l from-white to-transparent" />

            <div className="flex gap-6 transition-transform duration-700 ease-in-out">
              {getVisibleGames().map((game) => (
                <CarouselCard
                  key={game.key}
                  game={game}
                  isFaded={game.isFaded}
                />
              ))}
            </div>
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
              {Math.floor(currentIndex / visibleCount) + 1}/{totalPages}
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
          <div className="flex items-center justify-between py-3">
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

        <div className="mx-auto mb-8 flex max-h-[500px] w-full max-w-6xl flex-wrap gap-4">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              name={room.name}
              thumbnail={room.thumbnail}
              isOpen={openCardId === room.id}
              onToggle={() =>
                setOpenCardId((prev) => (prev === room.id ? null : room.id))
              }
            />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
