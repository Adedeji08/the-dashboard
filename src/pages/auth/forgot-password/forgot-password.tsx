import Button from "../../../components/button";
import useRequest from "../../../components/hooks/use-request";
import { CircleLoader } from "react-spinners";
import Logo from "../../../assets/Logo Desktop.svg";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/input";
import { useState } from "react";
import Reset from "./reset";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { loading, makeRequest } = useRequest("/forgot-password", "POST");
  const { handleSubmit, control } = useForm();
  const [success, setSuccess] = useState(false);

  const handleSubmitPassword = handleSubmit(async (formData) => {
    const userEmail = {
      email: formData.email,
    };
    const [response] = await makeRequest(userEmail);
    if (response.status) {
      setSuccess(true);
    }
  });

  return (
    <>
      {success ? (
        <Reset />
      ) : (
    <div className="flex flex-col mt-20 w-[40%] mx-auto ">
      <img src={Logo} alt="logo" className="h-[27px]" />
      <p className="font-semibold text-md md:text-[26px] text-center mt-3">
      Forgot Password?
      </p>
      <span className="text-[14px] font-light text-center">
        Enter your email below to receive your password reset instructions
      </span>
      <form className="mt-6 md:mt-8" onSubmit={handleSubmitPassword}>
        <div className="gap-4 md:gap-6 mb-5">
          <Controller
            name="email"
            control={control}
            defaultValue=""
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
                className="w-full "
                label="Email Address"
                error={fieldState?.error?.message}
                onChange={field.onChange}
              />
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

export default ForgotPassword;
