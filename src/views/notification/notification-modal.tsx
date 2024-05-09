import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import useRequest from "../../components/hooks/use-request";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface NotificationData {
  content: string;
  created_at: string;
  read: boolean;
}

const NotificationModal = ({ visible, handleClose }: any) => {
  const userToken = localStorage.getItem("token");
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [displayedData, setDisplayedData] = useState<NotificationData[]>([]);
  const [showAll, setShowAll] = useState(false);
  const { makeRequest: getNotification } = useRequest("/notifications", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getNotification();
      setNotifications(response.data?.notifications);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showAll) {
      setDisplayedData(notifications);
    } else {
      setDisplayedData(notifications?.slice(0, 3));
    }
  }, [notifications, showAll]);

  return (
    <>
      <Modal
        visible={visible}
        onCancel={handleClose}
        width={450}
        closable={false}
        footer={null}
        className="mr-0 mr-3"
      >
        <h1 className="font-semibold text-left text-[#040821] text-[14px]">
          Notifications
        </h1>
        <hr className="w-full" />
        {displayedData?.map((notification, id) => (
          <div key={id} className="flex justify-between gap-8 mt-4">
            <div className="flex gap-5">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: notification.read
                    ? "transparent"
                    : "#0979A1",
                }}
              ></span>
              <p className="text-[12px] font-normal">{notification?.content}</p>
            </div>
            <p className="text-[10px] font-normal">
              {" "}
              <i>
                {formatDistanceToNow(new Date(notification?.created_at), {
                  addSuffix: true,
                })}
              </i>
            </p>
          </div>
        ))}
        <hr className="mt-3" />
        <p className="text-[12px] text-center font-bold text-[#0979A1] mt-3">
          <Link to="/notification">VIEW ALL</Link>
        </p>
      </Modal>
    </>
  );
};

export default NotificationModal;
