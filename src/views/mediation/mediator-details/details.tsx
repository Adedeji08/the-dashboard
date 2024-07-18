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
import ImagesDisplayed from "./images";

interface DetailsProps {
  mediateById:
    | {
        channel: {
          _id: string;
          status: string;
          title: string;
          createdAt: string;
          caseID: string;
          description: string;
          attachment: string[];
          claimant: {
            email: string;
            fullName: string;
            isResponseAble: boolean;
          };
          mediator: {
            fullName: string;
          };
        };
      }
    | undefined;
}

interface Mediators {
  fullName: string;
  _id: string;
}

const Details: React.FC<DetailsProps> = ({ mediateById }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const userToken = localStorage.getItem("token");
  const id = mediateById?.channel?._id;
  const { makeRequest: getMediators } = useRequest(
    `/mediation/mediators`,
    "GET",
    {
      userToken,
    }
  );
  const { makeRequest: assignMediators, loading } = useRequest(
    `/mediation/channel/${id}/assign-mediator`,
    "PATCH",
    {
      userToken,
    }
  );
  const [mediate, setMediate] = useState<Mediators[]>([]);
  const attachments = mediateById?.channel?.attachment || [];
  const displayedImages = attachments.slice(0, 2);

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getMediators(undefined, {
        email: email,
        fullName: fullName,
      });
      const sortedMediators =
        response?.data?.mediators?.sort((a: any, b: any) =>
          a.fullName.localeCompare(b.fullName)
        ) || [];

      setMediate(sortedMediators);
    };
    fetchData();
  }, [email, fullName]);

  const { handleSubmit, control, setValue } = useForm();

  const handleAssignMediator = async (mediatorId: string) => {
    const mediatorID = {
      mediatorId: mediatorId,
    };
    const [response] = await assignMediators(mediatorID);
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
    const selectedMediator = mediate.find(
      (mediator) => mediator.fullName === formData.fullName
    );
    if (selectedMediator) {
      handleAssignMediator(selectedMediator._id);
    } else {
      showToast("Mediator not found", false, {
        position: "top-center",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#D1FFC9";
      case "closed":
        return "#FCCFCF";
      case "cancelled":
        return "#FBFCCF";
      default:
        return "transparent";
    }
  };

  const Detail = ({ title, value }: any) => {
    return (
      <div className="flex justify-between mt-4">
        <p>{title}</p>
        <p className="text-left">{value}</p>
      </div>
    );
  };

  if (viewAll) {
    return <ImagesDisplayed images={attachments} />;
  }

  return (
    <div className="bg-white border border-[#fff] mt-10 pt-7 h-[870px] rounded-lg w-[95%]">
      <section className="w-[36%] mx-auto">
        <div className="flex justify-between">
          <h2 className="font-bold text-[18px]">Request Details</h2>
          <p
            className="text-[10px] flex gap-3 w-20 h-4 text-center rounded-md"
            style={{
              backgroundColor: getStatusColor(
                mediateById?.channel?.status
                  ? mediateById?.channel?.status
                  : "N/A"
              ),
            }}
          >
            <span
              style={{
                backgroundColor:
                  mediateById?.channel?.status === "active" ? "green" : "red",
              }}
              className="h-[6px] w-[6px] rounded-full mt-1 ml-3"
            ></span>

            {capitalizeFirstLetter(mediateById?.channel?.status || "")}
          </p>
        </div>

        <Detail
          title="Name"
          value={capitalizeFirstLetter(
            mediateById?.channel?.claimant?.fullName || "N/A"
          )}
        />

        <Detail
          title="Email address"
          value={mediateById?.channel?.claimant?.email || "N/A"}
        />

        <Detail
          title="Assigned To"
          value={mediateById?.channel?.mediator?.fullName || "N/A"}
        />

        <Detail title="Case ID" value={mediateById?.channel?.caseID || "N/A"} />

        <Detail
          title="Date"
          value={formatDate(mediateById?.channel?.createdAt || "N/A")}
        />

        <div className="mt-5">
          <p>Request Title:</p>
          <p className="border pl-10 text-[14px] p-3 mt-3 rounded-md">
            {mediateById?.channel?.title || "N/A"}
          </p>
        </div>

        <div className="mt-5">
          <p>Request:</p>
          <p className="border pl-10 text-[14px] p-3 mt-3 rounded-md">
            {mediateById?.channel?.description || "N/A"}
          </p>
        </div>

        <div className="flex justify-between px-10 w-full mt-6">
          <h1 className="text-[18px] font-semibold">Media</h1>
          <button
            className="text-[12px] text-[#0979A1]"
            onClick={() => setViewAll(true)}
          >
            View all ({attachments.length})
          </button>
        </div>

        {displayedImages.length > 0 ? (
          <div className="images-container flex gap-4 items-center justify-between mt-5">
            {displayedImages.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`Images ${index + 1}`}
                className="w-[180px] h-[120px] rounded-md"
              />
            ))}
          </div>
        ) : (
          <p className="px-10 mt-4 text-center">No images available</p>
        )}

        <div className="flex-[40%] mt-4">
          <Controller
            name="fullName"
            control={control}
            defaultValue=""
            rules={{ required: "Select a Mediator" }}
            render={({ field, fieldState }) => (
              <SearchSelect
                label="Assign a Mediator"
                name="fullName"
                options={mediate.map((mediator) => ({
                  label: mediator.fullName,
                  value: mediator.fullName,
                }))}
                className=""
                onChange={(selectedValue) => {
                  const selectedMediator = mediate.find(
                    (mediator) => mediator.fullName === selectedValue
                  );
                  if (selectedMediator) {
                    setValue("fullName", selectedMediator.fullName);
                  }
                }}
                value={field.value}
                error={fieldState?.error?.message}
              />
            )}
          />
        </div>

        <button
          className="h-[50px] mt-8 w-full bg-[#0979A1] text-white rounded-md font-bold text-[12px]"
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircleLoader color="#ffffff" loading={loading} size={20} />
          ) : (
            "Assign a Mediator"
          )}
        </button>
      </section>

      {viewAll && <ImagesDisplayed images={displayedImages} />}
    </div>
  );
};

export default Details;
