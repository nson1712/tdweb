import UnderLineTitle from "../../components/UnderLineTitle/UnderLineTitle";
import RelatedBlogItem from "./RelatedBlogItem";

const RelatedBlog = ({ relatedBlogList }) => {
  return (
    <>
      <UnderLineTitle title="Review Đánh Giá Truyện Khác" isH1={false}/>
      <div className="sm:grid sm:grid-cols-2 sm:grid-rows-3 gap-2">
        {relatedBlogList.map((item, index) => (
          <RelatedBlogItem key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default RelatedBlog;
