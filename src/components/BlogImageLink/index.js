// import Image from "next/image";
// import CustomLink from "../CustomLink";
// import { isEmpty } from "../../utils/utils";

// const BlogImageLink = ({ item, router, className }) => {
//   const query = router.query

//   return (
//     <CustomLink
//       router={router}
//       href={isEmpty(query) ? `blog/${item.slug}` : `/${item.slug}`}
//       query={{ id: item.id }}
//     >
//       <Image
//         width={1280}
//         height={720}
//         className={`rounded-lg ${className} cursor-pointer`}
//         src={item.coverImage || ""}
//         alt={item?.alt || "Blog image"}
//       />
//     </CustomLink>
//   );
// };

// export default BlogImageLink;
