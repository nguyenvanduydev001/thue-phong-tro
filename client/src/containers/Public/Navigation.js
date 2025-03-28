import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiGetCategories } from "../../services/category";
import { formatVietnameseToString } from "../../ultils/constant";

const notActive =
  "relative text-black hover:text-[#E51F40] after:content-[''] after:absolute after:left-1 after:bottom-[-3px] after:w-[90%] after:h-[2px] after:bg-[#E51F40] after:scale-x-0 hover:after:scale-x-100 p-2 mx-0.5";

const active =
  "relative text-[#E51F40] after:content-[''] after:absolute after:left-1 after:bottom-[-3px] after:w-[90%] after:h-[2px] after:bg-[#E51F40] after:scale-x-100 p-2 mx-0.5";

const Navigation = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGetCategories();
      if (response?.data.err === 0) {
        setCategories(response.data.response);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-screen flex justify-center items-center h-[40px] bg-white shadow-md">
      <div className="w-[1299px] flex item-center text-sm font-normal">
        <NavLink
          to={`/`}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang chủ
        </NavLink>
        ;
        {categories?.length > 0 &&
          categories.map((item) => {
            return (
              <div
                key={item.code}
                className="h-full flex justify-center items-center"
              >
                <NavLink
                  to={`/${formatVietnameseToString(item.value)}`}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Navigation;
