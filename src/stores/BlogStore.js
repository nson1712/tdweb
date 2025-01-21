import { useEffect, useState } from "react";
import * as Api from "../api/api";

export const useGetBlog = () => {
  const [blog, setBlog] = useState(null);
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const query = localStorage.getItem("hiddenQuery");
      if (query) {
        const parsedQuery = JSON.parse(query);
        setBlogId(parsedQuery.id);
      }
    }
  }, []);

  useEffect(() => {
    if (!blogId) {
      return;
    }
    const getBlogById = async () => {
      try {
        const result = await Api.get({
          url: `https://api.toidoc.com/data/article/${blogId}`,
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
