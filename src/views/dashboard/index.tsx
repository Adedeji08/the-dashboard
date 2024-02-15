import React, { useState } from "react";
import Tabs from "../../components/tab";

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
    </div>
  );
};

export default Dashboard;
