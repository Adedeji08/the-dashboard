import React from "react";
import Textarea from "../../../components/textarea";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../components/button";
import useRequest from "../../../components/hooks/use-request";
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
      email: string;
      phone: string;
      socialMediaPlatform: string;
      socialMediaHandle: string;
    };
  };
}

const PreviousReport: React.FC<DetailsProps> = ({ report }) => {
  const { handleSubmit, control, reset } = useForm();
  const userToken = localStorage.getItem("token");
  const reportId = report?.id;
  const merchantEmail = report?.reportedMerchant?.email;
  const { makeRequest: getApproved } = useRequest(
    `/reports/blacklist/reportId`,
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

  const handleApproved = handleSubmit(async (formData) => {
    const UserReason = {
      reason: formData.reason,
    };
    const [response] = await getApproved(UserReason, {
      reportId: reportId
    });
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
      reset();
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  });

  const handleDelete = async () => {
    const userEmail = {
      email: merchantEmail,
    };
    const [response] = await getDeleted(userEmail);
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
    } else {
      showToast(response.message[0], false, {
        position: "top-center",
      });
    }
  };

  return (
    <section className="w-full px-10">
      <p className="text-[14px] font-medium mt-3">
        Send an email to the Reported Merchant
      </p>

      <div className="flex gap-8 justify-center items-center mt-5">
        <Button
          size="lg"
          variant="primary"
          type="button"
          className="text-[14px]"
        >
          Send Email
        </Button>
      </div>

      <form onSubmit={handleApproved} className="mt-10">
        <p className="text-[14px] font-medium">Approve Report</p>
        <Controller
          name="reason"
          control={control}
          defaultValue=""
          rules={{
            required: "Reason is required",
            minLength: {
              value: 10,
              message: "Reason must be at least 10 characters",
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <Textarea
                value={field.value}
                label="Reason for approval:"
                className="w-full"
                error={fieldState?.error?.message}
                onChange={field.onChange}
              />
            </>
          )}
        />
        <div className="flex gap-8 justify-center items-center mt-5 ">
          <Button
            size="lg"
            variant="primary"
            type="submit"
          >
            Approve report
          </Button>
        </div>
      </form>

      <div className="flex gap-8 justify-center items-center mt-5">
        <Button
          size="lg"
          variant="secondary"
          type="button"
          onClick={handleDelete}
        >
          Delete report
        </Button>
      </div>
    </section>
  );
};

export default PreviousReport;
