import React, { useCallback } from "react";
import logo from "../../assets/logo-phongtro.png";
import { Button } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";

const { AiOutlineUserAdd } = icons;
const { IoIosLogIn } = icons;
const { FiEdit } = icons;

const Header = () => {
  const navigate = useNavigate();
  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  }, []);

  return (
    <div className="w-[1299px] ">
      <div className="w-full flex items-center justify-between py-3 border-b-[1px] border-[#f1f1f1]">
        <img
          src={logo}
          alt="logo"
          className="w-[190px] h-[35px] object-container"
        />
        <div className="flex items-center gap-2">
          <small>
            <span className="text-blue-500">Thue</span>
            <span className="text-red-500">PhongTro</span>
            <span className="text-gray-500">.com</span> xin chào!
          </small>
          <Button
            text={"Đăng ký"}
            textColor="text-black"
            bgColor="bg-secondary3"
            IcAfter={AiOutlineUserAdd}
            onClick={goLogin}
          />
          <Button
            text={"Đăng nhập"}
            textColor="text-black"
            bgColor="bg-secondary3"
            IcAfter={IoIosLogIn}
            onClick={goLogin}
          />
          <Button
            text={"Đăng tin"}
            textColor="text-white"
            bgColor="bg-secondary2"
            IcAfter={FiEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
