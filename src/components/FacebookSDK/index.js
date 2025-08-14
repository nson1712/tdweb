import { useEffect } from "react";

const FacebookSDK = () => {
  useEffect(() => {
    // Kiểm tra xem SDK đã tải chưa, tránh tải lại nhiều lần
    if (typeof window !== "undefined" && !window.FB) {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "939240831358946",
          cookie: true,
          xfbml: true,
          version: "v20.0", // Hạ version nếu v21.0 có lỗi
        });

        window.FB.AppEvents.logPageView();
      };

      // Thêm SDK vào trang
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  }, []);

  return null; // Không render gì cả, chỉ load SDK
};

export default FacebookSDK;
