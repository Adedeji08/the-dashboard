import React from "react";
interface NotificationData {
    id: string;
    content: string;
    created_at: string;
    read: boolean;
  }

interface UpdateNotificationProps {
    notifications: NotificationData[];
    markAllNotificationsAsRead: () => void;
  }

  const UpdateNotification: React.FC<UpdateNotificationProps> = ({ markAllNotificationsAsRead }) => {
  return (
    <>
      <button
        className="text-[16px] font-normal text-[#0979A1]"
        onClick={markAllNotificationsAsRead}
      >
        Mark all as read
      </button>
   
    </>
  );
};

export default UpdateNotification;
