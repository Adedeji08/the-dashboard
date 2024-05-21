import React, { useEffect, useState } from "react";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../utilities/functions";
import useRequest from "../../../components/hooks/use-request";
import { Controller, useForm } from "react-hook-form";
import { showToast } from "../../../components/toast";
import SearchSelect from "../../../components/search-select";
import { CircleLoader } from "react-spinners";

interface DetailsProps {
  request:
    | {
        ticket: {
          assignedTo: {
            fullname: string;
          };
          id: string;
          fullName: string;
          email: string;
          status: string;
          created_at: string;
          ticketId: string;
          message: string;
          subject: string;
        };
      }
    | undefined;
}

interface Support {
  fullname: string;
  id: string;
}

const Details: React.FC<DetailsProps> = ({ request }) => {
  const [fullname, setFullName] = useState("");
  const userToken = localStorage.getItem("token");
  const { makeRequest: getAgents } = useRequest(
    `/customer-support/agents`,
    "GET",
    {
      userToken,
    }
  );
  const { makeRequest: assignAgent, loading } = useRequest(
    `/customer-support/ticket/assign`,
    "POST",
    {
      userToken,
    }
  );

  const { makeRequest: closeTicket } = useRequest(
    `/customer-support/ticket/resolve`,
    "PUT",
    {
      userToken,
    }
  );
  const [support, setSupport] = useState<Support[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getAgents(undefined, {
        name: fullname,
      });
      const sortedAgents =
        response?.data?.agents?.sort((a: any, b: any) =>
          a.fullname.localeCompare(b.fullname)
        ) || [];

      setSupport(sortedAgents);
    };
    fetchData();
  }, []);

  const { handleSubmit, control, setValue } = useForm();

  const handleAssignAgent = async (agentId: string) => {
    const SupportID = {
      ticketId: request?.ticket?.id,
      agentId: agentId,
    };
    const [response] = await assignAgent(SupportID);
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

  const onSubmit = (formData: any) => {
    const selectedAgent = support.find(
      (supports) => supports.fullname === formData.fullname
    );
    if (selectedAgent) {
      handleAssignAgent(selectedAgent.id);
    } else {
    }
  };

  const handleResolved = async () => {
    const [response] = await closeTicket(undefined, {
      id: request?.ticket?.id,
    });
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
      window.location.reload();
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#D1FFC9";
      case "resolved":
        return "#D1FFC9";
      case "in_progress":
        return "#FFA07A";
      case "pending":
        return "#FCCFCF";
      case "closed":
        return "#FCCFCF";
      case "cancelled":
        return "#FBFCCF";
      default:
        return "transparent";
    }
  };

  const Detail = ({ title, value, img }: any) => {
    return (
      <div className="flex justify-between mt-4">
        <p>{title}</p>
        <p className="text-left">{value}</p>
      </div>
    );
  };

  return (
    <div className=" bg-white border border-[#fff] mt-10 pt-7 rounded-lg w-[95%] ">
      <section className="w-[45%] mx-auto">
        <div className="flex justify-between">
          <h2 className="font-bold text-[18px]">Request Details</h2>
          <p
            className="text-[10px] flex gap-3 w-28 h-4 text-center rounded-md"
            style={{
              backgroundColor: getStatusColor(request?.ticket?.status || "N/A"),
            }}
          >
            <span
              style={{
                backgroundColor:
                  request?.ticket?.status === "resolved"
                    ? "green"
                    : "red",
              }}
              className="h-[6px] w-[6px] rounded-full mt-1 ml-3"
            ></span>

            {capitalizeFirstLetter(request?.ticket?.status || "")}
          </p>
        </div>

        <Detail
          title="Name:"
          value={capitalizeFirstLetter(request?.ticket?.fullName || "N/A")}
        />

        <Detail
          title="Email address:"
          value={request?.ticket?.email || "N/A"}
        />

        <Detail title="Ticket ID:" value={request?.ticket?.ticketId || "N/A"} />

        <Detail
          title="Assigned to:"
          value={request?.ticket?.assignedTo?.fullname || "N/A"}
        />

        <Detail
          title="Date"
          value={formatDate(request?.ticket?.created_at || "N/A")}
        />

        <div className=" mt-5">
          <p>Request Title:</p>
          <p className="border pl-10 text-[14px] p-3 mt-3 rounded-md">
            {request?.ticket?.subject || "N/A"}
          </p>
        </div>

        <div className=" mt-5">
          <p>Request:</p>
          <p className="border pl-10 text-[14px] p-3 mt-3 rounded-md">
            {request?.ticket?.message || "N/A"}
          </p>
        </div>

        <div className="flex-[40%] mt-4">
          <Controller
            name="fullname"
            control={control}
            defaultValue=""
            rules={{ required: "Select an Agent" }}
            render={({ field, fieldState }) => (
              <SearchSelect
                label="Assign an Agent"
                name="fullName"
                options={support.map((supports) => ({
                  label: supports.fullname,
                  value: supports.fullname,
                }))}
                className=""
                onChange={(selectedValue) => {
                  const selectedAgent = support.find(
                    (supports) => supports.fullname === selectedValue
                  );
                  if (selectedAgent) {
                    setValue("fullname", selectedAgent.fullname);
                  }
                }}
                value={field.value}
                error={fieldState?.error?.message}
              />
            )}
          />
        </div>

        <div className="h-52">
          <button
            className={`h-[50px] mt-8 w-full rounded-md font-bold text-[12px] ${
              request?.ticket?.status === "resolved"
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-[#0979A1] text-white"
            }`}
            onClick={handleSubmit(onSubmit)}
            disabled={request?.ticket?.status === "resolved"}
          >
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "  Assign to agent"
            )}
          </button>

          <button
            className={`h-[50px] mt-8 w-full rounded-md font-bold text-[12px] ${
              request?.ticket?.status === "resolved"
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-[#0979A1] text-white"
            }`}
            onClick={handleResolved}
            disabled={request?.ticket?.status === "resolved"}
          >
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "Resolve ticket"
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Details;
