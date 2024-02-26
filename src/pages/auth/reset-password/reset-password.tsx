import Button from "../../../components/button";
import useRequest from "../../../components/hooks/use-request";
import { CircleLoader } from "react-spinners";
import Logo from "../../../assets/Logo Desktop.svg";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/input";
import { useState } from "react";
import Success from "./success";
import Visible from "../../../assets/Eye.svg";
import Invisible from "../../../assets/eye-regular.svg";
import { showToast } from "../../../components/toast";

const ResetPassword = () => {
  const { loading, makeRequest } = useRequest("/users/reset-password", "PUT");
  const { handleSubmit, control } = useForm();
  const [success, setSuccess] = useState(false);

  const [viewPassword, setViewPassword] = useState("");
  const [confirmViewPassword, setConfirmViewPassword] = useState("");

  const handleShowPassword = () => {
    setViewPassword((previousValue): any => !previousValue);
  };

  const handleConfirmShowPassword = () => {
    setConfirmViewPassword((previousValue): any => !previousValue);
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

  const handleSubmitPassword = handleSubmit(async (formData) => {
    const userReset = {
      resetPasswordToken: formData.resetPasswordToken,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    const [response] = await makeRequest(userReset);
    if (response.status) {
      setSuccess(true);
      showToast(response.message, true, {
        position: "top-center",
      });
    }
    else{
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  });

  return (
    <>
      {success ? (
        <Success />
      ) : (
        <div className="flex flex-col mt-20 w-[40%] mx-auto ">
          <img src={Logo} alt="logo" className="h-[27px]" />
          <p className="font-semibold text-md md:text-[26px] text-center mt-3">
            Reset Password
          </p>

          <form className="mt-6 md:mt-8" onSubmit={handleSubmitPassword}>
            <div className="gap-4 md:gap-6 mb-5">
              <Controller
                name="resetPasswordToken"
                control={control}
                defaultValue=""
                rules={{
                  required: "Code is required",
                  minLength: {
                    value: 4,
                    message: "Code must be 4 digits",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    value={field.value}
                    className="w-full"
                    label="Code"
                    type="number"
                    error={fieldState?.error?.message}
                    onChange={field.onChange}
                  />
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
                      type={viewPassword ? "text" : "password"}
                      value={field.value}
                      className="w-full mt-3"
                      error={fieldState?.error?.message}
                      onChange={field.onChange}
                    />
                    <button
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      className="w-5 h-5 absolute top-1/2 right-2 transform -translate-y-1/2 mt-3 md:mt-4"
                      type="button"
                    >
                      {viewPassword ? (
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
                      className="w-full mt-3"
                      error={fieldState?.error?.message}
                      onChange={field.onChange}
                    />
                    <button
                      onClick={handleConfirmShowPassword}
                      onMouseDown={handleConfirmMouseDownPassword}
                      className="w-5 h-5 absolute top-1/2 right-2 transform -translate-y-1/2 mt-3 md:mt-4"
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
              <Button size="md" variant="primary" type="submit">
                {loading ? (
                  <CircleLoader color="#ffffff" loading={loading} size={20} />
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
