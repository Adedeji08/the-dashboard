import { Modal } from "antd";
import React from "react";
import Input from "../../../components/input";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../components/button";

const AddMediator = ({ visible, handleClose }: any) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
      } = useForm();
  return (
    <>
      <Modal
        visible={visible}
        onCancel={handleClose}
        width={790}
        closable={true}
        footer={null}
        className="flex justify-center items-center"
      >
        <h1 className="font-bold text-left text-[#040821] text-[18px]">
        Add a Mediator
        </h1>

        <form className="w-full mt-10">
        <div className="flex gap-6 mx-auto">
          <Controller
            name="fullname"
            control={control}
            defaultValue={""}
            rules={{
              required: "Mediator Name is required",
              minLength: {
                value: 3,
                message: "Mediator must be at least 3 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                label="Mediator Name"
                className="w-full"
                error={fieldState?.error?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="username"
            control={control}
            defaultValue={''}
            rules={{
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              }}
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                label="Username"
                className="w-full"
                error={fieldState?.error?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="mt-5">
          <Controller
            name="email"
            control={control}
            defaultValue={''}
            rules={{
              required: "Email Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                label="Email"
                className="w-full"
                error={fieldState?.error?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex gap-8 justify-center items-center mt-8">
        <Button
          size="md"
          variant="primary"
          type="submit"
        >
           Add a mediator
        </Button>
      </div>
      </form>
      </Modal>
    </>
  );
};

export default AddMediator;
