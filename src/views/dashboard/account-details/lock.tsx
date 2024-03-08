import { Modal } from "antd";
import React from "react";
import Button from "../../../components/button";
import { CircleLoader } from "react-spinners";
import Locks from "../../../assets/lock.svg";
import useRequest from "../../../components/hooks/use-request";
import { showToast } from "../../../components/toast";

  const BlockUser = ({ visible, loading, handleClose, account }: any) => {
    const userToken = localStorage.getItem("token");
    const { makeRequest: getBlocked } = useRequest(
      `/users/${account?.id}/block`,
      "DELETE",
      { userToken }
    );
  
    const handleBlockUser = async () => {
      const [response] = await getBlocked();
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
  return (
    <>
      <Modal
        visible={visible}
        onCancel={handleClose}
        width={690}
        closable={true}
        footer={null}
        className="flex justify-center items-center"
      >
        <div className="flex justify-center items-center">
          <img src={Locks} alt="Locks" />
        </div>

        <h1 className="text-center font-bold text-[#040821] text-lg md:text-[18px]">
          Account Locked
        </h1>
        <p className="text-center text-base md:text-[14px] font-normal mt-4">
          You have locked AQUA Stores Limited’s account
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

          <Button size="lg" variant="primary" type="button" onClick={handleBlockUser}>
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

export default BlockUser;
