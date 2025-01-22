// import Link from "next/link";
// import { isEmpty } from "../../utils/utils";
// import CustomLink from "../CustomLink";

// const BlogTitleLink = ({ item, router }) => {
//   const path = router.query;
//   console.log("router.query: ", router.query)
//   return (
//     <CustomLink
//       router={router}
//       href={isEmpty(path) ? `blog/${item.slug}`: `/${item.slug}`}
//       query={{ id: item.id }}
//       className="text-black hover:text-blue-600"
//     >
//       <div className="text-black hover:text-blue-600">{item?.title || ""}</div>
//     </CustomLink>
//   );
// };

// export default BlogTitleLink;
