import React from "react";
import StoriesComponent from "../../../src/pages/Stories";
import HeaderServer from "../../../src/components/HeaderServer";
import * as Api from "../../../src/api/api";

const Stories = ({ detail, canonical }) => {
  return (
    <>
      <HeaderServer
        title={
          detail?.seoTitle || "Thể loại truyện hấp dẫn được tổng hợp từ Toidoc"
        }
        description={
          detail?.metaDescription ||
          `Danh sách truyện thuộc thể loại ${detail?.name} liên tục được cập nhật mới. Các bộ truyện HOT, truyện Hoàn với trải nghiệm đọc mượt mà, sẽ mang đến cho bạn những phút giây thư giãn tuyệt vời. Bạn có thể tự tạo bộ lọc riêng của bạn.`
        }
        keywords={detail?.metaKeywords || `${detail?.name}, truyện ${detail?.name}, list truyện ${detail?.name}, danh sách truyện ${detail?.name}, tuyển tập truyện ${detail?.name}, truyện ${detail?.name} full, truyện ${detail?.name} hoàn, truyện ${detail?.name} hay`}
        canonical={canonical}
      />
      <StoriesComponent detail={detail}/>
    </>
  );
};

Stories.getInitialProps = async (ctx) => {
  try {
    let detail = {};
    if (ctx.query.categorySlug) {
      const result = await Api.get({
        url:
          // typeof window !== "undefined"
          //   ? "https://fsdfssf.truyenso1.xyz/data/private/data/categories/detail"
          //   : "http://10.8.22.205:8082/private/data/categories/detail",
          "https://fsdfssf.truyenso1.xyz/data/private/data/categories/detail",
        params: {
          code: ctx.query.categorySlug,
        },
        isServer: true,
        hideError: true,
      });
      console.log('result: ', result);
      detail = result.data;
    }

    let canonical = "https://toidoc.vn";
    if (ctx.query.categorySlug) {
      canonical = canonical + "/the-loai/" + ctx.query.categorySlug;
    }

    return {
      detail,
      canonical,
    };
  } catch (e) {
    console.log("getCategoryDetail error", e);
    return {
      detail: {},
    };
  }
};

export default Stories;
