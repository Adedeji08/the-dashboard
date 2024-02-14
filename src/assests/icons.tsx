import React from "react";
export { ReactComponent as PadLock } from "./PadLock.svg";
export { ReactComponent as Verification } from "./verification.svg";
export { ReactComponent as Avatar } from "./default-avatar.svg";
export { ReactComponent as Avatar1 } from "./avatar.svg";

type IconName =
  | "menuIconOpen"

interface IconProps {
  name: IconName;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  switch (name) {
    case "menuIconOpen":
      return (
        <svg
          className={className}
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 11.6667H35"
            stroke="#040821"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M5 20H35"
            stroke="#040821"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M5 28.3333H35"
            stroke="#040821"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );
      return (
        <svg
          className={className}
          width="31"
          height="25"
          viewBox="0 0 31 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.09772 12.1953C4.75625 12.1953 3.65869 13.2929 3.65869 14.6343C3.65869 15.9758 4.75625 17.0734 6.09772 17.0734C7.43918 17.0734 8.53674 15.9758 8.53674 14.6343C8.53674 13.2929 7.43918 12.1953 6.09772 12.1953Z"
            fill="#B1B1B1"
            stroke="#B1B1B1"
            stroke-width="1.5"
          />
          <path
            d="M27.5606 12.1953C26.2191 12.1953 25.1216 13.2929 25.1216 14.6343C25.1216 15.9758 26.2191 17.0734 27.5606 17.0734C28.9021 17.0734 29.9996 15.9758 29.9996 14.6343C29.9996 13.2929 28.9021 12.1953 27.5606 12.1953Z"
            fill="#B1B1B1"
            stroke="#B1B1B1"
            stroke-width="1.5"
          />
          <path
            d="M16.8296 12.1953C15.4882 12.1953 14.3906 13.2929 14.3906 14.6343C14.3906 15.9758 15.4882 17.0734 16.8296 17.0734C18.1711 17.0734 19.2687 15.9758 19.2687 14.6343C19.2687 13.2929 18.1711 12.1953 16.8296 12.1953Z"
            fill="#B1B1B1"
            stroke="#B1B1B1"
            stroke-width="1.5"
          />
        </svg>
      );

    default:
      return null;
  }
};

export default Icon;
