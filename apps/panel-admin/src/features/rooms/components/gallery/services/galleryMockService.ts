export async function uploadImage(
  _roomId: string,
  file: File,
): Promise<{ id: string; url: string; storagePath: string } | null> {
  await new Promise((res) => setTimeout(res, 800));
  return {
    id: crypto.randomUUID(),
    url: URL.createObjectURL(file),
    storagePath: `rooms/mock/${crypto.randomUUID()}`,
  };
}

export async function deleteImage(_imageId: string): Promise<boolean> {
  await new Promise((res) => setTimeout(res, 300));
  return true;
}

export async function reorderImages(_orderedIds: string[]): Promise<boolean> {
  await new Promise((res) => setTimeout(res, 200));
  return true;
}
