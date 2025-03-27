import React, { useEffect, useState } from "react";
import { InputForm, Button } from "../../components";
import { apiRegister } from "../../services/auth";
import { useLocation } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });
  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  const handleSubmit = async () => {
    console.log(payload);
    dispatch(actions.register(payload));
  };

  return (
    <div className="bg-primary w-[490px] p-[30px] rounded-lg shadow-xl mt-32">
      <h3 className="font-semibold text-2xl mb-3 text-center">
        {isRegister ? "Tạo tài khoản mới" : "Đăng nhập"}
      </h3>
      <div className="w-full flex flex-col gap-5">
        {isRegister && (
          <InputForm
            label={"Họ tên"}
            value={payload.name}
            setValue={setPayload}
            type={"name"}
          />
        )}
        <InputForm
          label={"Số điện thoại"}
          value={payload.phone}
          setValue={setPayload}
          type={"phone"}
        />
        <InputForm
          label={"Mật khẩu"}
          value={payload.password}
          setValue={setPayload}
          type={"password"}
        />
        <Button
          text={isRegister ? "Tạo tài khoản" : "Đăng nhập"}
          bgColor="bg-secondary2"
          textColor="text-white"
          fullWidth
          onClick={handleSubmit}
        />
      </div>
      <div className="mt-7 flex items-center justify-between">
        {isRegister ? (
          <small>
            Bạn đã có tài khoản?{" "}
            <span
              onClick={() => {
                setIsRegister(false);
              }}
              className="text-[#1366de] underline cursor-pointer hover:text-[#E51F40]"
            >
              Đăng nhập ngay
            </span>
          </small>
        ) : (
          <>
            <small className="text-[#1366de] hover:text-[#E51F40] underline cursor-pointer">
              Bạn quên mật khẩu?
            </small>
            <small
              onClick={() => {
                setIsRegister(true);
              }}
              className="text-[#1366de] hover:text-[#E51F40] underline cursor-pointer"
            >
              Tạo tài khoản mới
            </small>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
