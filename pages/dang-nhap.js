import React from "react";
import LoginComponent from "../src/pages/Login";
import HeaderServer from "../src/components/HeaderServer";

const Login = () => {
  return (
    <>
      <HeaderServer 
        title="Website đăng nhập chính thức của Toidoc"
        description={"Trang đăng nhập tài khoản chính thức của Toidoc. Toidoc nền tảng đọc truyện full online cập nhật nhanh nhất."}/>
      <LoginComponent />
    </>
  );
};

export default Login;
