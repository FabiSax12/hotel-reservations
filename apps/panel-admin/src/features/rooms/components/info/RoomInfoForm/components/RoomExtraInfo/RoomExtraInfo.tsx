"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Label, TextArea, Switch, FieldError } from "@heroui/react";
import { ROOM_EXTRA_INFO_STYLES as s } from "./RoomExtraInfo.styles";
import { ROOM_FORM_FIELDS } from "@/features/rooms/constants/roomFormFields";
import { ICON_SIZES } from "@/features/rooms/constants/info.constants";
import type { RoomInfoFormData } from "@/features/rooms/components/info/RoomInfoForm/RoomInfoForm.interface";
import { Activity, PawPrint, AlignLeft } from "lucide-react";
import type { RoomExtraInfoProps } from "./RoomExtraInfo.interface";

export const RoomExtraInfo: React.FC<RoomExtraInfoProps> = ({ texts, getErrorMessage }) => {
  const { register, control, formState: { errors } } = useFormContext<RoomInfoFormData>();

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
            className={`${s.input} ${s.inputWithIcon} py-4`}
          />
        </div>
        <FieldError>{getErrorMessage(errors.description?.message)}</FieldError>
      </TextField>

      <div className={s.gridContainer}>
        <Controller
          name={ROOM_FORM_FIELDS.IS_ACTIVE}
          control={control}
          render={({ field }) => (
            <div 
              className={s.switchCard(field.value)}
              onClick={() => field.onChange(!field.value)}
            >
              <div className={s.cardHeader}>
                <div className={s.iconContainer(field.value)}>
                  <Activity size={ICON_SIZES.SM} />
                </div>
                <div className={s.cardInfo}>
                  <span className={s.switchLabel}>{texts.FORM.STATE_LABEL}</span>
                  <span className={s.statusText(field.value)}>
                    {field.value ? texts.FORM.STATE_ACTIVE : texts.FORM.STATE_INACTIVE}
                  </span>
                </div>
              </div>
              <div className={s.switchWrapper}>
                <Switch
                  isSelected={field.value}
                  onChange={field.onChange}
                  aria-label={texts.FORM.STATE_LABEL}
                />
              </div>
            </div>
          )}
        />

        <Controller
          name={ROOM_FORM_FIELDS.IS_PET_FRIENDLY}
          control={control}
          render={({ field }) => (
            <div 
              className={s.switchCard(field.value)}
              onClick={() => field.onChange(!field.value)}
            >
              <div className={s.cardHeader}>
                <div className={s.iconContainer(field.value)}>
                  <PawPrint size={ICON_SIZES.SM} />
                </div>
                <div className={s.cardInfo}>
                  <span className={s.switchLabel}>{texts.FORM.PETS_LABEL}</span>
                  <span className={s.statusText(field.value)}>
                    {field.value ? texts.FORM.PETS_ALLOWED : texts.FORM.PETS_NOT_ALLOWED}
                  </span>
                </div>
              </div>
              <div className={s.switchWrapper}>
                <Switch
                  isSelected={field.value}
                  onChange={field.onChange}
                  aria-label={texts.FORM.PETS_LABEL}
                />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};
