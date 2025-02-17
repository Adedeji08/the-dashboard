import React, { ChangeEvent } from "react";

interface SelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  className?: string;
  onChange: (selectedValue: string) => void;
  value?: string;
  error?: string;
}

export default function Select({
  label,
  options,
  className,
  name,
  onChange,
  value,
  error,
}: SelectProps) {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div className={className}>
      <div className="lg:text-[14px] text-[12px] font-normal text-[#040821] mb-3">
        <label>{label}</label>
      </div>

      <select
        className="w-full h-[45px] border-2 solid pl-5 bg-transparent rounded-md outline-none"
        value={value}
        defaultValue={value}
        onChange={handleSelectChange}
        name={name}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="error-text text-[#FF0101] text-[14px]">{error}</span>
      )}
    </div>
  );
}
