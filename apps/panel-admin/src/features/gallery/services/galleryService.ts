import { createSupabaseClient, DB_COLUMNS, DB_TABLES } from "@hotel/db";
import type {
  GalleryItem,
  GalleryItemWithContent,
  GalleryLocale,
} from "@/features/gallery/domain/gallery.interface";

export const galleryService = {
  getGalleryItems: async (
    _locale: GalleryLocale,
    supabase = createSupabaseClient(),
  ): Promise<GalleryItemWithContent[]> => {
    const { data: items, error: itemsError } = await supabase
      .from(DB_TABLES.GALLERY_ITEMS)
      .select("*")
      .eq(DB_COLUMNS.gallery_items.is_active, true)
      .order(DB_COLUMNS.gallery_items.created_at, { ascending: true });

    if (itemsError) throw new Error(itemsError.message);

    const { data: contents, error: contentsError } = await supabase
      .from(DB_TABLES.GALLERY_CONTENT)
      .select("*")
      .in(
        DB_COLUMNS.gallery_content.gallery_item_id,
        items.map((item) => item.id),
      );

    if (contentsError) throw new Error(contentsError.message);

    const contentByItemId = contents.reduce(
      (acc, content) => {
        if (!acc[content.gallery_item_id]) {
          acc[content.gallery_item_id] = {} as Record<GalleryLocale, (typeof contents)[0]>;
        }
        acc[content.gallery_item_id][content.locale as GalleryLocale] = content;
        return acc;
      },
      {} as Record<string, Record<GalleryLocale, (typeof contents)[0]>>,
    );

    return items.map((item) => ({
      item: item as GalleryItem,
      content:
        contentByItemId[item.id] ??
        ({ es: {} as (typeof contents)[0], en: {} as (typeof contents)[0] } as Record<
          GalleryLocale,
          (typeof contents)[0]
        >),
    }));
  },

  getGalleryItemCount: async (supabase = createSupabaseClient()): Promise<number> => {
    const { count, error } = await supabase
      .from(DB_TABLES.GALLERY_ITEMS)
      .select("*", { count: "exact", head: true })
      .eq(DB_COLUMNS.gallery_items.is_active, true);

    if (error) throw new Error(error.message);
    return count ?? 0;
  },
};
