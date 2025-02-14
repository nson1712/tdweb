import { observer } from "mobx-react";
import VerticalStoryItem from "../VerticalStoryItem/VerticalStoryItem";

const TopFull = ({ data }) => {
  return (
    <div className="grid grid-cols-4 justify-center md:grid-cols-8 md:grid-rows-2 gap-x-4 gap-y-6">
      {data?.slice(0, 16).map((item, index) => (
        <VerticalStoryItem
          key={index}
          title={item.title}
          slug={item.slug}
          coverImage={item.thumbnail || item.coverImage}
        />
      ))}
    </div>
  );
};

export default observer(TopFull);
