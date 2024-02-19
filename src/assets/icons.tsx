import React from "react";

type IconName =
  | "personIcon"
  | "arrowForward"
  | "dotIcon"
  | "searchIcon"
  | "msgIcon"
  | "notificationIcon"
  | "arrowLeft"
  | "cancel"

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

    case "dotIcon":
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

    case "searchIcon":
      return (
        <svg
          className={className}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.625 15.75C12.56 15.75 15.75 12.56 15.75 8.625C15.75 4.68997 12.56 1.5 8.625 1.5C4.68997 1.5 1.5 4.68997 1.5 8.625C1.5 12.56 4.68997 15.75 8.625 15.75Z"
            stroke="#6A6A6A"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.5 16.5L15 15"
            stroke="#6A6A6A"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "msgIcon":
      return (
        <svg
          className={className}
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="44" height="44" rx="10" fill="#F2F4F7" />
          <rect
            x="0.5"
            y="0.5"
            width="43"
            height="43"
            rx="9.5"
            stroke="#0979A1"
            stroke-opacity="0.5"
          />
          <path
            d="M18.5 29H18C14 29 12 28 12 23V18C12 14 14 12 18 12H26C30 12 32 14 32 18V23C32 27 30 29 26 29H25.5C25.19 29 24.89 29.15 24.7 29.4L23.2 31.4C22.54 32.28 21.46 32.28 20.8 31.4L19.3 29.4C19.14 29.18 18.77 29 18.5 29Z"
            stroke="#0979A1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M25.9965 21H26.0054"
            stroke="#0979A1"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.9955 21H22.0045"
            stroke="#0979A1"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.9945 21H18.0035"
            stroke="#0979A1"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "notificationIcon":
      return (
        <svg
          className={className}
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="44" height="44" rx="10" fill="#F2F4F7" />
          <rect
            x="0.5"
            y="0.5"
            width="43"
            height="43"
            rx="9.5"
            stroke="#0979A1"
            stroke-opacity="0.5"
          />
          <path
            d="M22.02 12.91C18.71 12.91 16.02 15.6 16.02 18.91V21.8C16.02 22.41 15.76 23.34 15.45 23.86L14.3 25.77C13.59 26.95 14.08 28.26 15.38 28.7C19.69 30.14 24.34 30.14 28.65 28.7C29.86 28.3 30.39 26.87 29.73 25.77L28.58 23.86C28.28 23.34 28.02 22.41 28.02 21.8V18.91C28.02 15.61 25.32 12.91 22.02 12.91Z"
            stroke="#0979A1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M23.87 13.2C23.56 13.11 23.24 13.04 22.91 13C21.95 12.88 21.03 12.95 20.17 13.2C20.46 12.46 21.18 11.94 22.02 11.94C22.86 11.94 23.58 12.46 23.87 13.2Z"
            stroke="#0979A1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M25.02 29.06C25.02 30.71 23.67 32.06 22.02 32.06C21.2 32.06 20.44 31.72 19.9 31.18C19.36 30.64 19.02 29.88 19.02 29.06"
            stroke="#0979A1"
            stroke-width="1.5"
            stroke-miterlimit="10"
          />
        </svg>
      );

    case "arrowLeft":
      return (
        <svg
          className={className}
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="44" height="44" rx="10" fill="white" />
          <path
            d="M19.57 15.93L13.5 22L19.57 28.07"
            stroke="#0979A1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M30.5 22H13.67"
            stroke="#0979A1"
            stroke-width="1.5"
            stroke-miterlimit="10"
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
