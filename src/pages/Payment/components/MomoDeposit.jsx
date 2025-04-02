import { Collapse, ConfigProvider, Image } from "antd";
import MomoIcon from "../../../../public/icons/MomoIcon";

const MomoDeposit = () => {
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
                    Nạp kim cương qua Momo
                  </div>
                  <div className="text-slate-500 text-xs sm:text-sm line-clamp-1">
                    Chuyển khoản thủ công, cần chờ admin duyệt..
                  </div>
                </div>
              </div>
            ),
            children: (
              <div className="space-y-4">
                <p className="text-lg font-bold">Hướng dẫn nạp kim cương: </p>
                <p className="text-base">
                  <span className="font-bold">Bước 1: </span>Mở App Momo, chọn
                  quét QR
                </p>

                <Image
                  src="images/momo-step1.jpg"
                  className="mt-4"
                  alt="momo-step1"
                />

                <p className="text-base">
                  <span className="font-bold">Bước 2: </span>Quét mã QR bên dưới
                  để thanh toán
                </p>

                <Image
                  className="mt-4"
                  src="images/momo-qr.jpg"
                  alt="momo-qr"
                />

                <p className="text-base font-medium">
                  <span className="font-bold">Bước 3: </span>Sau khi thanh toán
                  thành công, vui lòng chụp lại màn hình thanh toán rồi gửi cho
                  Admin xác nhận{" "}
                  <a
                    className="text-lg text-blue-500 hover:!text-blue-600"
                    href="https://m.me/185169981351799"
                    target="_blank"
                  >
                    TẠI ĐÂY
                  </a>
                </p>
              </div>
            ),
          },
        ]}
      />
    </ConfigProvider>
  );
};

export default MomoDeposit;
