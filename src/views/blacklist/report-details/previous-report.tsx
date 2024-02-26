import React from "react";
import Textarea from "../../../components/textarea";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../components/button";

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

const PreviousReport: React.FC<DetailsProps> = ({ report }) => {
  const { handleSubmit, control, reset } = useForm();
  return (
    <section className="w-full px-10">
      <div className="flex justify-between w-full">
        <h1 className="text-[18px] font-semibold">Media</h1>
        <p className="text-[12px] text-[#0979A1]">
          View all ({report?.image?.length})
        </p>
      </div>

      <div className="images-container">
        {Array.isArray(report?.image) &&
          report?.image.map((img, index) => (
            <img
              key={index}
              src={`data:image/jpeg;base64,${img}`}
              alt={`Image ${index}`}
            />
          ))}
      </div>

      <p className="text-[14px] font-medium mt-3">
        Send an email to the Reported Merchant
      </p>
      <Controller
        name="note"
        control={control}
        defaultValue=""
        rules={{
          required: "Note is required",
          minLength: {
            value: 3,
            message: "Note must be at least 3 characters",
          },
        }}
        render={({ field, fieldState }) => (
          <>
            <Textarea
              value={field.value}
              label="Message"
              className="w-full"
              error={fieldState?.error?.message}
              onChange={field.onChange}
            />
          </>
        )}
      />

      <div className="flex gap-8 justify-center items-center mt-5">
        <Button size="lg" variant="primary" type="button" className="text-[14px]">
          Send Email
        </Button>
      </div>
    </section>
  );
};

export default PreviousReport;
