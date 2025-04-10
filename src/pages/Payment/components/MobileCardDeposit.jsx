import { Button, Collapse, ConfigProvider, Form, Input, Select } from "antd";
import ViettelIcon from "../../../../public/icons/ViettelIcon";
import { useMobileCardPackages } from "../../../hook/useData";

const MobileCardDeposit = ({ referralCode }) => {
  const [form] = Form.useForm();
  const { cardAmount, networkProvider } = useMobileCardPackages();

  const onCardFinish = (values) => {
    window.open(
      `https://m.me/185169981351799?text=Mình muốn nạp kim cương bằng thẻ điện thoại, Toidoc hỗ trợ mình nhé! %0A Mã KH: ${
        referralCode || values.referralCode
      } %0A Loại thẻ: ${
        values.networkProvider
      } %0A Mệnh giá thẻ: ${values.cardAmount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}VNĐ %0A Số thẻ: ${values.code}`
    );
    form.resetFields();
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            headerBg: "transparent",
          },
        },
      }}
    >
      <Collapse
        expandIcon={() => null}
        items={[
          {
            key: "by-card",
            label: (
              <div className="flex justify-between gap-x-4">
                <div className="flex gap-x-4">
                  <ViettelIcon />
                  <div>
                    <div className="text-base font-semibold">
                      Nạp qua thẻ điện thoại
                    </div>
                    <div className="text-slate-500 sm:text-sm line-clamp-1 text-xs">
                      Chỉ nhận được 70% giá trị thẻ, cần chờ admin duyệt 5 - 10 phút
                    </div>
                  </div>
                </div>
              </div>
            ),
            children: (
              <>
                <p className="italic text-red-500 font-bold text-sm sm:text-base">
                  Lưu ý: Hiện tại Toidoc chỉ hỗ trợ nạp bằng thẻ Viettel. Số kim cương
                  bạn nhận được sẽ = 70% giá trị của thẻ!
                </p>
                <Form form={form} onFinish={onCardFinish}>
                  {!referralCode && (
                    <Form.Item
                      name="referralCode"
                      label="Mã khách hàng"
                      rules={[
                        {
                          message: "Vui lòng nhập mã khách hàng!",
                          required: true,
                        },
                      ]}
                    >
                      <Input placeholder="Nhập mã khách hàng" />
                    </Form.Item>
                  )}

                  <Form.Item
                    name="networkProvider"
                    label="Nhà mạng"
                    rules={[
                      {
                        message: "Vui lòng chọn nhà mạng!",
                        required: true,
                      },
                    ]}
                    initialValue="viettel"
                  >
                    <Select
                      initialValues="viettel"
                      placeholder="Chọn nhà mạng"
                      allowClear
                      options={networkProvider}
                    />
                  </Form.Item>

                  <Form.Item
                    name="cardAmount"
                    label="Mệnh giá thẻ"
                    rules={[
                      {
                        message: "Vui lòng chọn mệnh giá thẻ!",
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn mệnh giá"
                      allowClear
                      options={cardAmount}
                    />
                  </Form.Item>

                  <Form.Item
                    name="code"
                    label="Mã thẻ cào"
                    rules={[
                      {
                        message: "Vui lòng nhập mã thẻ cào!",
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Nhập mã thẻ cào (Sau lớp tráng bạc)" />
                  </Form.Item>

                  <Form.Item label={null}>
                    <Button
                      className="w-full"
                      size="large"
                      type="primary"
                      htmlType="submit"
                    >
                      Gửi thông tin cho Toidoc
                    </Button>
                  </Form.Item>
                </Form>
              </>
            ),
          },
        ]}
      />
    </ConfigProvider>
  );
};

export default MobileCardDeposit;
