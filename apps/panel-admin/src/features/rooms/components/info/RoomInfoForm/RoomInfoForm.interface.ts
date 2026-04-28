import { z } from "zod";
import type { Room, CreateRoomDTO } from "../../../domain/room.interface";

export const roomInfoSchema = z.object({
  name: z.string().min(3, "VALIDATION.MIN_LENGTH"),
  category: z.string().min(1, "VALIDATION.REQUIRED"),
  capacity_adults: z.number().min(1, "VALIDATION.POSITIVE_NUMBER"),
  capacity_kids: z.number().min(0, "VALIDATION.POSITIVE_NUMBER"),
  description: z.string().optional(),
  regular_fee: z.number().positive("VALIDATION.POSITIVE_NUMBER"),
  high_season_fee: z.number().positive("VALIDATION.POSITIVE_NUMBER"),
  is_active: z.boolean(),
  is_pet_friendly: z.boolean(),
});

export type RoomInfoFormData = z.infer<typeof roomInfoSchema>;

export interface RoomInfoFormProps {
  initialData?: Room;
  onSubmit: (data: RoomInfoFormData) => Promise<void>;
  isLoading?: boolean;
}
