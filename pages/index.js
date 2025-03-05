import React, { useEffect } from "react";
// import { useAmp } from "next/amp";
// import HomepageComponent from "../src/pages/Homepage";
import ResearchComponent from '../src/pages/Research'
import HeaderServer from "../src/components/HeaderServer";
// export const config = { amp: 'hybrid' }
import GlobalStore from "../src/stores/GlobalStore";

const Homepage = () => {
  useEffect(() => {
    const checkLogin = async () => {
      if (!GlobalStore.isLoggedIn) {
        await GlobalStore.checkIsLogin();
      }
    };
    checkLogin();
  }, []);
  function addHomeJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Nền tảng đọc truyện Full #1 dành cho phái đẹp!",
        "url": "https://toidoc.vn/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://fsdfssf.truyenso1.xyz/data/private/data/story/search?keyword={search_term_string}&limit=20"
          },
          "query-input": "required name=search_term_string"
        }
      }`,
    };
  }
  // const isAmp = useAmp();
  return (
    <>
      <HeaderServer snipet={addHomeJsonLd()} />
      {/*<HomepageComponent />*/}
      {/* {isAmp ? (
        <a href='/sieu-cap-cung-chieu'><img src='/images/sieu-cap-cung-chieu.png'/></a>
      ) : (
        <HomepageComponent />
        )
        } */}

      <ResearchComponent />
    </>
  );
};

export default Homepage;
