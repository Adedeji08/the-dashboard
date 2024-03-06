import React from "react";
import Placeholder from "../../../assets/Ellipse 5.svg";
import Input from "../../../components/input";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../components/button";

const Profile = () => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  console.log("user", user?.fullname);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="mt-14 w-[60%]">
      <p className="text-[14px] font-semibold">User Profile</p>
      <div className="flex gap-5 mt-10">
        <img src={user?.profilePhoto || Placeholder} alt="photo" width={100} />
        <p className="mt-5 text-[14px] font-semibold">
          {user?.fullname} <br />{" "}
          <span className="text-[12px] font-normal">{user?.email}</span>
        </p>
      </div>

      <form className="w-full mt-10">
        <div className="flex gap-6 mx-auto">
          <Controller
            name="fullname"
            control={control}
            defaultValue={user?.fullname || ""}
            rules={{
              required: "Full Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                label="Full Name"
                className="w-full"
                error={fieldState?.error?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="merchantPhoneNumber"
            control={control}
            defaultValue={user?.phone || null}
            rules={{
              required: "Phone Number is required",
              pattern: {
                value: /^\d{11}$/,
                message: "Enter a valid eleven-digit phone number",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                label="Business Phone Number"
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
            defaultValue={user?.email || ""}
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
                className="w-[48%]"
                error={fieldState?.error?.message}
                onChange={field.onChange}
                readOnly
              />
            )}
          />
        </div>

        <div className="flex gap-8 justify-center items-center mt-8">
        <Button
          size="sm"
          variant="primary"
          type="submit"
        >
           Save Changes
        </Button>
      </div>
      </form>
    </div>
  );
};

export default Profile;
