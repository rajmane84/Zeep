import { GameItem } from "@/app/home/spaces/page";
import clsx from "clsx";

export const CarouselCard = ({
  game,
  isFaded,
}: {
  game: GameItem;
  isFaded: boolean;
}) => {
  return (
    <div
      className={clsx(
        "relative flex h-[225px] w-[600px] shrink-0 overflow-hidden rounded-md transition-all duration-500",
        isFaded
          ? "scale-[0.97] opacity-40 blur-[1px]" // faded visual effect
          : "blur-0 scale-100 opacity-100",
      )}
    >
      {/* Background image */}
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
