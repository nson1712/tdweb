import React, { useEffect, useMemo, useState } from "react";
import StoryItem from "../../components/StoryItem/StoryItem";
import Router, { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import { observer } from "mobx-react";
import StoryStore from "../../stores/StoryStore";
import ModalComponent from "../../components/Modal";
import classNames from "classnames";
import { convertObjectToSearchParams } from "../../utils/utils";
import Link from "next/link";
import { Pagination } from "antd";
import { toJS } from "mobx";

const SORTS = [
  {
    label: "Phổ biến",
    value: "popular",
  },
  {
    label: "Hot nhất",
    value: "hot",
  },
  {
    label: "Mới nhất",
    value: "newest",
  },
  {
    label: "Cũ nhất",
    value: "oldest",
  },
];

const STATUS = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "Đã hoàn thành",
    value: "active",
  },
  {
    label: "Đang ra",
    value: "pending",
  },
];

const CHAPTERS = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "<50",
    value: "0-50",
  },
  {
    label: "50-100",
    value: "50-100",
  },
  {
    label: "100-200",
    value: "100-200",
  },
  {
    label: "200-500",
    value: "200-500",
  },
  {
    label: "500-1000",
    value: "500-1000",
  },
  {
    label: ">1000",
    value: "1000-500000",
  },
];

let timeout;

