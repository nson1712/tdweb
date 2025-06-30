import { StarFilled, StarTwoTone } from "@ant-design/icons";
import clsx from "clsx";

const StarsRate = ({
  rate,
  lightBg,
  color,
  className,
}) => {
  return (
    <div
      className={clsx(className, "w-fit flex gap-x-0.5", {
        "text-black text-[12px] -mt-0.5": lightBg,
        "text-white": !lightBg,
        "text-slate-400 text-[12px]": color === "primary",
      })}
    >
      {Math.round((rate + Number.EPSILON) * 10) / 10}
      <div >
      <StarFilled style={{color: "#fde047"}} />
      </div>
    </div>
  );
};

export default StarsRate;
