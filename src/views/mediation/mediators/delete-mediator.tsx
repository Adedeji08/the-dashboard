import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import useRequest from "../../../components/hooks/use-request";
import { CircleLoader } from "react-spinners";
import Icon from "../../../assets/icons";
import { showToast } from "../../../components/toast";
interface AgentProfileProps {
  visible: boolean;
  handleClose: () => void;
  id: string;
}

const DeleteMediator: React.FC<AgentProfileProps> = ({
  visible,
  handleClose,
  id,
}: any) => {
  const { makeRequest: getMediationDeletedById, loading } = useRequest(
    `/mediation/${'999999'}`,
    "DELETE"
  );

  const handleDelete = async () => {
    const [response] = await getMediationDeletedById();
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      width={500}
      closable={false}
      footer={null}
    >
      <button onClick={handleClose} className="flex ml-auto">
        <Icon name="cancelIcon" />
      </button>
      <h1 className="text-black font-semibold text-[24px] text-center py-5">
        Are you sure you want to delete this mediator
      </h1>

      <div className="flex gap-8 justify-center items-center mt-5">
        <button
          className="bg-[#FFC6D1] w-full rounded-md h-[47px] font-semibold text-[#FF2D55]"
          onClick={handleDelete}
        >
          {loading ? (
            <CircleLoader color="#0979A1" loading={loading} size={20} />
          ) : (
            "Delete"
          )}
        </button>

        <button
          className="bg-[#0979A1] w-full rounded-md h-[47px] font-semibold text-[#fff]"
          type="button"
          onClick={handleClose}
        >
          {loading ? (
            <CircleLoader color="#0979A1" loading={loading} size={20} />
          ) : (
            "Cancel"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteMediator;
