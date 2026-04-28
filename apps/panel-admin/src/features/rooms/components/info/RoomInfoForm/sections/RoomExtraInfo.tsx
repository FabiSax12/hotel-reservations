"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Label, TextArea, Switch } from "@heroui/react";
import { ROOM_INFO_FORM_STYLES as s } from "../RoomInfoForm.styles";
import { ROOM_FORM_FIELDS } from "../../../../constants/roomFormFields";
import type { RoomInfoFormData } from "../RoomInfoForm.interface";
import type { RoomsTexts } from "../../../../i18n/roomsTexts.type";

interface RoomExtraInfoProps {
  texts: RoomsTexts;
}

export const RoomExtraInfo: React.FC<RoomExtraInfoProps> = ({ texts }) => {
  const { register, control } = useFormContext<RoomInfoFormData>();

  return (
    <div className={s.section}>
      <TextField name={ROOM_FORM_FIELDS.DESCRIPTION} className={s.fullWidth}>
        <Label className={s.label}>{texts.FORM.DESCRIPTION_LABEL}</Label>
        <TextArea
          {...register(ROOM_FORM_FIELDS.DESCRIPTION)}
          placeholder={texts.FORM.DESCRIPTION_PLACEHOLDER}
          className={s.input}
        />
      </TextField>

      <div className={s.switchContainer}>
        <Label className={s.label}>{texts.FORM.STATE_LABEL}</Label>
        <Controller
          name={ROOM_FORM_FIELDS.IS_ACTIVE}
          control={control}
          render={({ field }) => (
            <Switch
              isSelected={field.value}
              onChange={field.onChange}
            >
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Label className={s.switchLabel}>
                {field.value ? texts.FORM.STATE_ACTIVE : texts.FORM.STATE_INACTIVE}
              </Label>
            </Switch>
          )}
        />
      </div>

      <div className={s.switchContainer}>
        <Label className={s.label}>{texts.FORM.PETS_LABEL}</Label>
        <Controller
          name={ROOM_FORM_FIELDS.IS_PET_FRIENDLY}
          control={control}
          render={({ field }) => (
            <Switch
              isSelected={field.value}
              onChange={field.onChange}
            >
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Label className={s.switchLabel}>
                {field.value ? texts.FORM.PETS_ALLOWED : texts.FORM.PETS_NOT_ALLOWED}
              </Label>
            </Switch>
          )}
        />
      </div>
    </div>
  );
};
