import { Modal } from "antd";
import React from "react";
import Input from "../../../components/input";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../components/button";
import useRequest from "../../../components/hooks/use-request";
import { showToast } from "../../../components/toast";
import { CircleLoader } from "react-spinners";

const AddMediator = ({ visible, handleClose }: any) => {
  const userToken = localStorage.getItem("token");
  const { loading, makeRequest } = useRequest("/mediation/add-mediator", "POST", {
    userToken
  });
  const {
    handleSubmit,
    control,
    reset,
  } = useForm();

  const addMediator = handleSubmit(async (formData) => {
    const mediator = {
      fullName: formData.fullName,
      email: formData.email,
    };
    const [response] = await makeRequest(mediator);
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
      reset()
    } else {
      showToast(response.message[0], false, {
        position: "top-center",
      });
    }
  });

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

        <form className="w-full mt-10" onSubmit={addMediator}>
          <div className="flex gap-6 mx-auto">
            <Controller
              name="fullName"
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
              name="email"
              control={control}
              defaultValue={""}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email. E.g, example@gmail.com",
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
            <Button size="md" variant="primary" type="submit">
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "Add a mediator"
            )}
          </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddMediator;
