import React, { useState } from "react";
import Tabs from "../../components/tab";
import Buyer from "./buyer";
import Merchant from "./merchant";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"merchant" | "buyer">("merchant");
  return (
    <div>
      Dashboard
      <Tabs
        activeTab={activeTab}
        tabs={["merchant", "buyer"]}
        setActiveTab={setActiveTab}
      />

      <div>
       
          {activeTab === "merchant" && (
            <Merchant
            />
          )}
          {activeTab === "buyer" && (
            <Buyer
            />
          )}
      </div>
    </div>
  );
};

export default Dashboard;
