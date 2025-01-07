import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import StoryStore from "../../stores/StoryStore";

import { Button, Image, List, Skeleton } from "antd";
import { DateTime } from "luxon";
import { ClockCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

let timeout;
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
    const fetchUrl = `https://uatapi.truyenso1.xyz/data/admin/posts?size=${size}&page=${currentPage}`;

    setLoading(true);
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((res) => {
        console.log("RES: ", res);
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

  console.log("LIST: ", list);

  return (
    <CommonLayout>
      <div className="relative">
        <div className="hidden md:block">
          <Header selectedTab={"HOME"} />
        </div>

        <div className="relative pb-[100px] max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] px-0 md:px-[8px] min-h-[100vh] flex flex-col justify-center">
          <List
            className="demo-loadmore-list px-2"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <Skeleton title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={
                      <img
                        className="rounded-lg max-h-[85px] min-w-[110px] md:w-[200px]"
                        src="https://media.toidoc.vn/story-coverxe-my-thuc-di-dong-cua-nu-phao-hoi-tai-mat-the,xe-my-thuc-di-dong-cua-nu-phao-hoi-tai-mat-the-1706943626040.jpg"
                      />
                    }
                    title={
                      <Link
                        className="text-base font-semibold pr-2 line-clamp-2"
                        href={`blog/${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    }
                    description={
                      <>
                        <div className="line-clamp-2 w-full text-slate-600">
                          {item.shortDescription}
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
