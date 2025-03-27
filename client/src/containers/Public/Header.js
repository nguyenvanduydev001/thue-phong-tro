import React, { useCallback } from "react";
import logo from "../../assets/logo-phongtro-removebg.png";
import { Button } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, Link } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const { AiOutlineUserAdd } = icons;
const { IoIosLogIn } = icons;
const { FiEdit } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  return (
    <div className="w-full bg-primary flex justify-center">
      <div className="w-[1299px]">
        <div className="w-full flex items-center justify-between py-3 border-b-[1px] border-[#f1f1f1]">
          <Link to={"/"}>
            <img
              src={logo}
              alt="logo"
              className="w-[190px] h-[35px] object-container"
            />
          </Link>
          <div className="flex items-center gap-2">
            {!isLoggedIn && (
              <div className="flex items-center gap-1">
                <small>
                  <span className="text-blue-500">Thue</span>
                  <span className="text-red-500">PhongTro</span>
                  <span className="text-gray-500">.com</span> xin chào!
                </small>
                <Button
                  text={"Đăng nhập"}
                  textColor="text-black"
                  bgColor="bg-[#f3f6f7]"
                  IcAfter={IoIosLogIn}
                  onClick={() => goLogin(false)}
                />
                <Button
                  text={"Đăng ký"}
                  textColor="text-black"
                  bgColor="bg-[#f3f6f7]"
                  IcAfter={AiOutlineUserAdd}
                  onClick={() => goLogin(true)}
                />
              </div>
            )}
            {isLoggedIn && (
              <div className="flex items-center gap-1">
                <small>Tên !</small>
                <Button
                  text={"Đăng xuất"}
                  textColor="text-black"
                  bgColor="bg-[#f3f6f7]"
                  IcAfter={IoIosLogIn}
                  onClick={() => dispatch(actions.logout())}
                />
              </div>
            )}
            <Button
              text={"Đăng tin"}
              textColor="text-white"
              bgColor="bg-secondary2 hover:bg-red-500"
              IcAfter={FiEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
