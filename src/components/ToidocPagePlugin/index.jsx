import useFacebookSDK from "../../hook/useFacebookSDK";

const ToiDocPagePlugin = () => {
  useFacebookSDK({
    src: "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v23.0&appId=703963665607035",
  });

  return (
    <div
      className="fb-page self-center"
      data-href="https://www.facebook.com/toidocofficial"
      // data-tabs="timeline"
      data-width="340"
      data-height="500"
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
    ></div>
  );
};

export default ToiDocPagePlugin;
