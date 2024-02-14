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

    default:
      return null;
  }
};

export default Icon;
