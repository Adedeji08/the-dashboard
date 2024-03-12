import React, { useState } from "react";
import Icon from "../../assets/icons";
import SettingsTab from "../../components/settings-tab";
import Profile from "./user/profile";
import ChangePassword from "./user/change-password";
import Signout from "./user/signout";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const Settings = () => {
  const navigate = useNavigate();
  const [isSignoutModalVisible, setIsSignoutModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "User Profile" | "Change Password" | "Sign Out"
  >("User Profile");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toggleSignoutModal();
    navigate("/");
  };

  const toggleSignoutModal = () => {
    setIsSignoutModalVisible(!isSignoutModalVisible);
  
  };

  return (
    <>
      <div className="flex justify-between w-[95%]">
        <section>
          <h2 className="text-[24px] font-bold">Settings </h2>
        </section>
        <section className="flex gap-4">
          <Icon name="msgIcon" />
          <Icon name="notificationIcon" />
        </section>
      </div>

      <div className="flex gap-10 w-full">
        <SettingsTab
          activeTab={activeTab}
          tabs={[
            "User Profile",
            "Change Password",
            "Sign Out",
          ]}
          setActiveTab={setActiveTab}
          onClick={(tab: string) => {
            if (tab === "Sign Out") {
              toggleSignoutModal();
            }
          }}
        />

        {activeTab === "User Profile" && <Profile />}

        {activeTab === "Change Password" && <ChangePassword />}

        {activeTab === "Sign Out" && (
          <Modal
            width={630}
            visible={isSignoutModalVisible}
            onCancel={toggleSignoutModal}
            footer={null}
          >
            <Signout onYes={handleSignOut} onNo={toggleSignoutModal} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default Settings;
