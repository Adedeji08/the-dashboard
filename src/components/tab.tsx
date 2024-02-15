import classNames from "classnames";
import React from "react";

interface TabsProps {
  activeTab: string;
  tabs: string[];
  setActiveTab: any;
}

const Tabs = (props: TabsProps) => {
  const { activeTab, tabs, setActiveTab } = props;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-[400px] h-[50px] bg-[#CFF0FC] rounded-lg px-2 mt-9">
      <div className="flex">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={classNames("text-[12px] flex-1 md:py-2 px-4 md:px-8", {
              "bg-[#0979A1] text-[#fff] rounded-lg mt-2 font-medium":
                activeTab === tab,
            })}
            onClick={() => handleTabClick(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
