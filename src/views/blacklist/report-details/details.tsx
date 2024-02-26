import React from "react";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../utilities/functions";
import Button from "../../../components/button";
import useRequest from "../../../components/hooks/use-request";
import { useForm } from "react-hook-form";
import { showToast } from "../../../components/toast";

interface DetailsProps {
  report: {
    id: string;
    note: string;
    image: string[];
    status: string;
    reportedBy: {
      id: string;
      fullname: string;
      created_at: string;
    };
    reportedMerchant: {
      id: string;
      fullname: string;
      phone: string;
      socialMediaPlatform: string;
      socialMediaHandle: string;
    };
  };
}

const Details: React.FC<DetailsProps> = ({ report }) => {
  const Detail = ({ title, value }: any) => {
    return (
      <div className="flex justify-between px-10 mt-4 text-[16px]">
        <p>{title}</p>
        <p className="text-left">{value}</p>
      </div>
    );
  };

  const userToken = localStorage.getItem("token");
  const { makeRequest: getApproved } = useRequest(
    `/reports/blacklist/${report?.id}`,
    "POST",
    {
      userToken,
    }
  );

  const { makeRequest: getDeleted } = useRequest(
    `/reports/blacklist/delete`,
    "DELETE",
    {
      userToken,
    }
  );

  const { handleSubmit, control, reset } = useForm();

  const handleApproved = handleSubmit(async () => {
    const [response] = await getApproved();
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
  });

  const handleDelete = handleSubmit(async () => {
    const [response] = await getDeleted();
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
      window.location.reload();
    } else {
      showToast(response.message[0], false, {
        position: "top-center",
      });
    }
  });

  return (
    <section className="w-full border-r-2">
      <div className="flex justify-between px-10 w-full">
        <h1 className="text-[18px] font-semibold"> Report Details</h1>
        <p className="text-[12px]">{report?.status}</p>
      </div>

      <Detail
        title="Business Name:"
        value={capitalizeFirstLetter(
          report?.reportedMerchant?.fullname
            ? report?.reportedMerchant?.fullname
            : "N/A"
        )}
      />

      <Detail
        title="Phone number:"
        value={capitalizeFirstLetter(
          report?.reportedMerchant?.phone
            ? report?.reportedMerchant?.phone
            : "N/A"
        )}
      />

      <Detail
        title="Social media platform:"
        value={capitalizeFirstLetter(
          report?.reportedMerchant?.socialMediaPlatform
            ? report?.reportedMerchant?.socialMediaPlatform
            : "N/A"
        )}
      />

      <Detail
        title="Social media handle:"
        value={capitalizeFirstLetter(
          report?.reportedMerchant?.socialMediaHandle
            ? report?.reportedMerchant?.socialMediaHandle
            : "N/A"
        )}
      />

      <div className="px-10 mt-5">
        <p>Additional Note:</p>
        <p className="border text-center text-[14px] p-3 mt-3 rounded-md">
          "{report?.note}"
        </p>
      </div>

      <Detail
        title="Reported by:"
        value={capitalizeFirstLetter(
          report?.reportedBy?.fullname ? report?.reportedBy?.fullname : "N/A"
        )}
      />

      <Detail
        title="Date of report:"
        value={formatDate(
          report?.reportedBy?.created_at
            ? report?.reportedBy?.created_at
            : "N/A"
        )}
      />

      <div className="flex gap-8 justify-center items-center mt-5 px-10">
        <Button size="lg" variant="secondary" type="submit" onClick={handleApproved}>
          Approve report
        </Button>
      </div>

      <div className="flex gap-8 justify-center items-center mt-5 px-10">
        <Button size="lg" variant="secondary" type="button" onClick={handleDelete}>
          Delete report
        </Button>
      </div>
    </section>
  );
};

export default Details;
