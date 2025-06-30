import { observer } from "mobx-react";
import VerticalStoryItem from "../VerticalStoryItem/VerticalStoryItem";

const TopFull = ({ data }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 md:grid-rows-2 justify-center gap-x-3 gap-y-6">
      {data?.slice(0, 12).map((item, index) => (
        <VerticalStoryItem
          key={index}
          title={item?.title}
          slug={item?.slug}
          coverImage={item?.thumbnail || item.coverImage}
          status={item?.status}
          rate={item?.rate}
          totalView={item?.totalView}
          totalLike={item?.totalLike}
        />
      ))}
    </div>
  );
};

export default observer(TopFull);
