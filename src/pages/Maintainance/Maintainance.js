import React from "react";
import Header from "../../components/Header/Header";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import { observer } from "mobx-react";

const Maintainance = () => {
  return (
    <div>
      <Header selectedTab={"HOME"} />
      <div className="relative pb-[100px] max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] px-5 md:px-[8px]">
        <div style={{ width: "100%" }}>
          <img
            src="https://media.truyenso1.xyz/ads/bao-tri-web.png"
            style={{ width: "65%", margin: "auto", display: "block" }}
          />
        </div>
        <p style={{ fontSize: "18px" }}>
          <strong>📢 Thông báo nâng cấp Website Toidoc 🛠</strong>
        </p>
        <p>Xin chào các độc giả thân mến!</p>
        <p>
          ⚠️ Toidoc xin thông báo về việc nâng cấp Website Toidoc để nâng trải
          nghiệm cho độc giả. Nền tảng Toidoc sẽ bảo trì đến{" "}
          <strong>12:00 trưa ngày 03/04/2025</strong>. ⏱ 🛠
        </p>
        <p>
          🔜 Trong thời gian nâng câps, bạn có thể truy cập vào Ứng dụng đọc
          truyện Toidoc của chúng tôi để tiếp tục đọc{" "}
        </p>
        <div>
          <div>
            <a
              href="https://toidoc.onelink.me/59bO/d42503wz"
              style={{ float: "left", marginRight: "20px" }}
            >
              <img
                src="https://media.truyenso1.xyz/ads/app-store.png"
                alt="Apple Store"
                style={{ maxWidth: "150px" }}
              />
            </a>
            <a href="https://toidoc.onelink.me/59bO/d42503wz" rel="nofollow">
              <img
                src="https://media.truyenso1.xyz/ads/google-play.png"
                alt="Google Play"
                style={{ maxWidth: "150px" }}
              />
            </a>
          </div>
        </div>
        <p>📧 Mọi thắc mắc xin vui lòng liên hệ: </p>
        <p>
          Fanpage Toidoc Support:{" "}
          <a href="https://www.facebook.com/toidoc.support" target="_blank">
            https://www.facebook.com/toidoc.support
          </a>
        </p>
        <p>Trân trọng,</p>
        <p>Đội ngũ Toidoc.</p>
      </div>
    </div>
  );
};

export default observer(Maintainance);
