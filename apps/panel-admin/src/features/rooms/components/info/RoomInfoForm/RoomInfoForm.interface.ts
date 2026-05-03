import { z } from "zod";
import type { Room } from "@/features/rooms/domain/room.interface";
import {
  MIN_ADULTS,
  MIN_KIDS,
  MIN_NAME_LENGTH,
  MIN_PRICE,
  MIN_STRING_LENGTH,
} from "@/features/rooms/constants/info.constants";

export const roomInfoSchema = z.object({
  name: z.string().min(MIN_NAME_LENGTH, "VALIDATION.MIN_LENGTH"),
  category: z.string().min(MIN_STRING_LENGTH, "VALIDATION.REQUIRED"),
  capacity_adults: z.number().min(MIN_ADULTS, "VALIDATION.MIN_ADULTS"),
  capacity_kids: z.number().min(MIN_KIDS, "VALIDATION.POSITIVE_NUMBER"),
  description: z.string().optional(),
  regular_fee: z.number().min(MIN_PRICE, "VALIDATION.MIN_PRICE"),
  high_season_fee: z.number().min(MIN_PRICE, "VALIDATION.MIN_PRICE"),
  is_active: z.boolean(),
  is_pet_friendly: z.boolean(),
});

export type RoomInfoFormData = z.infer<typeof roomInfoSchema>;

export interface RoomInfoFormProps {
  initialData?: Room;
  onSubmit: (data: RoomInfoFormData) => Promise<void>;
  isLoading?: boolean;
}

