import { useEffect, useState } from "react";
import * as Api from "../api/api";
import { useRouter } from "next/router";

export const useGetBlog = () => {
  const router = useRouter();
  const blogId = router.query.id
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!blogId) {
      return;
    }
    const getBlogById = async () => {
      try {
        const result = await Api.get({
          url: `https://fsdfssf.truyenso1.xyz/data/article/${blogId}`,
        });
        setBlog({
          ...result.data,
        });
      } catch (e) {
        console.log("errorrrrr: ", e);
      }
    };
    getBlogById();
  }, [blogId]);

  return { blog };
};
