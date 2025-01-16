import { useEffect, useState } from "react";
import * as Api from "../api/api";

export const useGetBlog = ({ blogId }) => {
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    if (!blogId) {
      return;
    }
    const getBlogById = async () => {
      try {
        const result = await Api.get({
          url: `https://api.toidoc.com/data/post/${blogId}`,
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
