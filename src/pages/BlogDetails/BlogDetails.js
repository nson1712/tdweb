import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import Content from "./Content";
import Menu from "./Menu";
import parse from "html-react-parser";
import PinMenu from "../../components/PinMenu/PinMenu";
import {
  appendNewLineAfterBlockLevelTags,
  getLastChild,
  getSlugfromSlugGenerate,
  slugGenerate,
} from "../../utils/utils";
import AuthorMessage from "../../components/AuthorMessage";
import Header from "../../components/Header/Header";
import { quotes } from "../../data/quotes";
import CategoriesTag from "../../components/CategoriesTag";
import CreateAndUpdateTimeZone from "../../components/CreateAndUpdateTimeZone";
import ArticleTitle from "../../components/ArticleTitle";
import ArticleShortDescription from "../../components/ArticleShortDescription";
import RelatedBlog from "../../components/RelatedBlog";

const BlogDetails = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [randomList, setRandomList] = useState([]);
  const [randomQuotes, setRandomQuotes] = useState([]);

  const [page, setPage] = useState(0);
  const size = 10000;

  useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = () => {
    const fetchUrl = `https://fsdfssf.truyenso1.xyz/data/article/list?size=${size}`;

    setLoading(true);
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.error("Fetch data error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getRandom = (arr, n) => {
    n = Math.min(n, arr.length);
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  useEffect(() => {
    if (list.length !== 0) {
      setRandomList(getRandom(list, 6));
    }
  }, [list]);

  useEffect(() => {
    if (quotes.length !== 0) {
      setRandomQuotes(getRandom(quotes, 1));
    }
  }, [quotes]);

  const updatedContent = data?.content
    ? appendNewLineAfterBlockLevelTags(data?.content)
    : "";

  const contentArr = updatedContent.split("\n");

  const getHeadingList = (arr) => {
    let headingList = [];
    const headingRegex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi;
    arr?.forEach((item) => {
      const validHeadings = item.match(headingRegex);
      if (validHeadings) {
        headingList = headingList.concat(validHeadings);
      }
    });

    return headingList;
  };


  const headingList = getHeadingList(contentArr).map((htmlString) => {
    const doc = parse(htmlString);
    const tagName = doc.type;
    const lastChild = getLastChild(doc);

    const levelMap = {
      h3: 1,
      h4: 2,
      h5: 3,
      h6: 4,
    };
    const level = levelMap[tagName] || null;
    return {
      label: lastChild,
      id: getSlugfromSlugGenerate(slugGenerate(lastChild || "")),
      level: level,
    };
  });


  const handleScrollTo = (headingId) => {
    const element = document.getElementById(headingId);
    if (element) {
      const yOffSet = -100;
      const yPosition =
        element.getBoundingClientRect().top + window.scrollY + yOffSet;
      window.scrollTo({
        top: yPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <CommonLayout className="text-base bg-transparent">
      <div className="top-0">
        <Header selectedTab={"LIBRARY"} />
      </div>
      <div className="max-w-[950px] mx-auto space-y-4 pb-24">
        <div className="md:-mt-32 relative p-3 bg-white min-h-[100vh] sm:shadow-sm sm:border sm:border-slate-100 rounded-2xl space-y-4">
          <CategoriesTag title="Blog" className="hidden sm:block" />

          <PinMenu headingList={headingList} scrollIntoView={handleScrollTo} />

          <ArticleTitle
            className="hidden text-xs sm:text-3xl sm:block font-semibold"
            title={data?.title}
          />

          <CreateAndUpdateTimeZone
            createdAt={data?.createdAt}
            updatedAt={data?.updatedAt}
          />

          <ArticleShortDescription shortDescription={data?.shortDescription} />

          {headingList.length !== 0 && (
            <Menu headingList={headingList} scrollIntoView={handleScrollTo} />
          )}

          <Content content={contentArr} />
        </div>

        <AuthorMessage message={randomQuotes} />

        <RelatedBlog relatedBlogList={randomList} />
      </div>
    </CommonLayout>
  );
};

export default observer(BlogDetails);
