
import clsx from "clsx";
import HeartIcon from "../../../public/icons/HeartIcon";

const Heart = ({
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
      
      <HeartIcon width={15} height={15}/>
      {Math.round((rate + Number.EPSILON) * 10) / 10}
    </div>
  );
};

export default Heart;
