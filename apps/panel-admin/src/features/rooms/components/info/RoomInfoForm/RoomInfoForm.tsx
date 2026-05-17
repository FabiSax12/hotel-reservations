"use client";

import { Button, Form } from "@heroui/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { FormProvider } from "react-hook-form";
import { useRoomInfoForm } from "@/features/rooms/components/info/hooks/useRoomInfoForm";
import { RoomBasicInfo } from "./components/RoomBasicInfo";
import { RoomCapacity } from "./components/RoomCapacity";
import { RoomExtraInfo } from "./components/RoomExtraInfo";
import { RoomFees } from "./components/RoomFees";
import type { RoomInfoFormProps } from "./RoomInfoForm.interface";
import { ROOM_INFO_FORM_STYLES as s } from "./RoomInfoForm.styles";

export const RoomInfoForm: React.FC<RoomInfoFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const router = useRouter();
  const { methods, texts, getErrorMessage } = useRoomInfoForm(initialData);

  return (
    <div className={s.container}>
      <header className={s.headerWrapper}>
        <h1 className={s.title}>{initialData ? texts.FORM.TITLE_EDIT : texts.FORM.TITLE_CREATE}</h1>
      </header>

      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)} className={s.form}>
          <div className={s.roomBasicInfo}>
            <div className={s.card}>
              <RoomBasicInfo texts={texts} getErrorMessage={getErrorMessage} />
            </div>

            <div className={s.card}>
              <RoomCapacity texts={texts} getErrorMessage={getErrorMessage} />
            </div>

            <div className={s.card}>
              <RoomFees texts={texts} getErrorMessage={getErrorMessage} />
            </div>

            <div className={s.card}>
              <RoomExtraInfo texts={texts} getErrorMessage={getErrorMessage} />
            </div>
          </div>

          <div className={s.actions}>
            <Button className={s.cancelButton} onPress={() => router.back()}>
              {texts.FORM.CANCEL}
            </Button>
            <Button type="submit" className={s.submitButton} isPending={isLoading}>
              {initialData ? texts.FORM.SUBMIT_EDIT : texts.FORM.SUBMIT_CREATE}
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
};
