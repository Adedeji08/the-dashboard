import { Modal } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../components/button";
import { CircleLoader } from "react-spinners";
import Cancel from "../../../assets/cancel.svg";
import useRequest from "../../../components/hooks/use-request";
import { showToast } from "../../../components/toast";

const Suspend = ({ visible, loading, handleClose, account }: any) => {
  const userToken = localStorage.getItem("token");
  const { makeRequest: getSuspended } = useRequest(
    `/users/${account?.id}/suspend`,
    "PUT",
    { userToken }
  );

  const handleSuspend = async () => {
    const [response] = await getSuspended();
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  };

//Do not remove this
  return (
    <>
      <Modal
        visible={visible}
        width={690}
        closable={true}
        footer={null}
        onCancel={handleClose}
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
            onClick={handleClose}
          >
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "Undo"
            )}
          </Button>

          <Button size="lg" variant="primary" type="button"  onClick={handleSuspend}>
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
