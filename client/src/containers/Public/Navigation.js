import React from "react";
import { NavLink } from "react-router-dom";
import { isAction } from "redux";

const nav = [
  { name: "Trang chủ", path: "home" },
  { name: "Phòng trọ", path: "phong-tro" },
  { name: "Nhà nguyên căn", path: "nha-nguyen-can" },
  { name: "Căn hộ chung cư", path: "can-ho-chung-cu" },
  { name: "Mặt bằng", path: "mat-bang" },
];

const notActive =
  "relative text-black hover:text-[#E51F40] after:content-[''] after:absolute after:left-1 after:bottom-[-3px] after:w-[90%] after:h-[2px] after:bg-[#E51F40] after:scale-x-0 hover:after:scale-x-100 p-2 mx-0.5";

const active =
  "relative text-[#E51F40] after:content-[''] after:absolute after:left-1 after:bottom-[-3px] after:w-[90%] after:h-[2px] after:bg-[#E51F40] after:scale-x-100 p-2 mx-0.5";

const Navigation = () => {
  return (
    <div className="w-screen flex justify-center items-center h-[40px] bg-white shadow-md">
      <div className="w-[1299px] flex item-center text-sm font-normal">
        {nav?.length > 0 &&
          nav.map((item, index) => {
            return (
              <div
                key={index}
                className="h-full flex justify-center items-center"
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  {item.name}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Navigation;
