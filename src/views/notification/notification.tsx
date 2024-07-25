import React, { useEffect, useState } from "react";
import useRequest from "../../components/hooks/use-request";
import Back from "../../components/back";
import { formatDistanceToNow } from "date-fns";
import { showToast } from "../../components/toast";
import UpdateNotification from "./update-notification";

interface NotificationData {
  id: string;
  content: string;
  created_at: string;
  read: boolean;
}

const Notification = () => {
  const userToken = localStorage.getItem("token");
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const id = notifications.map(notification => notification.id)
  const { makeRequest: getNotification } = useRequest("/notifications", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  const { makeRequest: readNotification } = useRequest(
    `/notifications/${id}`,
    "PUT",
    { Authorization: `Bearer ${userToken}` }
  );

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getNotification();
      setNotifications(response.data?.notifications);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  const markNotificationAsRead = async (id: string) => {
    const [response] = await readNotification(undefined);
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  };

  const markAllNotificationsAsRead = async () => {
      const notificationIds = notifications.map(notification => notification.id);
      const [response] = await readNotification(notificationIds);
      if (response.status) {
        setNotifications(prevNotifications => (
          prevNotifications.map(notification => ({
            ...notification,
            read: true
          }))
        ));
        showToast(response.message, true, {
          position: "top-center",
        });
      } else {
        showToast(response.message, false, {
          position: "top-center",
        });
      }
  };
  

  return (
    <>
      <div className="mt-14 mx-10">
        <section className="flex gap-8">
          <Back />
          <span className="text-[24px] font-semibold mt-1">Notifications</span>
        </section>
        <section className="flex mt-10 justify-between cursor-default">
          <p className="text-[20px] font-semibold">Today</p>
         <UpdateNotification 
         notifications={notifications}
         markAllNotificationsAsRead={markAllNotificationsAsRead}

         />
        </section>

        {notifications.map((notification, id) => (
          <button
            key={id}
            className="flex justify-between gap-8 mt-4 border-2 p-8 rounded-lg w-full"
            onClick={() => {
              markNotificationAsRead(notification.id);
            }}
          >
            <div className="flex gap-5">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: notification.read ? "#A10909" : "#0979A1",
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
          </button>
        ))}
      </div>
    </>
  );
};

export default Notification;
