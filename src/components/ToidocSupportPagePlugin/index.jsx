import React, { useState, useEffect } from "react";
import useFacebookSDK from "../../hook/useFacebookSDK";

const ToidocSupportPagePlugin = ({ customWidth, height = 300 }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFacebookSDK({
    src: "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v23.0&appId=703963665607035",
  });

  return (
    <div
      className="fb-page self-center"
      data-href="https://www.facebook.com/toidoc.support"
      data-width={customWidth ?? width}
      data-height={height}
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
    ></div>
  );
};

export default ToidocSupportPagePlugin;
