import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import StoryStore from "../../stores/StoryStore";

import { Button, Image, List, Skeleton, Typography } from "antd";
import { DateTime } from "luxon";
import { ClockCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Router } from "next/router";
// import Title from "antd/es/typography/Title";

const { Title } = Typography

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
        <div className="block md:block">
          <Header selectedTab={"HOME"} />
        </div>

        <div className="relative pb-[100px] max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] px-0 md:px-[8px] min-h-[100vh] flex flex-col justify-center">
          <div className="w-fit ">
          {/* <Title level={3}>Bài viết mới nhất</Title> */}
          <div className="text-xl font-[600] sm:text-2xl">Bài viết mới nhất</div>
          <span className="mt-[5px] block w-[70%] border-b-[3px] border-red-500"></span>
          </div>
          <div className=""></div>
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
                      <div className="w-36 sm:w-52 md:w-60">
                        <Link href={`blog/${item.slug}`}>
                        <Image
                        preview={false}
                        className="rounded-lg"
                        src="https://cdn-media.sforum.vn/storage/app/media/haianh/nintendo-switch-2-thong-tin-moi-1.jpg"
                      />
                      </Link>
                      </div>
                    }
                    title={
                      <div className="line-clamp-2 text-md sm:text-base font-[500] sm:font-semibold">
                        <a
                        className="text-black"
                        href={`blog/${item.slug}`}
                      >
                        {item.title}
                      </a>
                      </div>
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
