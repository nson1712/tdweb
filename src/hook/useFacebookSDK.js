import { useEffect } from "react";

const useFacebookSDK = ({src}) => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
      return;
    }

    const script = document.createElement("script");
    script.src = src
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
