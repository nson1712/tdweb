import React from "react";
import StorySummaryComponent from "../../src/pages/StorySummary";
import HeaderServerSchema from "../../src/components/HeaderServerSchema";
import axios from "axios";
import { countWords } from "../../src/utils/utils";

const StorySummary = ({ detail, article, canonical }) => {
  return (
    <>
      <HeaderServerSchema
        containTitle={detail ? detail.title : ""}
        title={`✅ ${
          (detail?.status === "ACTIVE" ? "[FULL] " : "") + detail?.title
        }${
          countWords(detail?.title) <= 70
            ? "| Nền tảng cộng đồng đọc truyện online hấp dẫn"
            : ""
        }`}
        description={
          detail?.metaDescription
            ? detail?.metaDescription.replace(/"/g, "")
            : detail?.metaDescription
        }
        keywords={detail?.metaKeywords}
        image={detail?.thumbnail || detail?.coverImage}
        canonical={`https://toidoc.vn/${canonical}`}
        author={detail?.author?.name}
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
      <StorySummaryComponent storyDetail={detail} articleDetail={article} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { storySlug } = context.params;

  if (storySlug === "images" || storySlug === "img") {
    return {
      props: {
        detail: {},
        article: {},
        canonical: storySlug,
      },
    };
  }

  try {
    // const result = await axios.get(`https://fsdfssf.truyenso1.xyz/data/private/data/story/detail?slug=${storySlug}`);
    // const resultBlog = await axios.get(`https://fsdfssf.truyenso1.xyz/data/article/story/${storySlug}`);
    // const result = await axios.get(
    // typeof window !== 'undefined' ? `https://fsdfssf.truyenso1.xyz/data/private/data/story/detail?slug=${storySlug}` : `http://10.8.22.205:8082/private/data/story/detail?slug=${storySlug}`)
    const result = await axios.get(
      `https://fsdfssf.truyenso1.xyz/data/private/data/story/detail?slug=${storySlug}`
    );
    // typeof window !== 'undefined' ? `https://uatapi.truyenso1.xyz/data/private/data/story/detail?slug=${storySlug}` : `http://10.8.22.250:18111/data/private/data/story/detail?slug=${storySlug}`)
    // console.log('Result: ', result);
    // const resultBlog = await axios.get(typeof window !== 'undefined' ? `https://fsdfssf.truyenso1.xyz/data/article/story/${storySlug}` : `http://10.8.22.205:8082/article/story/${storySlug}`);
    const resultBlog = await axios.get(
      `https://fsdfssf.truyenso1.xyz/data/article/story/${storySlug}`
    );

    return {
      props: {
        detail: result?.data?.data || {},
        article: resultBlog?.data?.data || {},
        canonical: storySlug,
      },
    };
  } catch (e) {
    console.log("server call error", e?.response?.data);

    if (e?.response?.data?.error === "The story does not exist") {
      console.log("The story does not exist ==========");
      return {
        redirect: {
          destination: "/404.html",
          permanent: true, // 301 redirect
        },
      };
    }

    return {
      props: {
        detail: {},
        article: {},
        canonical: storySlug,
      },
    };
  }
}

export default StorySummary;
