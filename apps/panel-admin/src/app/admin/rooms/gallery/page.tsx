import { GalleryView } from "@/features/rooms/components/gallery/GalleryView";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ roomId?: string }>;
}) {
  const { roomId } = await searchParams;
  return <GalleryView roomId={roomId ?? ""} />;
}
