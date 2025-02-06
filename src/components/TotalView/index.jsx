
import ViewIcon from "../../../public/icons/ViewIcon";
import { convertToShortScale } from "../../utils/utils";

const TotalView = ({ totalView }) => {
  return (
    <div className="flex flex-row gap-x-1 ">
      <ViewIcon />
      <div className="text-black font-bold text-[12px] self-center">
        {convertToShortScale(totalView)}
      </div>
    </div>
  );
};

export default TotalView;
