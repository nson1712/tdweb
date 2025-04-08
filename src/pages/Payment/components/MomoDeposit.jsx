import { Button, Collapse, ConfigProvider, Form, Image, Input } from "antd";
import MomoIcon from "../../../../public/icons/MomoIcon";
import { useRouter } from "next/router";

const MomoDeposit = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { ref } = router.query;

  const onFinish = (values) => {
    window.open(
      `https://m.me/185169981351799?text=Mình vừa thanh toán qua Momo, Toidoc hỗ trợ mình nhé! %0A Mã khách hàng: ${
        ref || values.referralCode
      }`
    );
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
            key: "by-momo",
            label: (
              <div className="flex gap-x-4">
                <MomoIcon />
                <div>
                  <div className="text-base font-semibold">
                    Nạp qua Momo
                  </div>
                  <div className="text-slate-500 text-xs sm:text-sm line-clamp-1">
                    Chuyển khoản thủ công, cần chờ admin duyệt 5 - 10 phút
                  </div>
                </div>
              </div>
            ),
            children: (
              <Form
                form={form}
                onFinish={onFinish}
                scrollToFirstError={{ behavior: "smooth", block: "center" }}
              >
                <div className="space-y-4">
                  <p className="text-lg font-bold">Hướng dẫn nạp kim cương: </p>
                  <p className="text-base">
                    <span className="font-bold">Bước 1: </span>Mở App ngân hàng
                    bất kỳ, chọn biểu tượng quét QR tương tự như trong ảnh
                  </p>

                  <Image
                    src="images/momo-step1.jpg"
                    className="mt-4"
                    alt="momo-step1"
                  />

                  <p className="text-base">
                    <span className="font-bold">Bước 2: </span>Quét mã QR bên
                    dưới để thanh toán
                  </p>

                  <Image
                    className="mt-4"
                    src="images/momo-qr.jpg"
                    alt="momo-qr"
                  />

                  <p className="text-base font-medium">
                    <span className="font-bold">Bước 3: </span>Sau khi thanh
                    toán thành công, vui lòng chụp lại màn hình thanh toán rồi
                    gửi cho Admin xác nhận
                    <Form.Item noStyle label={null}>
                      <Button
                        className="text-lg font-bold text-blue-500 hover:!text-blue-600 hover:!bg-transparent px-1"
                        type="text"
                        htmlType="submit"
                      >
                        TẠI ĐÂY
                      </Button>
                    </Form.Item>
                  </p>
                  {!ref && (
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
                </div>
              </Form>
            ),
          },
        ]}
      />
    </ConfigProvider>
  );
};

export default MomoDeposit;
