import { Avatar, Button, Form, Modal, Input, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import Comment from "../CommentItem";
import StoryStore from "../../stores/StoryStore";
import { SendOutlined } from "@ant-design/icons";
import {
  findMatchingSubstring,
  findRemainingSubstring,
} from "../../utils/utils";
import { toast } from "react-toastify";

const { TextArea } = Input;

export const CommentBox = ({
  open,
  onCancel,
  parentId,
  title,
  type,
  data,
  isLoggedIn,
  pageSize,
  handleOpenCommentModal,
  replyTo,
}) => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedChildItem, setSelectedChildItem] = useState();
  // const [expandedItems, setExpandedItems] = useState({});
  const ref = useRef(null);
  const commentRef = useRef({});
  const { setReplyTo } = StoryStore;

  useEffect(() => {
    if (open) {
      setPage(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const target = selectedItem || selectedChildItem || replyTo;
    if (target?.author) {
      form.setFieldsValue({ comment: `@${target.author?.name} ` });
      if (ref.current) ref.current.focus();
    }
  }, [open, replyTo, selectedItem, selectedChildItem]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight === scrollHeight && isLoggedIn) {
      if (page === StoryStore.comments.totalPages) return;
      const nextPage = page + 1;
      StoryStore.getComments(nextPage, pageSize, type, parentId);
      setPage(nextPage);
    }
  };

  const handleReset = () => {
    setSelectedItem(null);
    setSelectedChildItem(null);
    setReplyTo(null);
  };

  const handleSubmit = async (values) => {
    const name = findMatchingSubstring(
      values.comment,
      selectedItem?.author?.name ??
        selectedChildItem?.author?.name ??
        replyTo?.author?.name
    );
    const message = findRemainingSubstring(
      values.comment,
      selectedItem?.author?.name ??
        selectedChildItem?.author?.name ??
        replyTo?.author?.name
    );

    try {
       await StoryStore.saveComment({
        name: name,
        message: message,
        values: values,
        selectedItem: selectedItem,
        selectedChildItem: selectedChildItem,
        replyTo: replyTo,
        parentId: parentId,
        type: type,
      });
      form.resetFields();
      handleReset();

      await StoryStore.getComments(page, pageSize, type, parentId);

      onCancel()
      toast("Đăng bình luận thành công!", {
        type: "success",
        theme: "colored",
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  // const toggleExpand = (itemId) => {
  //   setExpandedItems((prev) => ({
  //     ...prev,
  //     [itemId]: !prev[itemId],
  //   }));
  // };

  return (
    <Modal
      className="sm:min-w-[650px] max-h-[700px]"
      open={open}
      onCancel={() => {
        onCancel?.();
        handleReset();
        form.resetFields();
        StoryStore.getComments(0, pageSize, type, parentId);
      }}
      footer={false}
      title={title}
    >
      <Form form={form} className="w-full" onFinish={handleSubmit}>
        <div className="max-h-[600px] overflow-y-auto" onScroll={handleScroll}>
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
                onReply={() => {
                  setSelectedItem(item);
                  setSelectedChildItem(null);
                }}
              >
                {item.children?.map((childItem, index) => {
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
                          onReply={() => handleOpenCommentModal(item)}
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
        </div>

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
