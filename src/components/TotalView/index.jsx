import ViewIcon from "../../../public/icons/ViewIcon";
import { cn, convertToShortScale } from "../../utils/utils";

const TotalView = ({ totalView, className }) => {
  return (
    <div className="flex flex-row gap-x-1">
      <ViewIcon />
      <div
        className={cn("text-xs self-center", className)}
      >
        {convertToShortScale(totalView)}
      </div>
    </div>
  );
};

export default TotalView;
