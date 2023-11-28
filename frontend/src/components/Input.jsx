import React from "react";

const Input = ({ type, name, onChange, label }) => {
  return (
    <label htmlFor={name} className="text-white font-semibold text-lg">
      {label}
      <input
        type={type}
        name={name}
        onChange={onChange}
        className="w-full rounded-[4px] text-black p-1 mt-1 text-md focus:outline-none"
      />
    </label>
  );
};

export default Input;
