import Image from "next/image";
import withCustomLink from "../CustomLink";
import imageLoader from "../../loader/imageLoader";

const BlogImageLink = ({ item, className }) => (
  <div className={className}>
    {item?.coverImage ? (
      <Image
        loader={imageLoader}
        width={1280}
        height={720}
        className="rounded-lg"
        src={item.coverImage || ""}
        alt={item?.alt || "Blog image"}
      />
    ) : null}
  </div>
);

export default withCustomLink(BlogImageLink);
