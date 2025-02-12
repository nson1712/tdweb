import React from "react";
import ResearchComponent from "../src/pages/Research";
import HeaderServer from "../src/components/HeaderServer";

const Research = ({ canonical }) => {
  function addKhamphaJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://toidoc.vn/tim-kiem",
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
  return (
    <>
      <HeaderServer
        description="Khám phá các thể loại truyện khác nhau như ngôn tình, sủng, ngược, tiên hiệp, kiếm hiệp, đam mỹ. Ngoài ra bạn có thể xem danh sách top các loại truyện mà chung tôi cung cấp sẵn"
        title="🌟[Đề Cử] Khám phá Truyện Full Độc Đáo | Nền tảng cộng cồng đọc truyện Online Toidoc"
        canonical={canonical}
        snipet={addKhamphaJsonLd()}
      />
      <ResearchComponent />
    </>
  );
};

Research.getInitialProps = async (ctx) => {
  try {
    let canonical = "https://toidoc.vn/tim-kiem?tukhoa=";
    if (ctx.query.tukhoa) {
      canonical = canonical + ctx.query.categorySlug;
    }

    return {
      canonical,
    };
  } catch (e) {
    return "https://toidoc.vn/tim-kiem";
  }
};

export default Research;
