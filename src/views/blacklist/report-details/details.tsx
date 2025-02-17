import React, { useState } from "react";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../utilities/functions";
import ImageReport from "./image-report";

interface Report {
  report: {
    id: string;
    note: string;
    image: string;
    status: string;
    reportedMerchant: {
      id: string;
      fullname: string;
      phone: string;
      socialMediaPlatform: string;
      socialMediaHandle: string;
      created_at: string;
    };
    reportedBy: {
      id: string;
      fullname: string;
      phone: string;
      socialMediaPlatform: string;
      socialMediaHandle: string;
      created_at: string;
    };
  };
}

const Details: React.FC<Report> = ({ report }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const Detail = ({ title, value }: any) => {
    return (
      <div className="flex justify-between px-10 mt-4 text-[16px]">
        <p>{title}</p>
        <p className="text-left">{value}</p>
      </div>
    );
  };

  const viewImage = () => {
    setModalVisible(true);
  };
  const images = report?.image ? JSON.parse(report.image) : [];
  const flattenedImages = images.flat();
  const displayedImages = flattenedImages.slice(0, 2);

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
          report?.reportedBy?.fullname
            ||
          "N/A"
        )}
      />

      <Detail
        title="Date of report:"
        value={formatDate(
          report?.reportedBy?.created_at
            ||
             "N/A"
        )}
      />

      <div className="flex justify-between px-10 w-full mt-6">
        <h1 className="text-[18px] font-semibold">Media</h1>
        <button className="text-[12px] text-[#0979A1]"  onClick={viewImage}>View all ({images.length})</button>
      </div>

      {displayedImages.length > 0 ? (
        <div className="images-container grid grid-cols-2 gap-4 items-center justify-between mt-10 px-24">
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

      <ImageReport
       visible={modalVisible}
       handleClose={() => setModalVisible(false)}
       images={flattenedImages}
       />
    </section>
  );
};

export default Details;
