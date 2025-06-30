import { Avatar, Button, Form, Modal, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import Comment from "../CommentItem";
import StoryStore from "../../stores/StoryStore";

export const CommentBox = ({
  open,
  onCancel,
  parentId,
  title,
  type,
  data,
  isLoggedIn,
  pageSize,
}) => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(0);
  // const [selectedItem, setSelectedItem] = useState();
  // const [selectedChildItem, setSelectedChildItem] = useState();
  const [expandedItems, setExpandedItems] = useState({});
  const ref = useRef(null);
  const commentRef = useRef({});

  useEffect(() => {
    if (open) {
      setPage(0);
    }
  }, [open]);

  console.log(
    "StoryStore.modalComments.totalPages: ",
    StoryStore.modalComments.totalPages
  );
  console.log(" PAGE: ", page);

  // Hàm gọi khi scroll đến cuối
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    console.log("SCROLL TOP: ", scrollTop);
    console.log("SCROLL HEIGHT: ", scrollHeight);
    console.log("CLIENT HEIGHT: ", clientHeight);
    if (scrollTop + clientHeight === scrollHeight && isLoggedIn) {
      if (page === StoryStore.modalComments.totalPages) return;
      const nextPage = page + 1;
      StoryStore.getComments(nextPage, pageSize, parentId, true, true);
      setPage(nextPage);
    }
  };

  // const { data: dataList, refetch: dataRefetch } = useCustom({
  //   method: "get",
  //   url: `${DATA_API_URL}/api/mobile/comment/list`,
  //   config: {
  //     query: {
  //       parentId: parentId,
  //       size: 100,
  //     },
  //   },
  // });

  // useEffect(() => {
  //   if (selectedItem || selectedChildItem) {
  //     form.setFieldsValue({
  //       comment: `@${
  //         selectedItem?.author?.name ?? selectedChildItem?.author?.name
  //       }${" "}`,
  //     });
  //     if (ref.current) {
  //       ref.current.focus();
  //     }
  //   }
  // }, [selectedItem, selectedChildItem]);

  // const handleSubmit = (values) => {
  //   const name = findMatchingSubstring(
  //     values.comment,
  //     selectedItem?.author?.name ?? selectedChildItem?.author?.name
  //   );
  //   const message = findRemainingSubstring(
  //     values.comment,
  //     selectedItem?.author?.name ?? selectedChildItem?.author?.name
  //   );

  //   mutate(
  //     {
  //       method: "post",
  //       url: `${DATA_API_URL}/api/mobile/comment/add`,
  //       values: {
  //         message:
  //           values.comment &&
  //           values.comment.includes("@", 0) &&
  //           (selectedItem || selectedChildItem)
  //             ? `@[${name}](${
  //                 selectedItem?.author?.obfuscatedId ?? selectedChildItem?.author?.obfuscatedId
  //               }) ${message}`
  //             : values.comment,
  //         parentId:
  //           selectedItem?.id ?? selectedChildItem?.parentId ?? parentId ?? "",
  //         type:
  //           type === "COMMENT"
  //             ? "COMMENT"
  //             : type === "CHAPTER"
  //             ? selectedItem || selectedChildItem
  //               ? "COMMENT"
  //               : "CHAPTER"
  //             : selectedItem || selectedChildItem
  //             ? "COMMENT"
  //             : "RATING",
  //       },
  //     },
  //     {
  //       onSuccess(response) {
  //         dataRefetch();
  //         setSelectedItem(null);
  //         setSelectedChildItem(null);
  //         notification.success({
  //           message: `Bạn vừa ${
  //             selectedItem || selectedChildItem ? "trả lời" : "đăng"
  //           } 1 ${type === "RATING" ? "đánh giá" : "bình luận"}!`,
  //         });
  //         form.resetFields();
  //         setExpandedItems((prev) => ({
  //           ...prev,
  //           [response.data.data.parentId || parentId]: true,
  //         }));

  //         const commentId = selectedItem?.id ?? selectedChildItem?.parentId;
  //         if (commentId && commentRef.current[commentId]) {
  //           commentRef.current[commentId].scrollIntoView({
  //             behavior: "smooth",
  //             block: "start",
  //           });
  //         }
  //       },
  //     }
  //   );
  // };

  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <Modal
      className="sm:min-w-[650px] max-h-[500px]"
      open={open}
      onCancel={() => {
        onCancel?.();
        // setSelectedItem(null);
        // setSelectedChildItem(null);
        form.resetFields();
      }}
      footer={false}
      title={title}
    >
      {/* <Form form={form} onFinish={handleSubmit} className="w-full"> */}
      <Form
        form={form}
        className="w-full max-h-[700px] overflow-y-auto"
        onScroll={handleScroll}
      >
        {data?.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) {
                commentRef.current[item.id] = el;
              }
            }}
          >
            <Comment
              key={item?.id}
              author={item.author?.name}
              avatar={item.author?.avatar}
              content={item?.message}
              timestamp={item?.createdAt}
              totalLike={item?.totalLike}
              // onReply={() => {
              //   setSelectedChildItem(null);
              //   setSelectedItem(item);
              // }}
            >
              {item.children?.slice(0, 2).map((childItem, index) => {
                const hasMoreChildren = item.childItem?.length > 2;
                return (
                  <div key={childItem.id}>
                    <Comment
                      author={childItem.author?.name}
                      avatar={childItem.author?.avatar}
                      content={childItem?.message}
                      timestamp={childItem?.createdAt}
                      totalLike={childItem?.totalLike}
                      onReply={() => {
                        setSelectedItem(null);
                        setSelectedChildItem(childItem);
                      }}
                    />
                    {index === 1 && hasMoreChildren && (
                      <Button
                        type="text"
                        size="small"
                        className="text-blue-500 ml-8"
                        onClick={handleOpenCommentModal}
                      >
                        Xem thêm {item.children.length - 2} bình luận
                      </Button>
                    )}
                  </div>
                );
              })}
            </Comment>
          </div>
        ))}

        {/* <div className="flex gap-2 mt-5">
          <div className="w-full">
            <Form.Item name={["comment"]}>
              <TextArea
                ref={ref}
                placeholder="Nhập bình luận"
                autoSize
                style={{ borderRadius: "16px" }}
              />
            </Form.Item>
          </div>
          <div className="self-center">
            <Form.Item>
              <Button htmlType="submit" icon={<SendOutlined />} />
            </Form.Item>
          </div>
        </div> */}
      </Form>
    </Modal>
  );
};
