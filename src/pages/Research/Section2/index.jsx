import HorizontalStory from "../../../components/HorizontalStoryItem";
import CommentCard from "../../../components/CommentCardItem";
import NewStory from "../../../components/NewStory";
import { commentItem } from "../../../data/testData";

const Section2 = () => {
  const newStory = [
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Huyền Ảo", "Đam Mỹ", "Bách Hợp"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title:
        "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh zxvc zvxc zvc zvc",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
    {
      title: "Thập Niên 60: Trọng Sinh Thay Đổi Vận Mệnh",
      categories: ["Bách Hợp", "Đam Mỹ", "Huyền Ảo"],
      createdAt: 1738813459167,
    },
  ];

  return (
    <div className="max-w-[1116px] md:grid-flow-col md:grid-cols-12 md:grid px-2 gap-x-4 space-y-4 sm:space-y-0">
      <div className="md:col-span-8 space-y-4">
        <NewStory data={newStory} />
      </div>

      <div className="md:col-span-4 bg-[#F5F8FF] p-2 rounded-xl">
        <div className="flex flex-col gap-y-4">
          <div className="font-bold text-lg leading-normal">
            Đánh giá truyện
          </div>
          {commentItem.map((item, index) => (
            <div key={index}>
              <HorizontalStory
                items={item.storyItem}
                type="secondary"
                whiteBg
                viewVisible
                starVisible
                statusVisible
              />
              <CommentCard items={item.commentItem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section2;
