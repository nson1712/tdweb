import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import StoryStore from "../../stores/StoryStore";

import { Button, Image, List, Skeleton, Typography } from "antd";
import { DateTime } from "luxon";
import { ClockCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Router } from "next/router";
import UnderLineTitle from "../../components/UnderLineTitle/UnderLineTitle";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import { cleanHtml } from "../../utils/utils";

const Blog = () => {
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const size = 10;

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = (currentPage) => {
    const fetchUrl = `https://api.toidoc.com/data/post/list?size=${size}&page=${currentPage}`;

    setLoading(true);
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((res) => {
        if (initLoading) {
          setInitLoading(false);
          setData(res.data.data);
          setList(res.data.data);
        } else {
          const newData = data.concat(res.data.data);
          setData(newData);
          setList(newData);
        }
        setHasNext(res.data.hasNext);
      })
      .catch((err) => {
        console.error("Fetch data error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  const loadMore =
    !initLoading && !loading && hasNext ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button
          type="text"
          color="primary"
          variant="link"
          size="large"
          onClick={onLoadMore}
        >
          Xem Thêm
        </Button>
      </div>
    ) : null;

  return (
    <CommonLayout>
      <div className="">
        <Header selectedTab={"LIBRARY"} />
        <div className="relative pb-[100px] max-w-[768px] mx-auto bg-white pt-4 px-0 sm:mt-20 md:px-[8px] min-h-[100vh]">
          <UnderLineTitle title="Bài đăng mới nhất" />
          <List
            className="px-2"
            loading={initLoading}
            itemCommonLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <Skeleton title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={
                      <div className="w-36 sm:w-52 md:w-60">
                        <Link href={{
                          pathname: `blog/${item.slug}`,
                          query: {
                            id: item.id
                          }
                        }}>
                          <Image
                            preview={false}
                            className="rounded-lg"
                            src={item?.coverImage || ""}
                          />
                        </Link>
                      </div>
                    }
                    title={
                      <div className="line-clamp-2 text-md sm:text-base font-[500] sm:font-semibold hover:text-blue-600">
                        <Link href={{
                          pathname: `blog/${item.slug}`,
                          query: {
                            id: item.id
                          }
                        }}>
                          <div className="text-black cursor-pointer hover:text-blue-600">
                          {item.title}
                          </div>
                        </Link>
                      </div>
                    }
                    description={
                      <>
                        <div className="line-clamp-2 w-full text-slate-600">
                          {cleanHtml(item.shortDescription)}
                        </div>
                        <div>
                          <ClockCircleOutlined />{" "}
                          {DateTime.fromMillis(item.createdAt ?? 0).toFormat(
                            "dd/MM/yyyy HH:mm"
                          )}
                        </div>
                      </>
                    }
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </div>
    </CommonLayout>
  );
};

export default observer(Blog);
