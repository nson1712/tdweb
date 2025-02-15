import NewStory from "../../../components/NewStory";
import RatingList from "../../../components/RatingList";

const Section2 = ({ topNew, ratings }) => {

  const formatNewStories = topNew.data?.map((item) => ({
    ...item,
    categories: item.categories?.map((category) => category.name),
  }));

  return (
    <div className="max-w-[1116px] md:grid-flow-col md:grid-cols-12 md:grid px-2 gap-x-4 space-y-4 sm:space-y-0">
      <div className="md:col-span-8 space-y-4">
        <NewStory data={formatNewStories} />
      </div>

      <div className="md:col-span-4 bg-[#F5F8FF] p-2 rounded-xl hidden md:block">
        <RatingList ratings={ratings} />
      </div>
    </div>
  );
};

export default Section2;
