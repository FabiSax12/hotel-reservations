"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField, Label, Input, FieldError } from "@heroui/react";
import { ROOM_INFO_FORM_STYLES as s } from "../RoomInfoForm.styles";
import { ROOM_FORM_FIELDS } from "../../../../constants/roomFormFields";
import type { RoomInfoFormData } from "../RoomInfoForm.interface";
import type { RoomsTexts } from "../../../../i18n/roomsTexts.type";
import { Users, Baby } from "lucide-react";

interface RoomCapacityProps {
  texts: RoomsTexts;
  getErrorMessage: (message?: string) => string | undefined;
}

export const RoomCapacity: React.FC<RoomCapacityProps> = ({ texts, getErrorMessage }) => {
  const { register, formState: { errors } } = useFormContext<RoomInfoFormData>();

  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>{texts.FORM.SECTION_CAPACITY}</h2>
      </div>
      <div className={s.grid}>
        <TextField
          name={ROOM_FORM_FIELDS.CAPACITY_ADULTS}
          isInvalid={!!errors.capacity_adults}
        >
          <Label className={s.label}>{texts.FORM.CAPACITY_ADULTS_LABEL}</Label>
          <div className={s.inputWrapper}>
            <Users className={s.inputIcon} size={18} />
            <Input
              {...register(ROOM_FORM_FIELDS.CAPACITY_ADULTS, { valueAsNumber: true })}
              type="number"
              className={`${s.input} ${s.inputWithIcon}`}
            />
          </div>
          <FieldError>{getErrorMessage(errors.capacity_adults?.message)}</FieldError>
        </TextField>

        <TextField
          name={ROOM_FORM_FIELDS.CAPACITY_KIDS}
          isInvalid={!!errors.capacity_kids}
        >
          <Label className={s.label}>{texts.FORM.CAPACITY_KIDS_LABEL}</Label>
          <div className={s.inputWrapper}>
            <Baby className={s.inputIcon} size={18} />
            <Input
              {...register(ROOM_FORM_FIELDS.CAPACITY_KIDS, { valueAsNumber: true })}
              type="number"
              className={`${s.input} ${s.inputWithIcon}`}
            />
          </div>
          <FieldError>{getErrorMessage(errors.capacity_kids?.message)}</FieldError>
        </TextField>
      </div>
    </div>
  );
};
