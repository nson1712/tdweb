import { useState } from "react";
import {
  Button,
  Collapse,
  ConfigProvider,
  Form,
  Image,
  Input,
  Typography,
} from "antd";
import { useDiamondPackages } from "../../../hook/useData";
import DepositDiamondIcon from "../../../../public/icons/DiamondDepositIcon";
import { useRouter } from "next/router";

const { Paragraph } = Typography;

const DefaultDeposit = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { ref } = router.query;
  const { diamondPackage } = useDiamondPackages();
  const [previewQr, setPreviewQr] = useState({ visible: false, qr: null });

  const onFinish = (values) => {
    window.open(
      `https://m.me/185169981351799?text=Mình vừa thanh toán qua chuyển khoản, Toidoc hỗ trợ mình nhé! %0A Mã khách hàng: ${
        ref || values.referralCode
      }`
    );
  };
  return (
    <div>
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
              key: "by-default",
              label: (
                <div className="flex gap-x-4">
                  <DepositDiamondIcon />
                  <div>
                    <div className="text-base font-semibold">
                      Nạp kim cương thủ công
                    </div>
                    <div className="text-slate-500 text-xs sm:text-sm line-clamp-1">
                      Chuyển khoản thủ công, cần chờ admin duyệt..
                    </div>
                  </div>
                </div>
              ),
              children: (
                <div className="space-y-2">
                  <div className="text-lg font-bold">
                    Hướng dẫn nạp kim cương:{" "}
                  </div>
                  <div className="text-base">
                    <span className="font-bold">Cách 1:</span> Chọn gói kim
                    cương bạn muốn nạp, mã QR tương ứng sẽ hiện ra để bạn chuyển
                    khoản
                  </div>

                  <p className="text-base font-medium">
                    <p>
                      <span className="font-bold">Cách 2:</span> Chuyển khoản
                      trực tiếp vào tài khoản sau:
                    </p>
                    <div className="font-bold">Techcombank - DO THANH LINH</div>
                    <div className="font-bold flex gap-x-1">
                      STK:{" "}
                      <Paragraph
                        className="text-base self-center"
                        copyable={true}
                      >
                        281194190999
                      </Paragraph>
                    </div>
                  </p>

                  <Form
                    form={form}
                    onFinish={onFinish}
                    scrollToFirstError={{ behavior: "smooth", block: "center" }}
                  >
                    <p className="text-base font-medium">
                      Sau khi chuyển khoản thành công, vui lòng chụp lại màn
                      hình thanh toán rồi gửi cho Admin xác nhận{" "}
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
                  </Form>

                  <div className="mt-4 space-y-2">
                    {diamondPackage.map((item, index) => (
                      <div key={index}>
                        <div
                          class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer transition duration-300"
                          onClick={() =>
                            setPreviewQr({ visible: true, qr: item.qr })
                          }
                        >
                          {item.label}
                        </div>
                        {previewQr.qr && (
                          <Image
                            className="hidden"
                            preview={{
                              visible: previewQr.visible,
                              src: previewQr.qr.src,
                              onVisibleChange: (vis) =>
                                setPreviewQr({ visible: vis, qr: null }),
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
          ]}
        />
      </ConfigProvider>
    </div>
  );
};

export default DefaultDeposit;
