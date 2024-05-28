import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import Input from "../../../components/input";
import { Controller, useForm } from "react-hook-form";
import useRequest from "../../../components/hooks/use-request";
import { showToast } from "../../../components/toast";
import { CircleLoader } from "react-spinners";
import SearchSelect from "../../../components/search-select";
import Icon from "../../../assets/icons";
import Visible from "../../../assets/Eye.svg";
import Invisible from "../../../assets/eye-regular.svg";

interface Roles {
  name: string;
  id: string;
}

const AddAdmin = ({ visible, handleClose }: any) => {
  const userToken = localStorage.getItem("token");
  const { loading, makeRequest } = useRequest("/auth/register", "POST", {
    userToken,
  });
  const { makeRequest: getRoles } = useRequest(`/roles`, "GET");
  const [roles, setRoles] = useState<Roles[]>([]);
  const { handleSubmit, control, reset, setValue } = useForm();
  const [viewPassword, setViewPassword] = useState("");
  const handleShowPassword = () => {
    setViewPassword((previousValue): any => !previousValue);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getRoles(undefined);
      const sortedRoles =
        response?.data?.roles?.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        ) || [];

      setRoles(sortedRoles);
    };
    fetchData();
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  const addAdmin = handleSubmit(async (formData) => {
    const selectedRole = roles.find((role) => role.name === formData.role);

    if (!selectedRole) {
      showToast("Please select a valid role", false, {
        position: "top-center",
      });
      return;
    }

    const admin = {
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
      role: selectedRole.id,
    };

    const [response] = await makeRequest(admin);
    if (response.status) {
      showToast(response.message, true, { position: "top-center" });
      reset();
    } else {
      showToast(response.message, false, { position: "top-center" });
    }
  });

  return (
    <>
      <Modal
        visible={visible}
        onCancel={handleClose}
        width={790}
        closable={false}
        footer={null}
        // className="flex justify-center items-center mt-14"
      >
        <h1 className="font-bold text-left text-[#040821] text-[24px]">
          Add Admin
        </h1>

        <form className="w-full mt-10" onSubmit={addAdmin}>
          <div className="flex gap-6 mx-auto">
            <Controller
              name="fullname"
              control={control}
              defaultValue={""}
              rules={{
                required: "Admin Name is required",
                minLength: {
                  value: 3,
                  message: "Admin must be at least 3 characters",
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
                  label="Email Address"
                  className="w-full"
                  error={fieldState?.error?.message}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex gap-6 mx-auto">
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
                    label="Password"
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
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: "Select a Role" }}
              render={({ field, fieldState }) => (
                <SearchSelect
                  label="Role"
                  name="role"
                  options={roles.map((role) => ({
                    label: role.name,
                    value: role.name,
                  }))}
                  className="w-full mt-3"
                  onChange={(selectedValue) => {
                    const selectedRole = roles.find(
                      (role) => role.name === selectedValue
                    );
                    if (selectedRole) {
                      setValue("role", selectedRole.name);
                    }
                  }}
                  value={field.value}
                  error={fieldState?.error?.message}
                />
              )}
            />
          </div>
          <div className="flex gap-8 justify-between items-center mt-8">
            <button
              className=" flex gap-3 font-medium text-[16px]"
              type="button"
              onClick={handleClose}
            >
              <Icon name="backicon" />
              Go Back
            </button>
            <button
              className="w-[244px] h-[55px] rounded-2xl text-white text-[16px] bg-[#0979A1]"
              type="submit"
            >
              {loading ? (
                <CircleLoader color="#ffffff" loading={loading} size={20} />
              ) : (
                "Add Admin"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddAdmin;
