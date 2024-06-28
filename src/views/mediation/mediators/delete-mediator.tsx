import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import useRequest from "../../../components/hooks/use-request";
import defaultPhoto from "../../../assets/default-avatar.svg";

interface DetailsProps {
  agent: {
    id: string;
    fullname: string;
    email: string;
    status: string;
    created_at: string;
    profilePhoto: string;
    phone: string;
  };
}

interface AgentProfileProps {
  visible: boolean;
  handleClose: () => void;
  id: string;
}

const DeleteMediator: React.FC<AgentProfileProps> = ({ visible, handleClose, id }: any) => {
  const Details = ({ title, value}: any) => {
    return (
      <div className="flex justify-between text-[16px]  px-6 mt-4 w-[90%]">
        <p>{title}</p>
        <p className="text-left">{value}</p>
      </div>
    );
  };

  const [agent, setAgent] = useState<DetailsProps>();
  const { makeRequest: getRequestById } = useRequest(
    `/customer-support/agents/${id}`,
    "GET"
  );

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getRequestById(undefined, {id});
      setAgent(response?.data || null);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      width={600}
      closable={true}
      footer={null}
      className=" items-center mt-14"
    >
      <div className="px-10 py-10">
        <p className="text-[16px] font-semibold">Profile</p>
        <section className="flex gap-8 mt-10">
          <img src={agent?.agent?.profilePhoto || defaultPhoto} className="w-[100px] h-[100px]" />
          <p className="text-[16px] font-bold">{agent?.agent?.fullname}<br/>
          <span className="text-[14px] font-medium">{agent?.agent?.email} </span>
           </p>
          
        </section>

        <Details title={"Name"} value={agent?.agent?.fullname || "N/A"} />

        <Details title={"Email address:"} value={agent?.agent?.email || "N/A"} />

        <Details title={"Phone:"} value={agent?.agent?.phone || "N/A"} />
      </div>
    </Modal>
  );
};

export default DeleteMediator;
