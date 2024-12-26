import React from 'react'
// import { useAmp } from "next/amp";
import HomepageComponent from '../src/pages/Homepage'
// import ResearchComponent from '../src/pages/Research'
import HeaderServer from '../src/components/HeaderServer'
// export const config = { amp: 'hybrid' }

const Homepage = () => {

  function addHomeJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://toidoc.vn/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://api.toidoc.vn/data/private/data/story/search?keyword={search_term_string}&limit=20"
          },
          "query-input": "required name=search_term_string"
        }
      }`,
    };
  }
  // const isAmp = useAmp();
  return (
    <>
      <HeaderServer snipet={addHomeJsonLd()}/>
      <HomepageComponent />
      {/* {isAmp ? (
        <a href='/sieu-cap-cung-chieu'><img src='/images/sieu-cap-cung-chieu.png'/></a>
      ) : (
        <HomepageComponent />
        )
        } */}
      
      {/* <ResearchComponent /> */}
    </>
  )
}

export default Homepage
