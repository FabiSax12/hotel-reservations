"use client";

import { FieldError, Input, Label, TextField } from "@heroui/react";
import { Baby, Users } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import type { RoomInfoFormData } from "@/features/rooms/components/info/RoomInfoForm/RoomInfoForm.interface";
import {
  ICON_SIZES,
  MAX_ADULTS,
  MAX_KIDS,
  MIN_ADULTS,
  MIN_KIDS,
} from "@/features/rooms/constants/info.constants";
import { ROOM_FORM_FIELDS } from "@/features/rooms/constants/roomFormFields";
import type { RoomCapacityProps } from "./RoomCapacity.interface";
import { ROOM_CAPACITY_STYLES as s } from "./RoomCapacity.styles";

export const RoomCapacity: React.FC<RoomCapacityProps> = ({ texts, getErrorMessage }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RoomInfoFormData>();

  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>{texts.FORM.SECTION_CAPACITY}</h2>
      </div>
      <div className={s.formContainer}>
        <TextField
          name={ROOM_FORM_FIELDS.CAPACITY_ADULTS}
          isInvalid={!!errors.capacity_adults}
          className={s.fullWidth}
        >
          <Label className={s.label}>{texts.FORM.CAPACITY_ADULTS_LABEL}</Label>
          <div className={s.inputWrapper}>
            <Users className={s.inputIcon} size={ICON_SIZES.MD} />
            <Input
              {...register(ROOM_FORM_FIELDS.CAPACITY_ADULTS, { valueAsNumber: true })}
              type="number"
              min={MIN_ADULTS}
              max={MAX_ADULTS}
              placeholder={texts.FORM.CAPACITY_ADULTS_PLACEHOLDER}
              className={`${s.input} ${s.inputWithIcon}`}
            />
          </div>
          <FieldError>{getErrorMessage(errors.capacity_adults?.message)}</FieldError>
        </TextField>

        <TextField
          name={ROOM_FORM_FIELDS.CAPACITY_KIDS}
          isInvalid={!!errors.capacity_kids}
          className={s.fullWidth}
        >
          <Label className={s.label}>{texts.FORM.CAPACITY_KIDS_LABEL}</Label>
          <div className={s.inputWrapper}>
            <Baby className={s.inputIcon} size={ICON_SIZES.MD} />
            <Input
              {...register(ROOM_FORM_FIELDS.CAPACITY_KIDS, { valueAsNumber: true })}
              type="number"
              min={MIN_KIDS}
              max={MAX_KIDS}
              placeholder={texts.FORM.CAPACITY_KIDS_PLACEHOLDER}
              className={`${s.input} ${s.inputWithIcon}`}
            />
          </div>
          <FieldError>{getErrorMessage(errors.capacity_kids?.message)}</FieldError>
        </TextField>
      </div>
    </div>
  );
};
