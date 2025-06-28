import { Avatar, Button, Form, Modal, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import {
  getContentInsideBrackets,
  getContentAfterParenthesis,
  calculateCreateTime,
  findMatchingSubstring,
  findRemainingSubstring,
} from "@/utilities/common";
import TextArea from "antd/es/input/TextArea";
import Comment from "../CommentItem";

export const CommentBox = ({
  open,
  onCancel,
  parentId,
  title,
  type,
}) => {
  const [form] = Form.useForm();
  const { mutate } = useCustomMutation();
  const [selectedItem, setSelectedItem] = useState();
  const [selectedChildItem, setSelectedChildItem] = useState();
  const [expandedItems, setExpandedItems] = useState({});
  const ref = useRef(null);
  const commentRef = useRef({});

  const { data: dataList, refetch: dataRefetch } = useCustom({
    method: "get",
    url: `${DATA_API_URL}/api/mobile/comment/list`,
    config: {
      query: {
        parentId: parentId,
        size: 100,
      },
    },
  });

  useEffect(() => {
    if (selectedItem || selectedChildItem) {
      form.setFieldsValue({
        comment: `@${
          selectedItem?.author?.name ?? selectedChildItem?.author?.name
        }${" "}`,
      });
      if (ref.current) {
        ref.current.focus();
      }
    }
  }, [selectedItem, selectedChildItem]);

  const handleSubmit = (values) => {
    const name = findMatchingSubstring(
      values.comment,
      selectedItem?.author?.name ?? selectedChildItem?.author?.name
    );
    const message = findRemainingSubstring(
      values.comment,
      selectedItem?.author?.name ?? selectedChildItem?.author?.name
    );

    mutate(
      {
        method: "post",
        url: `${DATA_API_URL}/api/mobile/comment/add`,
        values: {
          message:
            values.comment &&
            values.comment.includes("@", 0) &&
            (selectedItem || selectedChildItem)
              ? `@[${name}](${
                  selectedItem?.author?.obfuscatedId ?? selectedChildItem?.author?.obfuscatedId
                }) ${message}`
              : values.comment,
          parentId:
            selectedItem?.id ?? selectedChildItem?.parentId ?? parentId ?? "",
          type:
            type === "COMMENT"
              ? "COMMENT"
              : type === "CHAPTER"
              ? selectedItem || selectedChildItem
                ? "COMMENT"
                : "CHAPTER"
              : selectedItem || selectedChildItem
              ? "COMMENT"
              : "RATING",
        },
      },
      {
        onSuccess(response) {
          dataRefetch();
          setSelectedItem(null);
          setSelectedChildItem(null);
          notification.success({
            message: `Bạn vừa ${
              selectedItem || selectedChildItem ? "trả lời" : "đăng"
            } 1 ${type === "RATING" ? "đánh giá" : "bình luận"}!`,
          });
          form.resetFields();
          setExpandedItems((prev) => ({
            ...prev,
            [response.data.data.parentId || parentId]: true,
          }));

          const commentId = selectedItem?.id ?? selectedChildItem?.parentId;
          if (commentId && commentRef.current[commentId]) {
            commentRef.current[commentId].scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        },
      }
    );
  };

  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <Modal
      className="sm:min-w-[650px]"
      open={open}
      onCancel={() => {
        onCancel?.();
        setSelectedItem(null);
        setSelectedChildItem(null);
        form.resetFields();
      }}
      footer={false}
      title={title}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        className="w-full"
      >
        {dataList?.data.data.data.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) {
                commentRef.current[item.id] = el;
              }
            }}
          >
            <Comment
              author={item.author?.name}
              avatar={item.author?.avatar}
              content={
                item.message.includes("@", 0) ? (
                  <Paragraph>
                    <span className="text-branding">
                      @{getContentInsideBrackets(item.message)}{" "}
                    </span>
                    {getContentAfterParenthesis(item.message)}
                  </Paragraph>
                ) : (
                  <div>{item.message}</div>
                )
              }
              timestamp={item.createdAt}
              onReply={() => {
                setSelectedChildItem(null);
                setSelectedItem(item);
              }}
            >
              {expandedItems[item.id] &&
                item.children.map((childItem, index) => (
                  <Comment
                    key={index}
                    author={childItem.author?.name}
                    avatar={childItem.author?.avatar}
                    content={
                      <Paragraph>
                        <span className="text-branding">
                          @{getContentInsideBrackets(childItem.message)}{" "}
                        </span>
                        {getContentAfterParenthesis(childItem.message)}
                      </Paragraph>
                    }
                    timestamp={childItem.createdAt}
                    onReply={() => {
                      setSelectedItem(null);
                      setSelectedChildItem(childItem);
                    }}
                  />
                ))}
              {item.children.length !== 0 && (
                <Button
                  type="text"
                  size="small"
                  className="text-branding"
                  onClick={() => {
                    toggleExpand(item.id);
                  }}
                >
                  {expandedItems[item.id]
                    ? "Ẩn bớt"
                    : `Xem thêm ${item.children.length} bình luận`}
                </Button>
              )}
            </Comment>
          </div>
        ))}

        <div className="flex gap-2 mt-5">
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
        </div>
      </Form>
    </Modal>
  );
};
