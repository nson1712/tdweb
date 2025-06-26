
import ViewIcon from "../../../public/icons/ViewIcon";
import { convertToShortScale } from "../../utils/utils";

const TotalView = ({ totalView, textStyle=''}) => {
  return (
    <div className="flex flex-row gap-x-1">
      <ViewIcon />
      <div className={`${textStyle !== '' ? textStyle : 'text-black'} text-[12px] self-center`}>
        {convertToShortScale(totalView)}
      </div>
    </div>
  );
};

export default TotalView;
