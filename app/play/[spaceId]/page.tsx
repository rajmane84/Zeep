import GameCanvas from "@/utils/game-canvas";

interface GamePageProps {
  params: Promise<{ spaceId: string }>;
}

export default async function Page({ params }: GamePageProps) {
  const { spaceId } = await params;

  return (
    <div>
      <GameCanvas spaceId={spaceId} />
    </div>
  );
}
