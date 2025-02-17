import { useEffect } from "react";

const useFacebookSDK = () => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v22.0";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      window.FB && window.FB.XFBML.parse();
    };

    document.body.appendChild(script);
  }, []);
};

export default useFacebookSDK;
