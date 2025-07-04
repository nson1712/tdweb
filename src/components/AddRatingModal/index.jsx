import { Form, Input, Modal, Rate } from "antd";
import { toJS } from "mobx";
const { TextArea } = Input;

const AddRatingModal = ({ rating, open, onOk, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      width={700}
      open={open}
      okText="Gửi"
      cancelText="Hủy bỏ"
      okButtonProps={{
        form: "rating_form",
        autoFocus: true,
        htmlType: "submit",
      }}
      onOk={() => form.validateFields()}
      onCancel={onCancel}
      destroyOnHidden
      modalRender={(dom) => (
        <Form
          id="rating_form"
          layout="vertical"
          form={form}
          name="rating_form"
          initialValues={{
            rate: rating?.[0]?.rate ?? 0,
            message: rating?.[0]?.message ?? "",
          }}
          clearOnDestroy
          onFinish={(values) => onOk(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        name="rate"
        label="Đánh giá của bạn"
        rules={[
          { required: true, message: "Vui lòng chọn đánh giá" },
          {
            // Custom validator: require value > 0
            validator: (_, value) =>
              value > 0
                ? Promise.resolve()
                : Promise.reject(new Error("Bạn phải cho ít nhất 1 sao")),
          },
        ]}
      >
        <Rate allowHalf />
      </Form.Item>

      <Form.Item name="message" label={null}>
        <TextArea
          autoSize={{ minRows: 5, maxRows: 10 }}
          rules={[{ required: true, message: "Vui lòng nhập đánh giá" }]}
        />
      </Form.Item>
    </Modal>
  );
};
export default AddRatingModal;
