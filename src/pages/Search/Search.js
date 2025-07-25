import React, { useEffect, useState } from "react";
import StoryItem from "../../components/StoryItem/StoryItem";
import Router, { useRouter } from "next/router";
import { observer } from "mobx-react";

import * as Api from "../../api/api";
import Button from "../../components/Button/Button";
import StoryStore from "../../stores/StoryStore";

let timeout;

const Search = ({ hiddenSearch, setShowSearch }) => {
  const [text, setText] = useState("");
  const [stories, setStories] = useState({});
  const [last, setLast] = useState();
  const [loadingStories, setLoadingStories] = useState(false);

  const { getRecentSearchs, recentSearchs, saveStory } = StoryStore;

  useEffect(() => {
    getRecentSearchs();
  }, []);

  const router = useRouter();

  useEffect(() => {
    setText(router.query.tukhoa || "");
  }, [router.query.tukhoa]);

  const findStories = async (keyword, last) => {
    try {
      setLoadingStories(true);
      const result = await Api.get({
        url: "data/private/data/story/search",
        params: {
          keyword,
          last,
          limit: 20,
        },
      });

      if (!last) {
        setStories(result.data);
      } else {
        setStories((prev) => ({
          ...prev,
          ...result.data,
          list: [...prev.list, ...result.data.list],
        }));
      }

      setLoadingStories(false);
    } catch (e) {
      console.log(e);
      setLoadingStories(false);
    }
  };

  useEffect(() => {
    if (router.query?.tukhoa) {
      findStories(router.query?.tukhoa, last);
    }
  }, [router.query?.tukhoa, last]);

  const handleLoadmore = () => {
    setLast(stories.last);
  };

  return (
    <div className="max-w-[768px] mx-[auto] pt-20 md:bg-white">
      {!hiddenSearch && (
        <div className="flex items-center justify-between fixed md:static top-0 left-0 right-0 bg-white">
          <a
            className="p-[16px]"
            onClick={() => {
              Router.back();
            }}
          >
            <img src="/images/arrow-left.svg" className="w-[24px]" />
          </a>

          <div className="relative ml-[10px] flex-1 mr-[20px]">
            <input
              className="search h40 border-primary border-width-1"
              placeholder="Tìm kiếm truyện..."
              value={text}
              onChange={(e) => {
                const value = e.target.value;
                setText(value);
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                  Router.replace(`/tim-kiem-truyen?tukhoa=${value}`);
                }, 600);
              }}
            />
            <img
              src="/images/search.svg"
              className="search-icon"
              alt="Tìm kiếm truyện full"
              title="Tìm kiếm truyện full"
            />
          </div>
        </div>
      )}

      {!text && !router.query.tukhoa && (
        <div className=" px-[20px]">
          {recentSearchs?.keywords?.length > 0 && (
            <>
              <h1 className="text-[16px] font-bold label-text mb-[8px] ">
                Gần đây
              </h1>

              <div className="pb-[16px] mb-[16px] border-b-[1px] border-color">
                {recentSearchs?.keywords?.map((keyword, i) => (
                  <a
                    className="flex items-center"
                    onClick={() => {
                      Router.replace(`/tim-kiem-truyen?tukhoa=${keyword}`);
                    }}
                    key={`${keyword}-${i}`}
                  >
                    <img
                      src="/images/search.svg"
                      className="w-[24px] mr-[16px]"
                    />
                    <p className="mb-0 text-[15px] main-text py-[10px]">
                      {keyword}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )}
          <h1 className="text-[16px] font-bold label-text mb-[8px]">
            Top tìm kiếm
          </h1>

          <div className="pt-[0] flex flex-wrap flex-row">
            {recentSearchs?.stories?.map((item) => (
              <div className="px-[4px] w-[50%]" key={item.id}>
                <StoryItem item={item} direction="row" fromSearch={true} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="min-h-svh">
        {text && (
          <div className="px-3 grid grid-cols-2">
            {stories?.list?.map((item) => (
              <div className="py-[8px] px-[4px]" key={item.id}>
                <StoryItem
                  item={item}
                  direction="row"
                  fromSearch={true}
                  saveStory={saveStory}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {stories.hasNext && (
        <div className="w-full px-5 pb-[40px]">
          <Button
            className="btnMain"
            onClick={handleLoadmore}
            loading={loadingStories}
          >
            Xem thêm
          </Button>
        </div>
      )}
    </div>
  );
};

export default observer(Search);
