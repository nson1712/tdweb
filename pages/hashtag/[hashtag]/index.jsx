import React from "react";
import StoriesComponent from "../../../src/pages/Stories";
import HeaderServer from "../../../src/components/HeaderServer";
import * as Api from "../../../src/api/api";

const StoriesByHashTag = ({ detail, canonical }) => {
  return (
    <>
      <HeaderServer
        title={detail?.seoTitle || "Hashtag hấp dẫn được tổng hợp từ Toidoc"}
        description={
          detail?.metaDescription ||
          "Danh sách các truyện thuộc một hashtag mà bạn đang chọn như #NgônTình, #KiếmHiệp, #TiênHiệp, #Đammỹ, #Sủng, #Ngược, #Huyềnhuyễn. Bạn có thể tự tạo bộ lọc riêng của bạn."
        }
        keywords={detail?.metaKeywords}
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
    };
  } catch (e) {
    console.log("getStoriesByHashtag error", e);
    return {
      detail: {},
    };
  }
};

export default StoriesByHashTag;
