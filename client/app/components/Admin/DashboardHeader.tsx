import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "../../../redux/features/notifications/notificationApi";
import { ThemeSwitcher } from "../../utils/ThemeSwitcher";
import { FC, useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URL || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
type Props = {
  open?: boolean;
  setOpen?: any;
};
import { format } from "timeago.js";
const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [
    updateNotificationStatus,
    { isSuccess },
  ] = useUpdateNotificationStatusMutation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(
        "https://res.cloudinary.com/dasdrngo1/video/upload/v1715355770/notifications/mixkit-bubble-pop-up-alert-notification-2357_wbwviv.wav"
      );
    }
  }, []);

  const playNotificationSound = () => {
    audioRef.current?.play().catch((err) => {
      console.error("Error Audio Playing: ", err);
    });
  };
  /*
  When notification data is available, store only the unread ones in state.Also, if a notification status was updated successfully, refetch the list. 
  */
  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
  }, [data, isSuccess,refetch]);

  /*
Set up a socket listener for real-time "newNotification" events from the server. When a new notification arrives, it refetches the notification list and plays a sound.
*/
  useEffect(() => {
    socket.on("newNotification", (data) => {
      if (data) {
        refetch();
      }
      playNotificationSound();
    });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };
  return (
    <div className="fixed right-0 top-5 z-50 flex w-full items-center justify-end p-6">
      <ThemeSwitcher />
      {/* Notification bell icon */}
      <div
        className="relative m-2"
        ref={dropdownRef}
      >
        <button
          type="button"
          aria-label="Notifications"
          aria-expanded={open}
          className="relative flex cursor-pointer items-center justify-center text-black dark:text-white"
          onClick={() => setOpen(!open)}
        >
          <IoMdNotificationsOutline className="text-2xl" />
          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#3ccba0] px-1 text-[12px] text-white">
            {notifications.length}
          </span>
        </button>
        {open && (
          <div
            className="absolute right-0 top-full z-50 mt-3 flex max-h-[70vh] w-[350px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-[#111C43]"
          >
            <h5 className="shrink-0 border-b border-gray-200 px-4 py-3 text-center font-Poppins text-lg font-semibold text-gray-900 dark:border-gray-700 dark:text-white">
              Notifications
            </h5>
            <div className="min-h-0 flex-1 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((item: any, index: number) => (
                  <div
                    key={item._id || index}
                    className="border-b border-gray-200 px-4 py-3 font-Poppins last:border-b-0 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="min-w-0 flex-1 break-words text-sm font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <button
                        type="button"
                        className="shrink-0 text-xs font-medium text-blue-600 hover:underline dark:text-blue-300"
                        onClick={() => handleNotificationStatusChange(item._id)}
                      >
                        Mark as read
                      </button>
                    </div>
                    <p className="mt-1 break-words text-sm text-gray-700 dark:text-gray-200">
                      {item.message}
                    </p>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {format(item.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No new notifications
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DashboardHeader;