const Stories = ({detail}) => {
  const route = useRouter();
  const [filter, setFilter] = useState({
    sort: "hot",
    chapters: undefined,
    status: undefined,
  });
  const [showSort, setShowSort] = useState(false);
  const [sort, setSort] = useState("hot");

  const [showFilter, setShowFilter] = useState(false);
  const [tempFilter, setTempFilter] = useState({
    chapters: undefined,
    status: undefined,
  });

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20)
  const [last, setLast] = useState();

  const {
    storyByCategory,
    getStoryByCategory,
    loadingStories,
    topTrending,
    getTopTrending,
    topViews,
    getTopViews,
    hotStories,
    getHotStories,
    topFull,
    getTopFull,
    topNew,
    getTopNew,
    getStoryByCollection,
    collectionStories,
    storiesByHashtag,
    getStoriesByHashtag,
    stories,
    getStories
  } = StoryStore;

  console.log("ROUTE.QUERY: ", route.query)

  useEffect(() => {
    if (route.query.categorySlug) {
      getStories(route.query.categorySlug, page, pageSize);
    } else if (route.query.collectionSlug) {
      getStoryByCollection(page, pageSize, route.query.collectionSlug);
    } else if (route.query.hashtag) {
      getStoriesByHashtag(page, pageSize, route.query.hashtag);
    } else {
      switch (route.query.theloai) {
        case "trending":
          getTopTrending(page, pageSize);
          break;
        case "moi-nhat":
          getTopNew(page, pageSize);
          break;
        case "truyen-full":
          getTopFull(page, pageSize);
          break;
        case "xem-nhieu-nhat":
          getTopViews(page, pageSize);
          break;
        case "hot":
          getHotStories(page, pageSize);
          break;
      }
    }
  }, [route.query, page, pageSize, last]);


  const data = useMemo(() => {
    if (route.query.categorySlug) {
      return stories
    }
    if (route.query.hashtag) {
      return storiesByHashtag;
    }
    if (route.query.collectionSlug) {
      return collectionStories;
    }
    if (route.query.theloai) {
      if (route.query.theloai === "trending") {
        return topTrending;
      }
      if (route.query.theloai === "moi-nhat") {
        return topNew;
      }
      if (route.query.theloai === "truyen-full") {
        return topFull;
      }
      if (route.query.theloai === "xem-nhieu-nhat") {
        return topViews;
      }
      if (route.query.theloai === "hot") {
        return hotStories;
      }
    }
    return [];
  }, [
    route.query,
    stories,
    topTrending,
    topViews,
    hotStories,
    topFull,
    topNew,
    storyByCategory,
    storiesByHashtag,
    collectionStories,
  ]);

  const title = useMemo(() => {
    if (route.query.categorySlug) {
      return `Danh sách truyện ${detail?.name}`;
    }
    if (route.query.collectionSlug) return collectionStories?.name;
    if (route.query.hashtag) return `# ${route.query.hashtag}`;
    return (
      {
        trending: "Danh sách truyện trending",
        "moi-nhat": "Danh sách truyện mới",
        "truyen-full": "Truyện đã full mới nhất",
        "xem-nhieu-nhat": "Nhiều lượt view nhất",
        hot: "Truyện HOT Toidoc",
        hashtag: "Danh sách truyện thuộc hashtag",
      }[route.query.theloai] || "Danh sách truyện"
    );
  }, [route.query, data, collectionStories]);

  // useEffect(() => {
  //   const trackScrolling = () => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(async () => {
  //       const windowHeight =
  //         "innerHeight" in window
  //           ? window.innerHeight
  //           : document.documentElement.offsetHeight;
  //       const body = document.body;
  //       const html = document.documentElement;
  //       const docHeight = Math.max(
  //         body.scrollHeight,
  //         body.offsetHeight,
  //         html.clientHeight,
  //         html.scrollHeight,
  //         html.offsetHeight
  //       );
  //       const windowBottom = windowHeight + window.pageYOffset;
  //       const isBottom = windowBottom >= docHeight - 600;

  //       if (isBottom) {
  //         handleLoadmore();
  //       }
  //     }, 0);
  //   };
  //   window.addEventListener("scroll", trackScrolling);

  //   return () => {
  //     window.removeEventListener("scroll", trackScrolling);
  //   };
  // }, [data]);

  // const handleLoadmore = () => {
  //   if (data && data?.totalElements > 0 && data?.totalPages > page) {
  //     setPage(page + 1);
  //   }
  //   if (data && data.hasNext) {
  //     setLast(data.last);
  //   }
  // };

  const onShowSizeChange = (_, pageSize) => {
    setPageSize(pageSize)
  };

  const onPageChange = (page) => {
    setPage(page - 1)
  }

  return (
    <CommonLayout>
      <div>
        <div className="hidden md:block">
          <Header />
        </div>

        <div className="max-w-[768px] mx-[auto] md:pt-[80px] md:bg-white py-16">
          <div className="flex items-center justify-between fixed md:static top-0 left-0 right-0 bg-white">
            <div className="flex items-center">
              <Link href="/tim-kiem" passHref>
                <a
                  className="p-[20px]"
                  title="Nền tảng cộng đồng đọc truyện online hấp dẫn"
                  onClick={() => {
                    if (route.query.from === "ads") {
                      Router.push("/tim-kiem");
                    } else {
                      Router.back();
                    }
                  }}
                >
                  <img
                    src="/images/arrow-left.svg"
                    className="w-[24px]"
                    alt="Nền tảng cộng đồng đọc truyện online hấp dẫn"
                  />
                </a>
              </Link>

              <h1 className="text-[16px] leading-[20px] font-bold main-text mb-0">
                {title}
              </h1>
            </div>

            <Link href="/tim-kiem-truyen" passHref>
              <a
                className="w-[32px] h-[32px] flex items-center justify-center gray-bg rounded-full mr-[20px]"
                title="Tìm kiếm truyện full hay, truyện ngôn tình, tiên hiệp, kiếm hiệp"
                // onClick={() => {
                //   Router.push(`/tim-kiem-truyen`)
                // }}
              >
                <img
                  src="/images/ic_search.svg"
                  className="w-[24px]"
                  alt="Tìm kiếm truyện full hay, truyện ngôn tình, tiên hiệp, kiếm hiệp"
                />
              </a>
            </Link>
          </div>
          {route.query.categorySlug && (
            <div className="flex items-center justify-between py-[15px] px-[20px] border-t-[1px] border-color border-b-[1px]">
              {/* <p className='mb-0 text-[14px] label-text'>
            tìm kiếm
          </p> */}
              <div className="flex items-center">
                <a
                  className="flex items-center"
                  onClick={() => {
                    setShowSort(true);
                  }}
                >
                  <img
                    src="/images/ic_arrange.svg"
                    className="w-[16px] mr-[8px]"
                  />
                  <p className="mb-0 text-[14px] font-bold main-text">
                    Sắp xếp
                  </p>
                </a>

                <a
                  className="flex items-center ml-[30px]"
                  onClick={() => {
                    setShowFilter(true);
                  }}
                >
                  <img src="/images/sort.svg" className="w-[16px] mr-[8px]" />
                  <p className="mb-0 text-[14px] font-bold main-text">
                    Phân loại
                  </p>
                </a>
              </div>
            </div>
          )}

          <div className="px-[16px] md:pt-0 flex flex-wrap flex-row pt-[10px]">
            {data?.data?.map((item, i) => (
              <div className="py-[8px] w-[50%]" key={`${item.id}-${i}`}>
                <StoryItem item={item} direction="row" fromSearch={true} />
              </div>
            ))}

            <div className="w-full flex justify-end mt-4">
            <Pagination
              defaultCurrent={1}
              defaultPageSize={20}
              showSizeChanger
              showQuickJumper
              onShowSizeChange={onShowSizeChange}
              onChange={onPageChange}
              locale={{
                jump_to: "Đi tới",
                page: "Trang",
                items_per_page: "/ Trang",
              }}
              total={data?.totalElements}
            />
            </div>

            {/* {
            data && (data.totalPages > page || data.hasNext)
            && <div className='max-w-[300px] w-full mx-auto mt-[40px] pb-[40px]'>
            <Button className='btnMain'
              onClick={handleLoadmore}
              loading={loadingStories}
            >
              Xem thêm
            </Button>
          </div>
          } */}
          </div>
        </div>

        <ModalComponent
          show={showSort}
          title="Sắp xếp theo:"
          handleClose={() => {
            setSort(filter.sort);
            setShowSort(false);
          }}
        >
          {SORTS.map((option) => (
            <a
              className={classNames(
                "block px-[8px] py-[16px] text-[16px] font-medium main-text",
                option.value === sort && "text-active bg-tab-active"
              )}
              key={option.value}
              onClick={() => {
                setSort(option.value);
              }}
            >
              {option.label}
            </a>
          ))}

          <a
            className="btnMain mt-[24px]"
            onClick={() => {
              setLast(undefined);
              Router.replace(
                `${route.pathname}${convertObjectToSearchParams({
                  theloai: route.query.categorySlug,
                  sort,
                  status: filter.status,
                  chapters: filter.chapters,
                })}`
              );
              setShowSort(false);
            }}
          >
            Áp dụng
          </a>
        </ModalComponent>

        <ModalComponent
          show={showFilter}
          title="Phân loại theo:"
          handleClose={() => {
            setTempFilter({
              status: filter.status,
              chapters: filter.chapters,
            });
            setShowFilter(false);
          }}
        >
          <p className="text-[16px] font-medium main-text leading-[20px] mb-[16px]">
            Trạng thái
          </p>
          <div className="flex flex-wrap mb-[24px] mx-[-4px]">
            {STATUS.map((option) => (
              <a
                className={classNames(
                  "block px-[16px] py-[8px] text-[14px] font-medium main-text gray-bg rounded-[24px] m-[4px]",
                  option.value === tempFilter.status &&
                    "text-active bg-tab-active"
                )}
                key={option.value}
                onClick={() => {
                  setTempFilter((prev) => ({
                    ...prev,
                    status: option.value,
                  }));
                }}
              >
                {option.label}
              </a>
            ))}
          </div>

          <p className="text-[16px] font-medium main-text leading-[20px] mb-[16px]">
            Số chương
          </p>
          <div className="flex flex-wrap mb-[24px] mx-[-4px]">
            {CHAPTERS.map((option) => (
              <a
                className={classNames(
                  "block px-[16px] py-[8px] text-[14px] font-medium main-text gray-bg rounded-[24px] m-[4px]",
                  option.value === tempFilter.chapters &&
                    "text-active bg-tab-active"
                )}
                key={option.value}
                onClick={() => {
                  setTempFilter((prev) => ({
                    ...prev,
                    chapters: option.value,
                  }));
                }}
              >
                {option.label}
              </a>
            ))}
          </div>

          <a
            className="btnMain mt-[24px]"
            onClick={() => {
              setLast(undefined);
              Router.replace(
                `${route.pathname}${convertObjectToSearchParams({
                  theloai: route.query.categorySlug,
                  sort: filter.sort,
                  status: tempFilter.status,
                  chapters: tempFilter.chapters,
                })}`
              );
              setShowFilter(false);
            }}
          >
            Áp dụng
          </a>
        </ModalComponent>
      </div>
    </CommonLayout>
  );
};

export default observer(Stories);
