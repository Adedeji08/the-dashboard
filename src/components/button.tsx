import React, { ReactNode } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg" | "full-half";
  type?: "button" | "submit" | "reset";
  href?: string;
  className?: string;
  onClick?: (e?: any) => void;
}

const Button = ({
  size = "lg",
  variant,
  children,
  type,
  href,
  onClick,
  className
}: ButtonProps) => {
  return (
    <>
      {href ? (
        <Link
          to={href}
          className={classNames(
            "inline-flex items-center justify-center text-center px-5 py-2 gap-2 border-2 border-[#0979A1] rounded-lg font-bold text-sm md:text-xl",
            {
              "w-full": size === "lg",
              "w-[75%]": size === "md",
              "w-[50%]": size === "sm",
              "w-full md:w-[50%]": size === "full-half",
              "text-[#fff] bg-[#0979A1] hover:opacity-75":
                variant === "primary",
              "text-[#0979A1]": variant === "secondary",
            }
          )}>
          {children}
        </Link>
      ) : (
        <button
          className={classNames(
            "inline-flex items-center justify-center text-center px-5 py-2 gap-2 border-2 border-[#0979A1] rounded-lg font-bold text-sm md:text-xl",
            {
              "w-full": size === "lg",
              "w-[75%]": size === "md",
              "w-[50%]": size === "sm",
              "w-full md:w-[50%]": size === "full-half",
              "text-[#fff] bg-[#0979A1] hover:opacity-75":
                variant === "primary",
              "text-[#0979A1]": variant === "secondary",
            }
          )}
          type={type}
          onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
