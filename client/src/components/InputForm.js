import React, { memo } from "react";

const InputForm = ({ label }) => {
  return (
    <div>
      <label htmlFor="phone" className="text-xs">
        {label}
      </label>
      <input
        type="text"
        id="phone"
        className="outline-none p-3 border rounded-md w-full h-[40px] focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
};

export default memo(InputForm);
