import classNames from 'classnames';
import React from 'react';

interface TabsProps {
    activeTab: string;
    tabs: string[];
    setActiveTab: any;
    onClick?: (tab: string) => void; // Add onClick event handler prop
}

const SettingsTab = (props: TabsProps) => {
    const { activeTab, tabs, setActiveTab, onClick } = props;

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (onClick && tab === "Sign Out") {
            onClick(tab); // Call onClick event handler for "Sign Out" tab
        }
    };

    return (
        <div className="flex flex-col w-[20%] gap-7 rounded-lg mt-14">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={classNames("text-[14px] md:py-2 px-4 md:px-8 text-left", {
                        "border-l-2 border-[#0979A1] text-[#0979A1] font-normal":
                            activeTab === tab,
                        "text-gray-600": activeTab !== tab,
                    })}
                    onClick={() => handleTabClick(tab)}
                >
                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default SettingsTab;
