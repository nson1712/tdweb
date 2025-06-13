import React, { useState } from "react";
import * as Api from "../../api/api";
import Button from "../../components/Button";
import { useGoogleLogin } from "@react-oauth/google";
import { base64URLdecode, isCocCoc } from "../../utils/utils";
import { setAccessToken, setRefreshToken } from "../../utils/storage";
import GlobalStore from "../../stores/GlobalStore";
import Router from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import { Alert } from "antd";

const ShortLogin = ({ description, navigate = "", closeModal, enableFB }) => {
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const loginResult = await Api.post({
        url: "/customer/public/login-by-social",
        data: {
          token: tokenResponse.access_token,
          socialType: "GOOGLE",
        },
      });

      await setAccessToken(loginResult?.data?.accessToken);
      await setRefreshToken(loginResult?.data?.refreshToken);

      const tokens = loginResult?.data?.accessToken.split(".");
      const decoded = base64URLdecode(tokens[1]);
      const jsonObj = JSON.parse(decoded);
      GlobalStore.profile = {
        ...GlobalStore.profile,
        ...jsonObj,
      };
      GlobalStore.isLoggedIn = true;
      if (closeModal) {
        closeModal();
      }
      toast("Bạn đã đăng nhập thành công!", {
        type: "success",
        theme: "colored",
      });
      if (navigate !== "") {
        Router.push(navigate);
      }
    },
  });

  const handleFacebookLogin = () => {
    if (typeof window.FB !== "undefined") {
      window.FB.login(
        function (response) {
          if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            sendTokenToBackend(accessToken);
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "public_profile,email,user_link" } // Yêu cầu quyền
      );
    }
  };

  const sendTokenToBackend = async (accessToken) => {
    try {
      const loginResult = await Api.post({
        url: "/customer/public/login-by-social",
        data: {
          token: accessToken,
          socialType: "FACEBOOK",
        },
      });

      await setAccessToken(loginResult?.data?.accessToken);
      await setRefreshToken(loginResult?.data?.refreshToken);

      const tokens = loginResult?.data?.accessToken.split(".");
      const decoded = base64URLdecode(tokens[1]);
      const jsonObj = JSON.parse(decoded);
      GlobalStore.profile = {
        ...GlobalStore.profile,
        ...jsonObj,
      };
      GlobalStore.isLoggedIn = true;
      if (closeModal) {
        closeModal();
      }
      toast("Bạn đã đăng nhập thành công!", {
        type: "success",
        theme: "colored",
      });
      if (navigate !== "") {
        Router.push(navigate);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLoginEmail = () => {
    Router.push("/dang-nhap");
  };

  const handleSupport = () => {
    window.open(
      "https://m.me/185169981351799?text=Mình muốn đăng nhập trên web không được. Trợ giúp mình với.",
      "_blank"
    );
    setShowWarning(false);
  };

  const handleBirdClick = () => {
    window.open(
      `https://m.me/185169981351799?text=Mình đang đọc truyện trên web. Hỗ trợ giúp mình với.`,
      "_blank"
    );
  };

  return (
    <div className="relative">
      <div className="box-login">
        <h3
          className="white-text"
          style={{ margin: "auto", fontWeight: "bold", marginBottom: "10px" }}
        >
          Bạn chưa đăng nhập !
        </h3>
        <p className="white-text text-left">
          {description ||
            "Đăng nhập 1 chạm bằng các phương thức dưới đây để đọc nội dung này"}
        </p>
        <div style={{ margin: "auto" }}>
          <a id="google-login-btn" className="align-center">
            <Button
              className="login-button login-google-bg"
              onClick={(e) => handleLoginGoogle(e)}
            >
              <img
                src="/images/google.png"
                style={{
                  float: "left",
                  marginRight: "10px",
                  width: "25px",
                  height: "25px",
                }}
              />
              Đăng Nhập Bằng GOOGLE
            </Button>
          </a>
          <a id="facebook-login-btn" className="align-center mt-[10px]">
            <Button
              className="login-button login-fb-bg"
              onClick={(e) => handleFacebookLogin(e)}
            >
              <img
                src="/images/facebook.png"
                style={{
                  float: "left",
                  marginRight: "10px",
                  width: "15px",
                  height: "25px",
                }}
              />
              Đăng Nhập Bằng FACEBOOK
            </Button>
          </a>

          <div
            style={{ margin: "30px 10px", borderTop: "1px solid #fff" }}
          ></div>
          <div>
            <a href="https://toidoc.onelink.me/59bO/d42503wz" target='_blank' rel="nofollow">
                <Image
                  loader={imageLoader}
                  className="rounded-xl self-center"
                  width={500}
                  height={400}
                  src={"/images/intro-app.png"}
                  priority
                />
            </a>
          </div>
          <p className="white-text px-[10px] ">
            Hoặc bạn tải{" "}
            <a
              className="text-[#08e9ed] underline"
              href="https://toidoc.onelink.me/59bO/d42503wz"
            >
              App Toidoc
            </a>
            , đăng nhập và đọc truyện mượt mà hơn.
          </p>
          <div className="align-center">
            <a href="https://toidoc.onelink.me/59bO/d42503wz">
              <img
                src="/images/apple-icon-min.png"
                className="float-left mr-2.5 w-[135px] hover:translate-y-[-10%] transition delay-50 cursor-pointer"
                // style={{ float: "left", marginRight: "10px", width: "135px" }}
              />
            </a>
            <a href="https://toidoc.onelink.me/59bO/d42503wz">
              <img
                src="/images/android-icon-min.png"
                className="float-left mr-2.5 w-[135px] hover:translate-y-[-10%] transition delay-50 cursor-pointer"
              />
            </a>
          </div>
          {/*<Button className='login-button white-text login-email-button'
            onClick={() => handleLoginEmail()}>
            <img src='/images/email.png'  style={{'float': 'left', 'marginRight': '10px', 'width': '30px'}}/>
            Dùng email cá nhân
          </Button>*/}

          <button
            className="w-[270px] mx-auto flex justify-center h-fit p-2 text-base sm:text-lg text-white bg-[#849EBF] font-medium rounded-md text-center shadow-2xl hover:translate-y-[-5%] transition delay-75 cursor-pointer mt-4"
            onClick={() => setShowWarning(true)}
          >
            Báo lỗi đăng nhập
          </button>

          {showWarning && (
            <Alert
              showIcon
              type="warning"
              className="text-xl sm:text-2xl mt-4"
              message={
                <div>
                  Vui lòng kiểm tra lại trình duyệt bạn đang sử dụng!. Nếu bạn sử
                  dụng{" "}
                  <span className="font-bold text-red-500 italic">Cốc Cốc</span>{" "}
                  hoặc{" "}
                  <span className="font-bold text-red-500 italic">Firefox</span>
                  , vui lòng chuyển sang{" "}
                  <span className="font-bold text-red-500 italic">Chrome. </span>
                  Nếu bạn đang sử dụng Chrome mà vẫn không đăng nhập được, vui lòng <span className="text-blue-500 font-bold cursor-pointer hover:text-blue-400" onClick={handleSupport}>liên hệ với Toidoc!</span>
                </div>
              }
            />
          )}
        </div>
      </div>
      <div
        className="absolute animate-bounce-low top-0 right-0 bottom-0 flex items-center justify-center cursor-pointer"
        onClick={handleBirdClick}
      >
        <Image
          width={100}
          height={90}
          className="aspect-square"
          src="/images/bird-light@2x.png"
          alt="toidoc-support"
          loader={imageLoader}
        />
      </div>
    </div>
  );
};

export default ShortLogin;
