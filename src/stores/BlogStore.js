// import { useEffect, useState } from "react";
// import * as Api from "../api/api";

// export const useGetBlog = () => {
//   const [blog, setBlog] = useState(null);

//   useEffect(() => {
//     const getBlog = async () => {
//       try {
//         const result = await Api.get({
//           url: "https://uatapi.truyenso1.xyz/data/admin/posts",
//           params: {
//             size: 20,
//             page: 0,
//           },
//         });
//         console.log("RESULT: ", result);
//         setBlog({
//           ...result.data,
//         });
//       } catch (e) {
//         console.log("errorrrrr: ", e);
//       }
//     };
//     getBlog();
//   }, []);

//   return { blog };
// };
