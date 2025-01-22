import Image from "next/image";
import withCustomLink from "../CustomLink";

const BlogImageLink = ({ item, className }) => (
  <div className={className}>
    <Image
      width={1280}
      height={720}
      className="rounded-lg"
      src={item.coverImage || ""}
      alt={item?.alt || "Blog image"}
    />
  </div>
);

export default withCustomLink(BlogImageLink);
