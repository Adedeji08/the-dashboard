import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/input";
import Visible from "../../../assets/Eye.svg";
import Invisible from "../../../assets/eye-regular.svg";
import { CircleLoader } from "react-spinners";
import Button from "../../../components/button";
import useRequest from "../../../components/hooks/use-request";

const ChangePassword = () => {
  const { loading, makeRequest } = useRequest("/users/reset-password", "PUT");
  const { handleSubmit, control } = useForm();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmViewPassword, setConfirmViewPassword] = useState("");

  const handleCurrentPassword = () => {
    setCurrentPassword((previousValue): any => !previousValue);
  };

  const handleShowPassword = () => {
    setNewPassword((previousValue): any => !previousValue);
  };

  const handleConfirmShowPassword = () => {
    setConfirmViewPassword((previousValue): any => !previousValue);
  };

  const handleCurrentMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleConfirmMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="mt-14 w-[60%]">
      <p className="text-[14px] font-semibold">Change Password</p>
      <p className="text-[10px] font-normal">
        Enter your current password to change your password
      </p>

      <form className="mt-6 md:mt-8">
        <div className="gap-4 md:gap-6 mb-5">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <div className="w-full relative">
                <Input
                  label="Current Password"
                  type={currentPassword ? "text" : "password"}
                  value={field.value}
                  className="w-1/2"
                  error={fieldState?.error?.message}
                  onChange={field.onChange}
                />
                <button
                  onClick={handleCurrentPassword}
                  onMouseDown={handleCurrentMouseDownPassword}
                  className="w-5 h-5 absolute top-1/2 right-[52%] transform -translate-y-1/2 mt-3 md:mt-4"
                  type="button"
                >
                  {currentPassword ? (
                    <img src={Invisible} alt="password" />
                  ) : (
                    <img src={Visible} alt="password" />
                  )}
                </button>
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              maxLength: {
                value: 13,
                message: "Password must not be more than 13 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <div className="w-full relative">
                <Input
                  label="New Password"
                  type={newPassword ? "text" : "password"}
                  value={field.value}
                  className="w-1/2 mt-3"
                  error={fieldState?.error?.message}
                  onChange={field.onChange}
                />
                <button
                  onClick={handleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  className="w-5 h-5 absolute top-1/2 right-[52%] transform -translate-y-1/2 mt-3 md:mt-4"
                  type="button"
                >
                  {newPassword ? (
                    <img src={Invisible} alt="password" />
                  ) : (
                    <img src={Visible} alt="password" />
                  )}
                </button>
              </div>
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              maxLength: {
                value: 13,
                message: "Password must not be more than 13 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <div className="w-full relative">
                <Input
                  label="Confirm Password"
                  type={confirmViewPassword ? "text" : "password"}
                  value={field.value}
                  className="w-1/2 mt-3"
                  error={fieldState?.error?.message}
                  onChange={field.onChange}
                />
                <button
                  onClick={handleConfirmShowPassword}
                  onMouseDown={handleConfirmMouseDownPassword}
                  className="w-5 h-5 absolute top-1/2 right-[52%] transform -translate-y-1/2 mt-3 md:mt-4"
                  type="button"
                >
                  {confirmViewPassword ? (
                    <img src={Invisible} alt="password" />
                  ) : (
                    <img src={Visible} alt="password" />
                  )}
                </button>
              </div>
            )}
          />
        </div>

        <div className="flex justify-center items-center mt-10">
          <Button size="sm" variant="primary" type="submit">
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
