import { useState } from "react";
import { Collapse, ConfigProvider, Image, Typography } from "antd";
import { useDiamondPackages } from "../../../hook/useData";
import DepositDiamondIcon from "../../../../public/icons/DiamondDepositIcon";

const { Paragraph } = Typography;

const DefaultDeposit = () => {
  const { diamondPackage } = useDiamondPackages();
  const [previewQr, setPreviewQr] = useState({ visible: false, qr: null });
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

                  <p className="text-base font-medium">
                    Sau khi chuyển khoản thành công, vui lòng chụp lại màn hình
                    thanh toán rồi gửi cho Admin xác nhận{" "}
                    <a
                      className="text-lg text-blue-500 hover:!text-blue-600"
                      href="https://m.me/185169981351799"
                      target="_blank"
                    >
                      TẠI ĐÂY
                    </a>
                  </p>

                  <div className="mt-4 space-y-2">
                    {diamondPackage.map((item, index) => (
                      <>
                        <div
                          key={index}
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
                      </>
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
