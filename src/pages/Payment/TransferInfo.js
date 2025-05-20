import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { observer } from "mobx-react";
import Router, { useRouter } from "next/router";
import HeaderPayment from "./HeaderPayment";
import Image from "next/image";
import { QRCode } from "react-qrcode-logo";
import { formatStringToNumber, getQrUrl } from "../../utils/utils";
import Button from "../../components/Button/Button";
import { Alert } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import imageLoader from "../../loader/imageLoader";
import ModalComponent from "../../components/Modal/Modal";

const TransferInfo = () => {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [copiedAccountMessage, setCopiedAccountMessage] = useState("");
  const [copiedAmountMessage, setCopiedAmountMessage] = useState("");
  const [copiedDescriptionMessage, setCopiedDescriptionMessage] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [showDepositSuccessWarning, setShowDepositSuccessWarning] =
    useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const router = useRouter();
  const qrRef = useRef(null);
  const counter = useRef(0);
  const orderCode = useRef("");
  const paymentId = useRef("");
  const storySlug = useRef("");
  const chapterSlug = useRef("");

  useEffect(() => {
    if (router.query.qrCode && router.query.qrCode !== "") {
      const dateTimeStr = router.query.expiredAt;
      console.log("expiredAt: ", dateTimeStr);
      const reverseDateTime =
        dateTimeStr === "" ? new Date() : new Date(dateTimeStr);
      console.log("reverseDateTime: ", reverseDateTime);
      const now = new Date();
      const duration = reverseDateTime - now;
      console.log("duration:", duration);
      const remainTime = Math.floor(duration / 1000);
      setTimeLeft(remainTime);
      counter.current = remainTime;

      setAccountName(router.query.accountName || "");
      setAccountNumber(router.query.accountNumber || "");
      setAmount(router.query.amount || "");
      setDescription(router.query.description || "");
      setQrCode(router.query.qrCode || "");
      orderCode.current = router.query.order || "";
      paymentId.current = router.query.paymentId || "";
      storySlug.current = router.query.story || "";
      chapterSlug.current = router.query.chapter || "";
    } else {
      if (router.query.amount) {
        setQrUrl(getQrUrl(router.query.amount));
      }
      setAccountName(router.query.accountName || "");
      setAccountNumber(router.query.accountNumber || "");
      setAmount(router.query.amount || "");
      setDescription(router.query.description || "");
      storySlug.current = router.query.story || "";
      chapterSlug.current = router.query.chapter || "";
    }
  }, [
    router.query.accountName,
    router.query.accountNumber,
    router.query.amount,
    router.query.description,
    router.query.qrCode,
    router.query.expiredAt,
  ]);

  useEffect(() => {
    // Chạy mỗi giây
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      counter.current = counter.current > 0 ? counter.current - 1 : 0;
      if (counter.current % 5 === 0 && counter.current > 0) {
        validatePaymentResult();
      }
    }, 1000);

    if (router.query.qrCode && router.query.qrCode !== "") {
      // Cleanup khi component bị unmount
      return () => clearInterval(timer);
    }
  }, []);

  // Hàm để chuyển đổi giây sang phút và giây
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes} phút:${seconds < 10 ? `0${seconds}` : seconds} giây`;
  };

  const validatePaymentResult = async () => {
    try {
      if (orderCode.current && orderCode.current !== "") {
        const data = {
          orderCode: orderCode.current,
          paymentLinkId: paymentId.current,
        };
        const result = await axios.post(
          `https://fsdfssf.truyenso1.xyz/customer/public/customer/deposit/qr/result`,
          data
        );
        console.log("result QR Deposit: ", result);
        if (result?.data?.data?.code === 200) {
          if (storySlug.current !== "") {
            toast(`Nạp kim cương thành công!`, {
              type: "success",
              theme: "colored",
            });
            if (chapterSlug.current !== "") {
              Router.push(`/${storySlug.current}/${chapterSlug.current}`);
            } else {
              Router.push(`/${storySlug.current}`);
            }
          } else {
            Router.push("/nap-kim-cuong/success");
          }
        } else if (result?.data?.data?.code !== 201) {
          Router.push("/nap-kim-cuong/failed");
        }
      }
    } catch (e) {
      // Router.push("/nap-kim-cuong/failed");
    }
  };

  const handleDownload = async () => {
    qrRef.current?.download("image/jpg", "ma-qr-chuyen-khoan");
  };

  const copyToClipboard = (code) => {
    let text = "";
    switch (code) {
      case "accountNumber":
        text = accountNumber;
        break;
      case "amount":
        text = amount;
        break;
      case "description":
        text = description;
        break;
      default:
        text = "";
    }
    navigator.clipboard.writeText(text).then(
      () => {
        if (code === "accountNumber") {
          setCopiedAccountMessage("Đã copy! ");
        } else if (code === "amount") {
          setCopiedAmountMessage("Đã copy! ");
        } else if (code === "description") {
          setCopiedDescriptionMessage("Đã copy! ");
        }
      },
      () => {
        if (code === "accountNumber") {
          setCopiedAccountMessage("Copy lỗi");
        } else if (code === "amount") {
          setCopiedAmountMessage("Copy lỗi");
        } else if (code === "description") {
          setCopiedDescriptionMessage("Copy lỗi");
        }
      }
    );
  };

  const handleOKWarningDepositSuccess = async () => {
    setShowDepositSuccessWarning(false);
    window.open(
      `https://m.me/185169981351799?text=${
        router.query.referralCode
          ? "Mã KH của mình là: " + router.query.referralCode + ". "
          : ""
      }Mình vừa chuyển khoản thành công qua web, nạp kim cương giúp mình với.`,
      "_blank"
    );
    if (storySlug.current !== "undefined" && storySlug.current !== "") {
      if (chapterSlug.current !== "") {
        Router.push(`/${storySlug.current}/${chapterSlug.current}`);
      } else {
        Router.push(`/${storySlug.current}`);
      }
    }
  };

  return (
    <>
      <div className="relative max-w-[768px] mx-auto bg-white md:pt-[88px] flex flex-col justify-center text-second-color">
        <HeaderPayment />
        {timeLeft <= 0 && router.query.qrCode && router.query.qrCode !== "" ? (
          <div style={{ marginTop: "20%" }}>
            <img
              src={"/images/expired_at.png"}
              className="w-[200px] imgCenter"
            />
            <p className="text-[20px] font-bold main-text text-center mt-[20px] mb-[5px]">
              Thông Tin Chuyển Khoản Đã Hết
              <br />
              Hiệu Lực.
            </p>
            <p className="text-[16px] main-text text-center">
              <i>(Vui lòng bấm vào nút bên dưới để tạo mới.)</i>
            </p>
            <Button
              className="btnMain btnSecond max-w-[300px] mx-auto mt-[20px]"
              onClick={(e) => {
                Router.push("/nap-kim-cuong");
              }}
            >
              Nạp gói kim cương khác
            </Button>
            <Button
              className="btnSecond-Second max-w-[300px] mx-auto"
              onClick={(e) => {
                window.open(
                  `https://m.me/185169981351799?text=Mình nạp qua web với nội dung ${description} không được. Hỗ trợ giúp mình với.`
                );
              }}
            >
              Liên hệ hỗ trợ
            </Button>
          </div>
        ) : (
          <>
            <p className="text-[20px] font-bold main-text text-center mb-[0px]">
              Thông Tin Chuyển Khoản
            </p>
            {qrCode && qrCode !== "" && (
              <p
                className="text-[16px] main-text text-center"
                dangerouslySetInnerHTML={{
                  __html: `Sẽ hết hạn sau <strong>${formatTime(
                    timeLeft
                  )}</strong> nữa`,
                }}
              />
            )}
            <div className="pl-[20px] pr-[20px] mb-[30px]">
              <p className="text-[14px] font-bold mb-[0px]">
                Hãy ấn nút Copy thông tin chuyển khoản bên dưới
              </p>
              {qrCode && qrCode !== "" && (
                <Alert
                  message="Lưu ý: chỉ khi copy đúng các thông tin, thì kim cương mới tự động về tài khoản của bạn."
                  showIcon
                  type="warning"
                />
              )}
              <div className="text-xs box-transfer-info pt-[10px]">
                <div>
                  <div className="m-2 flex">
                    <div className="mr-3 flex justify-center">
                      <img
                        loading="lazy"
                        width="50"
                        height="30"
                        decoding="async"
                        data-nimg="1"
                        className="rounded-full m-auto self-center"
                        style={{
                          color: "transparent",
                          "background-color": "#fff",
                          padding: "5px",
                        }}
                        src="https://img.bankhub.dev/OCB.png"
                      />
                    </div>
                    <div>
                      <p className="lh-1 text-lg text-[#fff] mb-[5px]">
                        Ngân hàng thụ hưởng
                      </p>
                      <p className="font-bold text-sm text-[#00e60e]">
                        Ngân hàng Phương Đông OCB
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-7 m-2">
                    <div className="col-span-5 text-left">
                      <p className="lh-1 text-lg text-[#fff] mb-[5px]">
                        1. Chủ tài khoản:
                      </p>
                      <p className="font-bold text-sm text-[#00e60e]">
                        {accountName}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-7 m-2">
                    <div className="col-span-5 text-left">
                      <p className="lh-1 text-lg text-[#fff] mb-[5px]">
                        2. Ấn sao chép lấy số tài khoản{" "}
                        <span className="text-[#feb313] text-sm">
                          <strong>
                            <i>(Nhớ copy cả mã CAS)</i>
                          </strong>
                        </span>
                        :
                      </p>
                      <p className="font-bold text-sm text-[#00e60e]">
                        {accountNumber}
                      </p>
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end">
                      <button
                        className="h-fit p-2 text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-md text-xs sm:text-sm text-center shadow-2xl hover:!text-black cursor-pointer"
                        onClick={() => copyToClipboard("accountNumber")}
                      >
                        {copiedAccountMessage || "Sao chép "}
                        <CopyOutlined />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-7 m-2">
                    <div className="col-span-5 text-left">
                      <p className="lh-1 text-lg text-[#fff] mb-[5px]">
                        3. Số tiền:
                      </p>
                      <p className="font-bold text-[#00e60e] text-sm">
                        {formatStringToNumber(amount)}VNĐ
                      </p>
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end">
                      <button
                        className="h-fit p-2 text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-md text-xs sm:text-sm text-center shadow-2xl hover:!text-black cursor-pointer"
                        onClick={() => copyToClipboard("amount")}
                      >
                        {copiedAmountMessage || "Sao chép "} <CopyOutlined />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-8 m-2">
                    <div className="col-span-6 text-left">
                      {qrCode && qrCode !== "" ? (
                        <p className="lh-1 text-lg text-[#fff] mb-[5px]">
                          4. Ấn sao chép lấy nội dung:{" "}
                          <span className="text-[#feb313] text-sm">
                            <strong>
                              <i>
                                (Không copy chính xác, kim cương sẽ không về TK)
                              </i>
                            </strong>
                          </span>
                        </p>
                      ) : (
                        <p className="lh-1 text-lg text-[#fff] mb-[5px]">
                          4. Ấn sao chép lấy nội dung:
                        </p>
                      )}
                      <p className="text-[#00e60e] font-bold text-sm">
                        {description}
                      </p>
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end">
                      <button
                        className="h-fit p-2 text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-md text-xs sm:text-sm text-center shadow-2xl hover:!text-black cursor-pointer"
                        onClick={() => copyToClipboard("description")}
                      >
                        {copiedDescriptionMessage || "Sao chép "}{" "}
                        <CopyOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              {qrCode && qrCode !== "" ? (
                <>
                  <p className="text-center text-[14px] font-bold mb-[0px]">
                    Hoặc bạn có thể quét mã QR dưới đây
                  </p>
                  <div>
                    <QRCode
                      ref={qrRef}
                      value={qrCode}
                      size={200}
                      logoImage="/images/toidoc-t-logo.png" // Path to your logo image
                      logoWidth={50}
                      logoHeight={50}
                      eyeRadius={5}
                      eyeColor={"#3765af"}
                      fgColor="#5C95C6"
                      qrStyle={"dots"}
                      removeQrCodeBehindLogo={true}
                      logoPadding={8}
                      logoPaddingStyle={"circle"}
                      enableCORS={true}
                    />
                    <div className="flex justify-center">
                      <Button
                        className="bg-[#04b17c] rounded-md px-3 py-1.5 text-white font-semibold shadow-md"
                        onClick={() => handleDownload()}
                      >
                        Tải mã QR
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <div>
                      <div className="flex justify-center">
                        <Image
                          loader={imageLoader}
                          height={200}
                          width={170}
                          src={qrUrl || "/images/qr-son.jpg"}
                          priority
                          className="bd-radius-10"
                        />
                      </div>
                      <div className="flex justify-center mt-[10px]">
                        <a
                          className="bg-[#02f094] rounded-md px-3 py-1.5 text-[#000] font-semibold shadow-md"
                          href={qrUrl || "/images/qr-son.jpg"}
                          download="qr-ck.jpg"
                        >
                          Tải mã QR
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      margin: "20px 0px",
                      borderTop: "0.5px solid #b9b9b9",
                    }}
                  ></div>
                  <button
                    className="btnMain btnSecondDeposit"
                    onClick={() => setShowDepositSuccessWarning(true)}
                  >
                    Báo CK thành công 👆
                  </button>
                </>
              )}
              <Button
                className="btnSecond-Second"
                onClick={() => {
                  window.open(
                    `https://m.me/185169981351799?text=Mình nạp qua web không được. Hỗ trợ giúp mình với.`,
                    "_blank",
                    "Toidoc"
                  );
                }}
              >
                <img src="/images/warning.png" className="mr-[5px] w-[20px]" />
                Báo lỗi không nạp được
              </Button>
            </div>
          </>
        )}
        {/*<FooterDesktop />*/}
      </div>
      {showDepositSuccessWarning && (
        <ModalComponent
          show={showDepositSuccessWarning}
          handleClose={(e) => setShowDepositSuccessWarning(false)}
          styleBody="background-gradient-gray"
        >
          <div className="px-[20px] pb-[20px] pt-[10px]">
            <div className="flex justify-center pb-[15px]">
              <img
                src="/images/info-icon.png"
                className="w-[20px] h-[20px] mr-[5px]"
              />
              <p>
                <strong>Lưu ý</strong>
              </p>
            </div>
            <div className="px-[10px]">
              <p>
                Bạn nhớ gửi kèm theo ảnh chuyển khoản thành công để Admin phê
                duyệt nhé!
              </p>
              <p>
                Sau khi Admin nạp kim cương, bạn chỉ cần mở khoá chương là đọc
                được tiếp.
              </p>
              <a
                className="btnMain"
                onClick={() => handleOKWarningDepositSuccess()}
              >
                OK
              </a>
            </div>
          </div>
        </ModalComponent>
      )}
    </>
  );
};

export default observer(TransferInfo);
