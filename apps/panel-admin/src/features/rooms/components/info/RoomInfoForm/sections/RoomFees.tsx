"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField, Label, Input, FieldError } from "@heroui/react";
import { ROOM_INFO_FORM_STYLES as s } from "../RoomInfoForm.styles";
import { ROOM_FORM_FIELDS } from "../../../../constants/roomFormFields";
import type { RoomInfoFormData } from "../RoomInfoForm.interface";
import type { RoomsTexts } from "../../../../i18n/roomsTexts.type";

interface RoomFeesProps {
  texts: RoomsTexts;
  getErrorMessage: (message?: string) => string | undefined;
}

export const RoomFees: React.FC<RoomFeesProps> = ({ texts, getErrorMessage }) => {
  const { register, formState: { errors } } = useFormContext<RoomInfoFormData>();

  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>{texts.FORM.SECTION_FEES}</h2>
      <div className={s.grid}>
        <TextField
          name={ROOM_FORM_FIELDS.REGULAR_FEE}
          isInvalid={!!errors.regular_fee}
        >
          <Label className={s.label}>{texts.FORM.REGULAR_FEE_LABEL}</Label>
          <Input
            {...register(ROOM_FORM_FIELDS.REGULAR_FEE, { valueAsNumber: true })}
            type="number"
            className={s.input}
          />
          <FieldError>{getErrorMessage(errors.regular_fee?.message)}</FieldError>
        </TextField>

        <TextField
          name={ROOM_FORM_FIELDS.HIGH_SEASON_FEE}
          isInvalid={!!errors.high_season_fee}
        >
          <Label className={s.label}>{texts.FORM.HIGH_SEASON_FEE_LABEL}</Label>
          <Input
            {...register(ROOM_FORM_FIELDS.HIGH_SEASON_FEE, { valueAsNumber: true })}
            type="number"
            className={s.input}
          />
          <FieldError>{getErrorMessage(errors.high_season_fee?.message)}</FieldError>
        </TextField>
      </div>
    </div>
  );
};
