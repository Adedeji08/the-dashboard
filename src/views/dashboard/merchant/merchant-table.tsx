import React, { useState } from "react";
import Select from "../../../components/select";

const MerchantTable = () => {
    const [selectedSocialMedia, setSelectedSocialMedia] = useState("")
    const socialMediaPlatforms: Record<string, string> = {
        instagram: "Instagram",
        twitter: "Twitter (X)",
        facebook: "Facebook",
        snapchat: "Snapchat",
        other: "Other",
      };
  return (
    <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5 ">
      <div className="flex justify-between">
        <p className="text-[18px] font-semibold">All Accounts</p>
        <div>
          <span className="text-[14px] font-medium">Filter by:</span>
          <Select
            label=""
            name="socialMediaPlatform"
            className="w-[14%]"
            options={Object.entries(socialMediaPlatforms).map((platform) => {
              const [value, label] = platform;
              return {
                value,
                label,
              };
            })}
            onChange={(selectedValue) => {
                setSelectedSocialMedia(selectedValue);
              }}
              value={selectedSocialMedia}
            error={""}
          />
        </div>
      </div>
    </div>
  );
};

export default MerchantTable;
