import React from "react";
import { InputForm, Button } from "../../components";

const Login = () => {
  return (
    <div className="bg-[#fdf5ed] w-[490px] p-[30px] rounded-lg shadow-sm mt-32">
      <h3 className="font-semibold text-2xl mb-3">Đăng nhập</h3>
      <div className="w-full flex flex-col gap-3">
        <InputForm label={"Số điện thoại"} />
        <InputForm label={"Mật khẩu"} />
        <Button
          text="Đăng nhập"
          bgColor="bg-secondary2"
          textColor="text-white"
          fullWidth
        />
      </div>
      <div className="mt-7 flex items-center justify-between">
        <small className="text-[#1366de] hover:text-[#E51F40] underline cursor-pointer">
          Bạn quên mật khẩu?
        </small>
        <small className="text-[#1366de] hover:text-[#E51F40] underline cursor-pointer">
          Tạo tài khoản mới
        </small>
      </div>
    </div>
  );
};

export default Login;
