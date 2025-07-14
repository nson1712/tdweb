import StoryDetailComponent from "../../../src/pages/StoryDetail";
import HeaderServerSchema from "../../../src/components/HeaderServerSchema";
import axios from "axios";
import NotFound from "../../../src/components/NotFound";

const StoryDetail = ({ detail, canonical, titleSlug, statusCode }) => {
  return (
    <>
      <HeaderServerSchema
        containTitle={detail ? detail.storyTitle : ""}
        title={
          detail
            ? `✅ Truyện ${detail.storyTitle} ${detail.seoTitle}`
            : `✅${titleSlug}| Nền tảng đọc truyện full cập nhật mới nhất `
        }
        description={
          detail?.metaDescription
            ? detail.metaDescription.replace(/"/g, "")
            : `${detail?.seoTitle} của truyện ${detail?.storyTitle}. ${
                detail?.shortDes || "Click vào để xem nội dung chi tiết đầy đủ!"
              }`
        }
        keywords={
          detail?.metaKeywords ||
          `${detail?.storyTitle}, ${detail?.storyTitle} truyện full, đọc truyện ${detail?.storyTitle}, ${detail?.storyTitle} ${detail?.seoTitle}`
        }
        image={detail?.thumbnail || detail?.coverImage}
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
      {statusCode === 404 ?
          <NotFound title='Chương bạn đang tìm đã bị xoá khỏi hệ thống.'/>
        :
          <StoryDetailComponent
            chapterTitle={detail?.seoTitle}
            storyTitle={detail?.storyTitle}
          />
      }
      
    </>
  );
};

export async function getServerSideProps(context) {
  const { storySlug, chapterSlug } = context.params;

  const canonical = `https://toidoc.vn/${storySlug}/${chapterSlug}`;

  if (storySlug === "images" || storySlug === "img") {
    return {
      props: {
        detail: { titleSlug: storySlug },
        canonical,
        titleSlug: storySlug,
      },
    };
  }

  try {
    const result = await axios.get(
      typeof window !== "undefined"
            ? "https://fsdfssf.truyenso1.xyz/data/private/data/story/chapter/detail"
            : "http://10.8.22.205:8082/private/data/story/chapter/detail",
          // 'https://fsdfssf.truyenso1.xyz/data/private/data/story/chapter/detail',
          // typeof window !== 'undefined' ? 'https://uatapi.truyenso1.xyz/data/private/data/story/chapter/detail' : 'http://10.8.22.250:18111/data/private/data/story/chapter/detail',
      {
        params: {
          storySlug,
          chapterSlug,
        },
      }
    );

    if (result?.data?.data) {
      return {
        props: {
          detail: result?.data?.data || {},
          canonical,
          titleSlug: storySlug,
        },
      };
    } else {
      context.res.statusCode = 404;
      return {props: {statusCode: 404},};
    }
    
  } catch (e) {
    console.log("Error get chapter detail: ", e?.response?.data?.error);

    if (e?.response?.data?.error === "The story does not exist") {
      context.res.statusCode = 404;
      return {props: {statusCode: 404},};
    }

    return {
      props: {
        detail: { titleSlug: storySlug },
        canonical,
        titleSlug: storySlug,
      },
    };
  }
}

export default StoryDetail;
