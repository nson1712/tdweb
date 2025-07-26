import { cn } from "../../utils/utils";
import { getDisplayCategories } from "../../utils/storyUtils";

const StoryCategories = ({ 
  categories, 
  maxCount, 
  className = "rounded-full px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm bg-emerald-600/80" 
}) => {
  const displayCategories = getDisplayCategories(categories, maxCount);

  return (
    <div className="flex flex-wrap gap-1">
      {displayCategories.map((category) => (
        <span
          key={category?.code || category?.id}
          className={cn(className)}
        >
          {category?.name}
        </span>
      ))}
    </div>
  );
};

export default StoryCategories; 