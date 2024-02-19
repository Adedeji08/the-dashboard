import { Modal } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "../../../components/select";
import Textarea from "../../../components/textarea";
import UploadEvidence from "./upload";
import Button from "../../../components/button";
import { CircleLoader } from "react-spinners";
import Cancel from "../../../assets/cancel.svg";

const Suspend = (props: any) => {
  const { visible, loading } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const Refund: Record<string, string> = {
    suspicious: "Suspicious Transaction",
    chargeback: "Chargeback Request",
    violate: "Violation of Terms and conditions",
    violation: "Violation of Privacy Policy",
    blacklist: "Blacklist Report(s)",
    spam: "Spam Report",
    investigation: "Investigation",
    other: "Other",
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Modal
        width={600}
        visible={visible}
        closable={true}
        footer={null}
        onCancel={() => props.handleClose()}
      >
        <h3 className="text-[18px] font-semibold mt-4">Suspend account</h3>
        <p className="text-[14px]">
          Are you sure you want to suspend this account?
        </p>

        <div className=" mt-3">
          <Controller
            name="reason"
            control={control}
            defaultValue=""
            rules={{ required: "Select a Platform" }}
            render={({ field, fieldState }) => (
              <Select
                label="Reason"
                name="reason"
                options={Object.entries(Refund).map((platform) => {
                  const [value, label] = platform;
                  return {
                    value,
                    label,
                  };
                })}
                className=""
                onChange={(selectedValue) => {
                  field.onChange(selectedValue);
                }}
                value={field.value}
                error={fieldState?.error?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: "Select a Platform" }}
            render={({ field, fieldState }) => (
              <Textarea
                value={field.value}
                label="Additional Note"
                className="w-full"
                error={fieldState?.error?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <UploadEvidence />

        <div className="flex gap-8 justify-center items-center mt-5">
          <Button
            size="lg"
            variant="secondary"
            type="submit"
            onClick={() => props.handleClose()}
          >
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "Cancel"
            )}
          </Button>

          <Button size="lg" variant="primary" type="button" onClick={handleOk}>
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "Suspend"
            )}
          </Button>
        </div>
      </Modal>

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel} 
        width={690}
        closable={true}
        footer={null}
        className="flex justify-center items-center"
      >
        <div className="flex justify-center items-center">
          <img src={Cancel} alt="Cancel" />
        </div>

        <h1 className="text-center font-bold text-[#040821] text-lg md:text-[18px]">
          Account Suspended
        </h1>
        <p className="text-center text-base md:text-[14px] font-normal mt-4">
          You have suspended AQUA Stores Limited’s account
        </p>

        <div className="flex gap-5 justify-center items-center mt-5">
          <Button
            size="lg"
            variant="secondary"
            type="submit"
            onClick={handleCancel}
          >
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "Undo"
            )}
          </Button>

          <Button size="lg" variant="primary" type="button">
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "Proceed"
            )}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Suspend;
