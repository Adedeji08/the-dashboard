import React from "react";

type IconName = "personIcon" | "arrowForward" | "avartar";

interface IconProps {
  name: IconName;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  switch (name) {
    case "personIcon":
      return (
        <svg
          className={className}
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="25" cy="25" r="25" fill="#0979A1" />
          <circle
            cx="25"
            cy="25"
            r="24.5"
            stroke="#6A6A6A"
            stroke-opacity="0.2"
          />
          <rect
            width="24"
            height="24"
            transform="translate(13 13)"
            fill="#0979A1"
          />
          <path
            d="M25.16 23.87C25.06 23.86 24.94 23.86 24.83 23.87C22.45 23.79 20.56 21.84 20.56 19.44C20.56 16.99 22.54 15 25 15C27.45 15 29.44 16.99 29.44 19.44C29.43 21.84 27.54 23.79 25.16 23.87Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.16 27.56C17.74 29.18 17.74 31.82 20.16 33.43C22.91 35.27 27.42 35.27 30.17 33.43C32.59 31.81 32.59 29.17 30.17 27.56C27.43 25.73 22.92 25.73 20.16 27.56Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "arrowForward":
      return (
        <svg
          className={className}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.43 5.92999L20.5 12L14.43 18.07"
            stroke="#6A6A6A"
            stroke-opacity="0.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.5 12H20.33"
            stroke="#6A6A6A"
            stroke-opacity="0.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "avartar":
      return (
        <svg
          className={className}
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 11.3333C10.9603 11.3333 11.3334 10.9602 11.3334 10.5C11.3334 10.0398 10.9603 9.66667 10.5 9.66667C10.0398 9.66667 9.66669 10.0398 9.66669 10.5C9.66669 10.9602 10.0398 11.3333 10.5 11.3333Z"
            stroke="#98A2B3"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.5 5.5C10.9603 5.5 11.3334 5.12691 11.3334 4.66667C11.3334 4.20643 10.9603 3.83334 10.5 3.83334C10.0398 3.83334 9.66669 4.20643 9.66669 4.66667C9.66669 5.12691 10.0398 5.5 10.5 5.5Z"
            stroke="#98A2B3"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.5 17.1667C10.9603 17.1667 11.3334 16.7936 11.3334 16.3333C11.3334 15.8731 10.9603 15.5 10.5 15.5C10.0398 15.5 9.66669 15.8731 9.66669 16.3333C9.66669 16.7936 10.0398 17.1667 10.5 17.1667Z"
            stroke="#98A2B3"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
};

export default Icon;
