import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import StoryCategories from "../StoryCategories/StoryCategories";
import StoryStats from "../StoryStats/StoryStats";

const StoryCover = ({ 
  coverImage, 
  title, 
  categories, 
  maxCategories, 
  totalView, 
  rate, 
  hotThreshold,
  imageDimensions 
}) => {
  return (
    <div className="relative overflow-hidden">
      <Image
        loader={imageLoader}
        className="object-cover transition-transform aspect-[3/4] rounded-tl-[25px] rounded-bl-[5px] rounded-e-[5px]"
        width={imageDimensions.width}
        height={imageDimensions.height}
        src={coverImage}
        alt={title}
        title={title}
      />
      
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 w-full py-2 pl-1 transform translate-y-full transition-transform duration-500 group-hover:-translate-y-6">
        <StoryCategories categories={categories} maxCount={maxCategories} />
      </div>

      <div className="w-full flex justify-center bg-black/60 mb-[5px] absolute bottom-0 max-w-full h-[15%] sm:h-[10%]">
        <StoryStats 
          totalView={totalView} 
          rate={rate} 
          hotThreshold={hotThreshold} 
        />
      </div>
    </div>
  );
};

export default StoryCover; 