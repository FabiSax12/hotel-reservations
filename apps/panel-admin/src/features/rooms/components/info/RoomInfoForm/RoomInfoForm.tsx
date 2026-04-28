"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "@heroui/react";
import { useI18n } from "@/locales";
import { ROOM_INFO_FORM_STYLES as s } from "./RoomInfoForm.styles";
import {
  roomInfoSchema,
  type RoomInfoFormData,
  type RoomInfoFormProps,
} from "./RoomInfoForm.interface";
import {
  DEFAULT_ADULTS,
  DEFAULT_KIDS,
} from "../../../constants/info.constants";
import { ROOM_FORM_FIELDS } from "../../../constants/roomFormFields";
import type { RoomsTexts } from "../../../i18n/roomsTexts.type";

// Sections
import { RoomBasicInfo } from "./sections/RoomBasicInfo";
import { RoomCapacity } from "./sections/RoomCapacity";
import { RoomFees } from "./sections/RoomFees";
import { RoomExtraInfo } from "./sections/RoomExtraInfo";

export const RoomInfoForm: React.FC<RoomInfoFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const { t } = useI18n();
  const texts = t.ROOMS;

  const methods = useForm<RoomInfoFormData>({
    resolver: zodResolver(roomInfoSchema),
    defaultValues: initialData || {
      [ROOM_FORM_FIELDS.NAME]: "",
      [ROOM_FORM_FIELDS.CATEGORY]: "",
      [ROOM_FORM_FIELDS.CAPACITY_ADULTS]: DEFAULT_ADULTS,
      [ROOM_FORM_FIELDS.CAPACITY_KIDS]: DEFAULT_KIDS,
      [ROOM_FORM_FIELDS.DESCRIPTION]: "",
      [ROOM_FORM_FIELDS.REGULAR_FEE]: 0,
      [ROOM_FORM_FIELDS.HIGH_SEASON_FEE]: 0,
      [ROOM_FORM_FIELDS.IS_ACTIVE]: true,
      [ROOM_FORM_FIELDS.IS_PET_FRIENDLY]: false,
    },
  });

  const getErrorMessage = (errorKey?: string) => {
    if (!errorKey) return undefined;
    const parts = errorKey.split(".");
    if (parts[0] === "VALIDATION" && parts[1]) {
      return (texts.VALIDATION as any)[parts[1]];
    }
    return errorKey;
  };

  return (
    <div className={s.container}>
      <header className={s.header}>
        <h1 className={s.title}>
          {initialData ? texts.FORM.TITLE_EDIT : texts.FORM.TITLE_CREATE}
        </h1>
        <p className={s.subtitle}>
          {initialData ? texts.MESSAGES.SUCCESS_EDIT : texts.FORM.DESCRIPTION_PLACEHOLDER}
        </p>
      </header>

      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)} className={s.form}>
          <RoomBasicInfo texts={texts} getErrorMessage={getErrorMessage} />
          <RoomCapacity texts={texts} getErrorMessage={getErrorMessage} />
          <RoomFees texts={texts} getErrorMessage={getErrorMessage} />
          <RoomExtraInfo texts={texts} />

          {/* Actions */}
          <div className={s.actions}>
            <Button
              className={s.cancelButton}
              variant="ghost"
              isDisabled={isLoading}
            >
              {texts.FORM.CANCEL}
            </Button>
            <Button
              type="submit"
              className={s.submitButton}
              isPending={isLoading}
            >
              {initialData ? texts.FORM.SUBMIT_EDIT : texts.FORM.SUBMIT_CREATE}
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
};
