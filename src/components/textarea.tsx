import classNames from "classnames";
import React, { ChangeEvent } from "react";

interface TextareaProps {
  label?: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  value?: string;
  error?: string;
  readOnly?: boolean;
}

export default function Textarea({
  label,
  placeholder,
  className,
  onChange,
  name,
  value,
  error,
  readOnly = false,
}: TextareaProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <div className="lg:text-[18px] text-[14px] font-normal text-[#040821] mb-3">
          {label}
        </div>
      )}

      <textarea
        placeholder={placeholder}
        className={classNames(
          "text-field w-full h-[100px] border-2 solid p-5 bg-transparent rounded-md outline-none",
          { error: error }
        )}
        onChange={onChange}
        value={value}
        name={name}
        readOnly={readOnly}
      />

      {error && (
        <span className="error-text text-[#FF0101] text-[14px]">{error}</span>
      )}
    </div>
  );
}
