import React, { memo } from "react";

const Button = ({ text, textColor, bgColor, IcAfter, onClick, fullWidth }) => {
  return (
    <button
      type="button"
      className={`px-3 py-1 ${textColor} ${bgColor} ${
        fullWidth && "w-full h-[40px]"
      } outline-none rounded-lg hover:bg-[#1366de] hover:text-white p-1 flex items-center justify-center gap-1`}
      onClick={onClick}
    >
      <span>{IcAfter && <IcAfter />}</span>
      <span>{text}</span>
    </button>
  );
};

export default memo(Button);
