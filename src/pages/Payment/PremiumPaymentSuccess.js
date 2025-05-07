import React, { useState } from "react";
import ChatSupport from "../../components/Button/ChatSupport";
import HeaderPayment from "./HeaderPayment";
import Router from "next/router";
import { Alert } from "antd";

const PremiumPaymentSuccess = ({}) => {
  const [showChat, setShowChat] = useState(true);
  return (
    <>
      <div className="relative max-w-[768px] mx-auto bg-white md:pt-[88px] flex flex-col justify-center text-second-color">
        <HeaderPayment />
        <img src={"https://js.pngtree.com/a4/static/l03b0s.d57ca31e.gif"} />
        <div
          className="w-full mx-auto"
          style={{ position: "absolute", marginTop: "50px" }}
        >
          <p className="text-[20px] font-bold main-text text-center">
            Bạn đã đăng ký Premium thành công!
          </p>
          <img src={"/images/check.png"} className="w-[85px] mx-auto" />
        </div>

        <div className="px-2 space-y-4">
          <Alert
            type="success"
            message={
              <ul className="pt-2">
                <li>Bạn vui lòng mở App Toidoc để kiểm tra nhé!.</li>
                <li>
                  Nếu cần hỗ trợ thêm, vui lòng click vào chú chim "Chat Ngay"
                </li>
              </ul>
            }
          />
          <button
            className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-md py-2.5 text-center shadow-2xl"
            onClick={() => {
              Router.push("/premium");
            }}
          >
            Đăng ký thêm gói Premium
          </button>
        </div>

        {/*<FooterDesktop />*/}
      </div>
      <ChatSupport showChat={showChat} setShowChat={setShowChat} />
    </>
  );
};

export default PremiumPaymentSuccess;
