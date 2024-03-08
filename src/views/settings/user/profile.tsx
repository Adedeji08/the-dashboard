import React, { useEffect, useState } from "react";
import Placeholder from "../../../assets/Ellipse 5.svg";
import Input from "../../../components/input";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../components/button";
import useRequest from "../../../components/hooks/use-request";
import { showToast } from "../../../components/toast";
import { CircleLoader } from "react-spinners";

interface AdminUser {
  admin: {
    id: string;
    fullname: string;
    phone: string;
    email: string;
    profilePhoto: string;
  };
}
const Profile = () => {
  const {  makeRequest: getUser } = useRequest("/admin/profile", "GET");
  const { loading, makeRequest: editProfile } = useRequest(
    "/admin/edit-profile",
    "PATCH"
  );
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getUser();
      if (response && response.data) {
        setAdminUser(response.data);
      }
    };

    fetchData();
  }, []);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const EditProfile = handleSubmit(async (formData) => {
    const user = {
      fullname: formData.fullname,
      phone: formData.phone,
    };
    const [response] = await editProfile(user);
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
      reset();
      window.location.reload()
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  });

  return (
    <div className="mt-14 w-[60%]">
      <p className="text-[14px] font-semibold">User Profile</p>
      <div className="flex gap-5 mt-10">
        <img
          src={adminUser?.admin?.profilePhoto || Placeholder}
          alt="photo"
          width={100}
        />
        <p className="mt-5 text-[14px] font-semibold">
          {adminUser?.admin?.fullname} <br />{" "}
          <span className="text-[12px] font-normal">
            {adminUser?.admin?.email}
          </span>
        </p>
      </div>

      {adminUser ? (
      <form className="w-full mt-10" onSubmit={EditProfile}>
        <div className="flex gap-6 mx-auto">
          <Controller
            name="fullname"
            control={control}
            defaultValue={adminUser?.admin?.fullname || ""}
            rules={{
              required: "Full Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                type="text"
                value={field.value}
                label="Full Name"
                className="w-full"
                error={fieldState?.error?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            defaultValue={adminUser?.admin?.phone || null}
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

        <div className="flex gap-8 justify-center items-center mt-8">
          <Button size="sm" variant="primary">
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
