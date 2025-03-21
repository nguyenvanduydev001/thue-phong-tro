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
        className="outline-none p2 border border-black rounded-md w-full h-[40px] "
      />
    </div>
  );
};

export default memo(InputForm);
