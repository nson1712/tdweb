import React from "react";
import StoriesComponent from "../../../src/pages/Stories";
import HeaderServer from "../../../src/components/HeaderServer";
import * as Api from "../../../src/api/api";

const StoriesByHashTag = ({ detail, canonical, hashtagName }) => {
  return (
    <>
      <HeaderServer
        title={detail?.seoTitle || `Truyện ${hashtagName} hấp dẫn được tổng hợp từ Toidoc`}
        description={
          detail?.metaDescription ||
          `Danh sách các truyện thuộc thể loại truyện ${hashtagName} được nhiều độc giả đón đọc. Truyện full được cập nhật liên tục, bạn có thể đọc trên các nền tảng khác nhau.`
        }
        keywords={detail?.metaKeywords || `thể loại truyện ${hashtagName}, danh sách truyện ${hashtagName}, tìm truyện ${hashtagName}, truyện full ${hashtagName}, đọc truyện ${hashtagName}, truyện hay ${hashtagName}`}
        canonical={canonical}
      />
      <StoriesComponent />
    </>
  );
};

StoriesByHashTag.getInitialProps = async (ctx) => {
  try {
    let detail = {};
    if (ctx.query.hashtag) {
      const result = await Api.get({
        url:
          typeof window !== "undefined"
            ? "https://fsdfssf.truyenso1.xyz/data/private/data/story/search-by-hashtag"
            : "http://10.8.22.205:8082/private/data/story/search-by-hashtag",
          // "https://fsdfssf.truyenso1.xyz/data/private/data/story/search-by-hashtag",
          // typeof window !== "undefined"
          //   ? "https://uatapi.truyenso1.xyz/data/private/data/story/search-by-hashtag"
          //   : "http://10.8.22.250:18111/data/private/data/story/search-by-hashtag",
        params: {
          hashtag: ctx.query.hashtag,
        },
        isServer: true,
        hideError: true,
      });
      detail = result.data;
    }

    let canonical = "https://toidoc.vn";
    if (ctx.query.hashtag) {
      canonical = canonical + "/hashtag/" + ctx.query.hashtag;
    }

    return {
      detail,
      canonical,
      hashtagName: ctx.query.hashtag
    };
  } catch (e) {
    console.log("getStoriesByHashtag error", e);
    return {
      detail: {},
    };
  }
};

export default StoriesByHashTag;
