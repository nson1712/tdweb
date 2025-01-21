import Image from "next/image";
import CustomLink from "../CustomLink";

const BlogImageLink = ({ item, router, className }) => {
  const isBlogPath = router.asPath.split("/").includes("blog");

  return (
    <CustomLink
      router={router}
      href={isBlogPath ? `/${item.slug}` : `blog/${item.slug}`}
      query={{ id: item.id }}
    >
      <Image
        width={1280}
        height={720}
        className={`rounded-lg ${className} cursor-pointer`}
        src={item.coverImage || ""}
        alt={item?.alt || "Blog image"}
      />
    </CustomLink>
  );
};

export default BlogImageLink;
