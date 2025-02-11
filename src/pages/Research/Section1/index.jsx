import { useEffect } from "react";
import HotCategories from "../../../components/HotCategories";
import UnfinishedStory from "../../../components/UnfinishedStory";
import StoryStore from "../../../stores/StoryStore";
const Section1 = () => {
  const { categories, getCategories, viewings, getStoryViewings } = StoryStore;

  useEffect(() => {
    // const checkLogin = async() => {
    //   try {
    //     await GlobalStore.checkIsLogin();
    //   } catch(e) {}
    // }

    // checkLogin();
    // getCategories();
    getCategories();
    getStoryViewings();
  }, []);

  console.log("VIEWINGS: ", viewings)

  return (
    <div className="px-2 sm:grid sm:grid-flow-col sm:grid-cols-12 gap-x-4">
      <UnfinishedStory
        items={[
          {
            totalReadingStory: viewings ? viewings.totalElements : 0,
            unfinishedStory: {
              readingPercent: viewings?.data?.[0].readingPercent,
              title: viewings?.data?.[0].story.title,
              coverImage:
                viewings?.data?.[0].story.coverImage,
              currentChapterOrder: viewings?.data?.[0].currentChapterOrder,
              storySlug: viewings?.data?.[0].storySlug,
              chapterSlug: viewings?.data?.[0].chapterSlug
            },
          },
        ]}
      />
      <div className="sm:order-1 sm:col-span-7 md:col-span-8">
        <HotCategories data={categories} />
      </div>
    </div>
  );
};

export default Section1;
