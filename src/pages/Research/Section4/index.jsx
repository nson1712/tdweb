import { useEffect, useState } from "react";
import StoryStore from "../../../stores/StoryStore";
import TopFull from "../../../components/TopFull";
import Title from "./title";
import { getRadomNumber } from "../../../utils/utils";

const Section4 = () => {
  const [randomPage, setRandomPage] = useState(1);
  const { topFull, getTopFull } = StoryStore;
  // const randomPage = getRadomNumber(0, topFull.totalPages);
  useEffect(() => {
    getTopFull(randomPage, 20);
  }, [randomPage]);

  const handleRefreshData = () => {
    setRandomPage(getRadomNumber(1, topFull.totalPages));
  };

  return (
    <div className="px-2 space-y-4">
      <Title handleRefreshData={handleRefreshData} />
      <TopFull data={topFull?.data} />
    </div>
  );
};

export default Section4;
