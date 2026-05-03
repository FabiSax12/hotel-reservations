"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField, Label, Input, FieldError } from "@heroui/react";
import { ROOM_FEES_STYLES as s } from "./RoomFees.styles";
import { ROOM_FORM_FIELDS } from "@/features/rooms/constants/roomFormFields";
import { MIN_PRICE } from "@/features/rooms/constants/info.constants";
import type { RoomInfoFormData } from "@/features/rooms/components/info/RoomInfoForm/RoomInfoForm.interface";
import type { RoomFeesProps } from "./RoomFees.interface";

export const RoomFees: React.FC<RoomFeesProps> = ({ texts, getErrorMessage }) => {
  const { register, formState: { errors } } = useFormContext<RoomInfoFormData>();

  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>{texts.FORM.SECTION_FEES}</h2>
      </div>
      <div className={s.formContainer}>
        <TextField
          name={ROOM_FORM_FIELDS.REGULAR_FEE}
          isInvalid={!!errors.regular_fee}
          className={s.fullWidth}
        >
          <Label className={s.label}>{texts.FORM.REGULAR_FEE_LABEL}</Label>
          <div className={s.inputWrapper}>
            <span className={s.inputIcon}>$</span>
            <Input
              {...register(ROOM_FORM_FIELDS.REGULAR_FEE, { valueAsNumber: true })}
              type="number"
              min={MIN_PRICE}
              placeholder={texts.FORM.REGULAR_FEE_PLACEHOLDER}
              className={`${s.input} ${s.inputWithIcon}`}
            />
          </div>
          <FieldError>{getErrorMessage(errors.regular_fee?.message)}</FieldError>
        </TextField>

        <TextField
          name={ROOM_FORM_FIELDS.HIGH_SEASON_FEE}
          isInvalid={!!errors.high_season_fee}
          className={s.fullWidth}
        >
          <Label className={s.label}>{texts.FORM.HIGH_SEASON_FEE_LABEL}</Label>
          <div className={s.inputWrapper}>
            <span className={s.inputIcon}>$</span>
            <Input
              {...register(ROOM_FORM_FIELDS.HIGH_SEASON_FEE, { valueAsNumber: true })}
              type="number"
              min={MIN_PRICE}
              placeholder={texts.FORM.HIGH_SEASON_FEE_PLACEHOLDER}
              className={`${s.input} ${s.inputWithIcon}`}
            />
          </div>
          <FieldError>{getErrorMessage(errors.high_season_fee?.message)}</FieldError>
        </TextField>
      </div>
    </div>
  );
};
