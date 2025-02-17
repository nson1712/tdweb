import useFacebookSDK from "../../hook/useFacebookSDK";

const FacebookPagePlugin = () => {
  useFacebookSDK();

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

export default FacebookPagePlugin;