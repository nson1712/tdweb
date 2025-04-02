import React from "react";
import StoryDetailComponent from "../../../src/pages/StoryDetail";
import HeaderServerSchema from "../../../src/components/HeaderServerSchema";
import axios from "axios";

const StoryDetail = ({ detail, canonical, titleSlug }) => {
  return (
    <>
      <HeaderServerSchema
        title={detail ? `✅ Truyện ${detail.storyTitle} ${detail.seoTitle}` : `✅${titleSlug}| Nền tảng đọc truyện full cập nhật mới nhất `}
        description={
          detail.metaDescription
            ? detail.metaDescription.replace(/"/g, "")
            : `${detail.seoTitle} của truyện ${detail.storyTitle}. ${detail.shortDes ? detail.shortDes : 'Click vào để xem nội dung chi tiết đầy đủ!'}}`
        }
        keywords={detail.metaKeywords || `${detail.storyTitle}, ${detail.storyTitle} truyện full, đọc truyện ${detail.storyTitle}, ${detail.storyTitle} ${detail.seoTitle}`}
        image={detail?.thumbnail || detail.coverImage}
        canonical={canonical}
        author={detail?.authorName}
        rating={
          detail
            ? detail?.rate == null || detail?.rate === 0
              ? 4.3
              : detail?.rate
            : 4.3
        }
        slug={detail?.slug}
        totalView={
          detail
            ? detail?.totalView === 0 || detail?.totalView === null
              ? 10
              : detail?.totalView
            : 10
        }
      />
      <StoryDetailComponent
        chapterTitle={detail?.seoTitle}
        storyTitle={detail?.storyTitle}
      />
    </>
  );
};

StoryDetail.getInitialProps = async (ctx) => {
  const getDetail = async () => {
    try {
      if (ctx.query.storySlug !== "images" && ctx.query.storySlug !== "img") {
        const result = await axios.get(
          // typeof window !== "undefined"
          //   ? "https://fsdfssf.truyenso1.xyz/data/private/data/story/chapter/detail"
          //   : "http://10.8.22.205:8082/private/data/story/chapter/detail",
          'https://fsdfssf.truyenso1.xyz/data/private/data/story/chapter/detail',
          // typeof window !== 'undefined' ? 'https://uatapi.truyenso1.xyz/data/private/data/story/chapter/detail' : 'http://10.8.22.250:18111/data/private/data/story/chapter/detail',
          {
            params: {
              storySlug: ctx.query.storySlug,
              chapterSlug: ctx.query.chapterSlug,
            },
          }
        );
        const canonical =
          "https://toidoc.vn/" +
          ctx.query.storySlug +
          "/" +
          ctx.query.chapterSlug;

        return {
          detail: result.data?.data,
          canonical: canonical,
          titleSlug: ctx.query.storySlug,
        };
      }

      
      const canonical =
          "https://toidoc.vn/" +
          ctx.query.storySlug +
          "/" +
          ctx.query.chapterSlug;
      return {
        detail: {
          titleSlug: ctx.query.storySlug,
        },
        canonical: canonical,
      };
    } catch (e) {
      console.log("Error get chapter detail: ", e);
      const canonical =
          "https://toidoc.vn/" +
          ctx.query.storySlug +
          "/" +
          ctx.query.chapterSlug;
      return {
        detail: {
          titleSlug: ctx.query.storySlug,
        },
        canonical: canonical,
      };
    }
  };

  return await getDetail();
};

export default StoryDetail;
