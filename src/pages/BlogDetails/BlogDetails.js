import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import { DateTime } from "luxon";
import { CalendarTwoTone } from "@ant-design/icons";
import Content from "./Content";
import Menu from "./Menu";
import RelatedBlog from "./RelatedBlog";
import parse from "html-react-parser";
import PinMenu from "../../components/PinMenu/PinMenu";
import {
  appendNewLineAfterCloseHTag,
  getSlugfromSlugGenerate,
  slugGenerate,
} from "../../utils/utils";
import AuthorMessage from "../../components/AuthorMessage";
import Header from "../../components/Header/Header";

const BlogDetails = ({data}) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [randomList, setRandomList] = useState([]);

  const [page, setPage] = useState(0);
  const size = 10000;

  useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = () => {
    const fetchUrl = `https://api.toidoc.com/data/post/list?size=${size}`;

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
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
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

  const updatedContent = appendNewLineAfterCloseHTag(data?.content || "");

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

    const levelMap = {
      "h3": 1,
      "h4": 2,
      "h5": 3,
      "h6": 4,
    };
    const level = levelMap[tagName] || null;
    return {
      label: doc.props.children,
      id: getSlugfromSlugGenerate(
        slugGenerate(doc.props.children.props.children || "")
      ),
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
      <Header selectedTab={"LIBRARY"} />
      <div className="md:-mt-12 relative pb-[100px] max-w-[950px] mx-auto p-3 bg-white min-h-[100vh] sm:shadow-md sm:border sm:border-slate-100 rounded-2xl space-y-4">
        <div className="bg-[#DF062D] text-white font-semibold w-fit py-1 px-3 rounded-md">
          Blog
        </div>
        <PinMenu headingList={headingList} scrollIntoView={handleScrollTo} />

        <div className="hidden sm:text-[30px] sm:block font-semibold">
          {parse(data?.title || "")}
        </div>

        <div className="text-[12px] md:text-sm text-slate-500">
          <CalendarTwoTone /> Ngày đăng:{" "}
          {DateTime.fromMillis(data?.createdAt ?? 0, { zone: "utc" }).toFormat(
            "dd/MM/yyyy"
          )}{" "}
          - Cập nhật:{" "}
          {DateTime.fromMillis(data?.updatedAt ?? 0, { zone: "utc" }).toFormat(
            "dd/MM/yyyy"
          )}
        </div>

        <div>{parse(data?.shortDescription || "")}</div>

        <Menu headingList={headingList} scrollIntoView={handleScrollTo} />

        <Content content={contentArr} />

        {/* <AuthorMessage /> */}

        <RelatedBlog relatedBlogList={randomList} />
      </div>
    </CommonLayout>
  );
};

export default observer(BlogDetails);
