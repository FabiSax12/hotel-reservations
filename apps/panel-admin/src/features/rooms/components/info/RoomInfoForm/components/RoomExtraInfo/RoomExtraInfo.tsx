"use client";

import { FieldError, Label, TextArea, TextField } from "@heroui/react";
import { Activity, AlignLeft, PawPrint } from "lucide-react";
import type React from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { RoomInfoFormData } from "@/features/rooms/components/info/RoomInfoForm/RoomInfoForm.interface";
import { ICON_SIZES } from "@/features/rooms/constants/info.constants";
import { ROOM_FORM_FIELDS } from "@/features/rooms/constants/roomFormFields";
import { SwitchCard } from "./components/SwitchCard";
import type { RoomExtraInfoProps } from "./RoomExtraInfo.interface";
import { ROOM_EXTRA_INFO_STYLES as s } from "./RoomExtraInfo.styles";

export const RoomExtraInfo: React.FC<RoomExtraInfoProps> = ({ texts, getErrorMessage }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RoomInfoFormData>();

  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>{texts.FORM.SECTION_EXTRA_INFO}</h2>
      </div>

      <TextField
        name={ROOM_FORM_FIELDS.DESCRIPTION}
        isInvalid={!!errors.description}
        className={s.fullWidth}
      >
        <Label className={s.label}>{texts.FORM.DESCRIPTION_LABEL}</Label>
        <div className={s.inputWrapper}>
          <AlignLeft className={s.inputIcon} size={ICON_SIZES.MD} />
          <TextArea
            {...register(ROOM_FORM_FIELDS.DESCRIPTION)}
            placeholder={texts.FORM.DESCRIPTION_PLACEHOLDER}
            className={`${s.input} ${s.inputWithIcon} ${s.padding}`}
          />
        </div>
        <FieldError>{getErrorMessage(errors.description?.message)}</FieldError>
      </TextField>

      <div className={s.gridContainer}>
        <Controller
          name={ROOM_FORM_FIELDS.IS_ACTIVE}
          control={control}
          render={({ field }) => (
            <SwitchCard
              isActive={field.value}
              onChange={field.onChange}
              label={texts.FORM.STATE_LABEL}
              activeText={texts.FORM.STATE_ACTIVE}
              inactiveText={texts.FORM.STATE_INACTIVE}
              icon={Activity}
              ariaLabel={texts.FORM.STATE_LABEL}
            />
          )}
        />

        <Controller
          name={ROOM_FORM_FIELDS.IS_PET_FRIENDLY}
          control={control}
          render={({ field }) => (
            <SwitchCard
              isActive={field.value}
              onChange={field.onChange}
              label={texts.FORM.PETS_LABEL}
              activeText={texts.FORM.PETS_ALLOWED}
              inactiveText={texts.FORM.PETS_NOT_ALLOWED}
              icon={PawPrint}
              ariaLabel={texts.FORM.PETS_LABEL}
            />
          )}
        />
      </div>
    </div>
  );
};
