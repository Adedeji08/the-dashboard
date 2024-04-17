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
  | "transact"
  | "mediate"
  | "account"
  | "transaction"
  | "refund"
  | "mediation"
  | "blacklist"
  | "support"
  | "analytics"
  | "settings";

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

    case "transact":
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
          <path
            d="M19.73 32.7C20.55 31.82 21.8 31.89 22.52 32.85L23.53 34.2C24.34 35.27 25.65 35.27 26.46 34.2L27.47 32.85C28.19 31.89 29.44 31.82 30.26 32.7C32.04 34.6 33.49 33.97 33.49 31.31V20.04C33.5 16.01 32.56 15 28.78 15H21.22C17.44 15 16.5 16.01 16.5 20.04V31.3C16.5 33.97 17.96 34.59 19.73 32.7Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 20H29"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 24H28"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "mediate":
      return (
        <svg
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
          <path
            d="M18.9 30.3335H31.09C32.99 30.3335 33.99 29.3335 33.99 27.4335V15.3335H15.99V27.4335C16 29.3335 17 30.3335 18.9 30.3335Z"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 15.3335H35"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 35.3335L25 33.3335V30.3335"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M29 35.3335L25 33.3335"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.5 24.3335L23.65 21.7035C23.9 21.4935 24.23 21.5535 24.4 21.8335L25.6 23.8335C25.77 24.1135 26.1 24.1635 26.35 23.9635L29.5 21.3335"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "account":
      return (
        <svg
          className={className}
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 6.89675C16.445 6.88758 16.3808 6.88758 16.3258 6.89675C15.0608 6.85092 14.0525 5.81508 14.0525 4.53175C14.0525 3.22092 15.1067 2.16675 16.4175 2.16675C17.7283 2.16675 18.7825 3.23008 18.7825 4.53175C18.7733 5.81508 17.765 6.85092 16.5 6.89675Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.5558 13.5701C16.8117 13.7809 18.1958 13.5609 19.1675 12.9101C20.46 12.0484 20.46 10.6368 19.1675 9.77511C18.1867 9.12427 16.7842 8.90427 15.5283 9.12427"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.4725 6.89675C5.5275 6.88758 5.59167 6.88758 5.64667 6.89675C6.91167 6.85092 7.92 5.81508 7.92 4.53175C7.92 3.22092 6.86584 2.16675 5.555 2.16675C4.24417 2.16675 3.19 3.23008 3.19 4.53175C3.19917 5.81508 4.2075 6.85092 5.4725 6.89675Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.41667 13.5701C5.16084 13.7809 3.77667 13.5609 2.80501 12.9101C1.51251 12.0484 1.51251 10.6368 2.80501 9.77511C3.78584 9.12427 5.18834 8.90427 6.44417 9.12427"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 13.7442C10.945 13.735 10.8808 13.735 10.8258 13.7442C9.56082 13.6983 8.55249 12.6625 8.55249 11.3792C8.55249 10.0683 9.60666 9.01416 10.9175 9.01416C12.2283 9.01416 13.2825 10.0775 13.2825 11.3792C13.2733 12.6625 12.265 13.7075 11 13.7442Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.33247 16.6317C7.03997 17.4934 7.03997 18.905 8.33247 19.7667C9.79914 20.7475 12.2008 20.7475 13.6675 19.7667C14.96 18.905 14.96 17.4934 13.6675 16.6317C12.21 15.66 9.79914 15.66 8.33247 16.6317Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "transaction":
      return (
        <svg
        className={className}
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.3333 6.7865V15.8798C18.3333 17.2732 18.205 18.2632 17.875 18.969C17.875 18.9782 17.8658 18.9965 17.8566 19.0057C17.655 19.2623 17.3892 19.3907 17.0775 19.3907C16.5917 19.3907 16.005 19.0698 15.3725 18.3915C14.6209 17.5848 13.4658 17.649 12.8058 18.529L11.88 19.7573C11.5134 20.2523 11.0275 20.4998 10.5417 20.4998C10.0558 20.4998 9.56998 20.2523 9.20331 19.7573L8.26835 18.5198C7.61752 17.649 6.47166 17.5848 5.71999 18.3823L5.71082 18.3915C4.67498 19.5007 3.75835 19.6657 3.22668 19.0057C3.21752 18.9965 3.20833 18.9782 3.20833 18.969C2.87833 18.2632 2.75 17.2732 2.75 15.8798V6.7865C2.75 5.39317 2.87833 4.40317 3.20833 3.69734C3.20833 3.68817 3.20835 3.679 3.22668 3.66984C3.74918 3.00067 4.67498 3.16567 5.71082 4.27484L5.71999 4.28401C6.47166 5.08151 7.61752 5.01734 8.26835 4.1465L9.20331 2.90901C9.56998 2.41401 10.0558 2.1665 10.5417 2.1665C11.0275 2.1665 11.5134 2.41401 11.88 2.90901L12.8058 4.13734C13.4658 5.01734 14.6209 5.0815 15.3725 4.27484C16.005 3.5965 16.5917 3.27567 17.0775 3.27567C17.3892 3.27567 17.655 3.41317 17.8566 3.66984C17.875 3.679 17.875 3.68817 17.875 3.69734C18.205 4.40317 18.3333 5.39317 18.3333 6.7865Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.33331 9.729H14.6666"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.33331 12.9375H12.8333"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "refund":
      return (
        <svg
          className={className}
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5367 12.7542C16.1517 13.13 15.9317 13.6708 15.9867 14.2483C16.0692 15.2383 16.9767 15.9625 17.9667 15.9625H19.7084V17.0533C19.7084 18.9508 18.1592 20.5 16.2617 20.5H7.00335C7.76419 19.8308 8.25002 18.85 8.25002 17.75C8.25002 15.7242 6.60919 14.0833 4.58335 14.0833C3.72169 14.0833 2.92419 14.3858 2.29169 14.89V10.8842C2.29169 8.98668 3.84085 7.4375 5.73835 7.4375H16.2617C18.1592 7.4375 19.7084 8.98668 19.7084 10.8842V12.2042H17.8567C17.3433 12.2042 16.8758 12.4058 16.5367 12.7542Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.29169 10.8842V7.52004C2.29169 6.42921 2.96085 5.4575 3.97835 5.0725L11.2567 2.3225C12.3934 1.90084 13.6125 2.73503 13.6125 3.9542V7.43752"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.6789 13.1393V15.0277C20.6789 15.5319 20.2756 15.9443 19.7623 15.9627H17.9656C16.9756 15.9627 16.0681 15.2385 15.9856 14.2485C15.9306 13.671 16.1506 13.1302 16.5356 12.7543C16.8748 12.406 17.3423 12.2043 17.8556 12.2043H19.7623C20.2756 12.2227 20.6789 12.6351 20.6789 13.1393Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.41669 11.3334H12.8334"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.25002 17.75C8.25002 18.85 7.76419 19.8309 7.00335 20.5C6.35252 21.0684 5.50919 21.4167 4.58335 21.4167C2.55752 21.4167 0.916687 19.7759 0.916687 17.75C0.916687 16.595 1.44835 15.5592 2.29169 14.89C2.92419 14.3859 3.72169 14.0834 4.58335 14.0834C6.60919 14.0834 8.25002 15.7242 8.25002 17.75Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.81252 16.6042V17.9792L3.66669 18.6667"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "mediation":
      return (
        <svg
          className={className}
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.40835 15.9167H16.5825C18.3242 15.9167 19.2408 15.0001 19.2408 13.2584V2.16675H2.74084V13.2584C2.75001 15.0001 3.66668 15.9167 5.40835 15.9167Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.83331 2.16675H20.1666"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.33331 20.5001L11 18.6667V15.9167"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.6667 20.5001L11 18.6667"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.875 10.4167L9.76249 8.00591C9.99166 7.81341 10.2942 7.86841 10.45 8.12508L11.55 9.95841C11.7058 10.2151 12.0083 10.2609 12.2375 10.0776L15.125 7.66675"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "blacklist":
      return (
        <svg
          className={className}
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.61573 2.37755L5.04157 4.10089C3.9874 4.49505 3.12573 5.74172 3.12573 6.86005V13.6709C3.12573 14.7526 3.84073 16.1734 4.71157 16.8242L8.65323 19.7667C9.94573 20.7384 12.0724 20.7384 13.3649 19.7667L17.3066 16.8242C18.1774 16.1734 18.8924 14.7526 18.8924 13.6709V6.86005C18.8924 5.73255 18.0307 4.48589 16.9766 4.09172L12.4024 2.37755C11.6232 2.09339 10.3766 2.09339 9.61573 2.37755Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.9708 12.6534L9.07495 8.75757"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.9249 8.80334L9.02905 12.6992"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "support":
      return (
        <svg
          className={className}
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.79175 9.95837H14.2084"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.41659 17.2276H10.0833L14.1624 19.9409C14.7674 20.3443 15.5833 19.9134 15.5833 19.1801V17.2276C18.3333 17.2276 20.1666 15.3942 20.1666 12.6442V7.14425C20.1666 4.39425 18.3333 2.56091 15.5833 2.56091H6.41659C3.66659 2.56091 1.83325 4.39425 1.83325 7.14425V12.6442C1.83325 15.3942 3.66659 17.2276 6.41659 17.2276Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "analytics":
      return (
        <svg
          className={className}
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.24992 20.5001H13.7499C18.3333 20.5001 20.1666 18.6667 20.1666 14.0834V8.58341C20.1666 4.00008 18.3333 2.16675 13.7499 2.16675H8.24992C3.66659 2.16675 1.83325 4.00008 1.83325 8.58341V14.0834C1.83325 18.6667 3.66659 20.5001 8.24992 20.5001Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.71924 13.6159L8.9009 10.7834C9.21257 10.3801 9.79007 10.3067 10.1934 10.6184L11.8709 11.9384C12.2742 12.2501 12.8517 12.1767 13.1634 11.7826L15.2809 9.0509"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "settings":
      return (
        <svg
          className={className}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 13.75C12.5188 13.75 13.75 12.5188 13.75 11C13.75 9.48122 12.5188 8.25 11 8.25C9.48122 8.25 8.25 9.48122 8.25 11C8.25 12.5188 9.48122 13.75 11 13.75Z"
            stroke="#6A6A6A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.83325 11.8066V10.1933C1.83325 9.23998 2.61242 8.45165 3.57492 8.45165C5.23409 8.45165 5.91242 7.27832 5.07825 5.83915C4.60159 5.01415 4.88575 3.94165 5.71992 3.46498L7.30575 2.55748C8.02992 2.12665 8.96492 2.38332 9.39575 3.10748L9.49659 3.28165C10.3216 4.72082 11.6783 4.72082 12.5124 3.28165L12.6133 3.10748C13.0441 2.38332 13.9791 2.12665 14.7033 2.55748L16.2891 3.46498C17.1233 3.94165 17.4074 5.01415 16.9308 5.83915C16.0966 7.27832 16.7749 8.45165 18.4341 8.45165C19.3874 8.45165 20.1758 9.23082 20.1758 10.1933V11.8066C20.1758 12.76 19.3966 13.5483 18.4341 13.5483C16.7749 13.5483 16.0966 14.7216 16.9308 16.1608C17.4074 16.995 17.1233 18.0583 16.2891 18.535L14.7033 19.4425C13.9791 19.8733 13.0441 19.6166 12.6133 18.8925L12.5124 18.7183C11.6874 17.2791 10.3308 17.2791 9.49659 18.7183L9.39575 18.8925C8.96492 19.6166 8.02992 19.8733 7.30575 19.4425L5.71992 18.535C4.88575 18.0583 4.60159 16.9858 5.07825 16.1608C5.91242 14.7216 5.23409 13.5483 3.57492 13.5483C2.61242 13.5483 1.83325 12.76 1.83325 11.8066Z"
            stroke="#6A6A6A"
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
