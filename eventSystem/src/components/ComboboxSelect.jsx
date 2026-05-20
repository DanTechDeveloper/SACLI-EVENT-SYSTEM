import React from "react";

export default function ComboboxSelect({ options, label, id, value, onChange }) {
  return (
    <label htmlFor={id} className="block text-sm font-medium text-[#111318] dark:text-gray-200">
      {label}
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-11 px-4 focus:ring-2 focus:ring-primary outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}