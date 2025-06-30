import Slider from "react-slick";
import { RatingCard } from "../RatingCard";
import { observer } from "mobx-react";
import StoryStore from "../../stores/StoryStore";
import { useRouter } from "next/router";

const settings = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  autoPlay: true,
  slidesToShow: 2.5,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1.4,
        slidesToScroll: 1,
      },
    },
  ],
};

const SlideRatings = ({ ratings, onEndReached }) => {
  const router = useRouter();
  const handleAfterChange = (currentSlide) => {
    // Nếu đang ở cuối (và có callback)
    if (
      currentSlide >= ratings?.length - 4 &&
      typeof onEndReached === "function"
    ) {
      onEndReached();
    }
  };

  const handleLikeUnlike = async (id, isLike, parentId) => {
    await StoryStore.handleLikeUnlike(id, isLike, parentId);
  };

  const handleForceLogin = () => {
    router.push("/dang-nhap");
  };
  return (
    <Slider className="flex" {...settings} afterChange={handleAfterChange}>
      {ratings?.map((item) => (
        <div key={item.id} className="pl-3">
          <RatingCard
            {...item}
            avatar={item.customer?.avatar}
            displayName={item.customer?.name}
            handleLikeUnlike={handleLikeUnlike}
            handleForceLogin={handleForceLogin}
          />
        </div>
      ))}
    </Slider>
  );
};

export default observer(SlideRatings);
