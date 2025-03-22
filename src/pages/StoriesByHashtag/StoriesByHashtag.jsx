import React, { useEffect, useMemo, useState } from "react";
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
import HotStories from "../../components/HotStories";

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

const StoriesByHashtag = () => {
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

  const [pageSize, setPageSize] = useState(40);
  const [last, setLast] = useState();

  const {
    storiesByHashtag,
    getStoriesByHashtag,
  } = StoryStore;

  useEffect(() => {
      getStoriesByHashtag(page, pageSize, route.query.hashtag);
  }, [route.query, page, pageSize]);


  const title = useMemo(() => {
    if (route.query.hashtag) return `# ${route.query.hashtag}`;
  }, [route.query]);

  const onShowSizeChange = (_, pageSize) => {
    setPageSize(pageSize);
  };

  const onPageChange = (page) => {
    setPage(page - 1);
  };

  return (
    <CommonLayout>
      <div>        <div className="hidden md:block">
          <Header />
        </div>

        <div className="max-w-[768px] mx-[auto] md:pt-[80px] md:bg-white py-16">
          <div className="flex items-center justify-between fixed md:static top-0 left-0 right-0 bg-white z-50">
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

            <div className="flex justify-center px-2 md:px-0 pt-6 md:pt-0">
            <HotStories className="grid grid-cols-4 sm:grid-cols-5 self-center items-center gap-x-4 gap-y-6" data={storiesByHashtag?.data} />
            </div>

            <div className="w-full flex justify-center mt-4">
              <Pagination
                defaultCurrent={1}
                pageSizeOptions={[
                  "10",
                  "20",
                  "40",
                  "100",
                ]}
                defaultPageSize={40}
                showSizeChanger
                showQuickJumper
                onShowSizeChange={onShowSizeChange}
                onChange={onPageChange}
                locale={{
                  jump_to: "Đi tới",
                  page: "Trang",
                  items_per_page: "/ Trang",
                }}
                total={storiesByHashtag?.totalElements}
              />
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

export default observer(StoriesByHashtag);
