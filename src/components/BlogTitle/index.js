import CustomLink from "../CustomLink";

const BlogTitleLink = ({ item, router }) => {
  const isBlogPath = router.asPath.split("/").includes("blog");
  return (
    <CustomLink
      router={router}
      href={isBlogPath ? `/${item.slug}` : `blog/${item.slug}`}
      query={{ id: item.id }}
      className="text-black hover:text-blue-600"
    >
      <div>{item?.title || ""}</div>
    </CustomLink>
  );
};

export default BlogTitleLink;
