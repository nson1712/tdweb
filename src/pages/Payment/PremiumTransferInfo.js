import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import Header from "../../components/Header/Header";
import { observer } from "mobx-react";
import Router, { useRouter } from "next/router";
import HeaderPayment from "./HeaderPayment";
import FooterDesktop from "../../components/FooterDesktop";
import { QRCode } from "react-qrcode-logo";
import { formatStringToNumber } from "../../utils/utils";
import Button from "../../components/Button/Button";
import { Alert } from "antd";
import { toast } from "react-toastify";

const PremiumTransferInfo = ({ type }) => {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [copiedAccountMessage, setCopiedAccountMessage] = useState("");
  const [copiedAmountMessage, setCopiedAmountMessage] = useState("");
  const [copiedDescriptionMessage, setCopiedDescriptionMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const router = useRouter();
  const qrRef = useRef(null);
  const counter = useRef(0);
  const orderCode = useRef("");
  const paymentId = useRef("");

  useEffect(() => {
    const dateTimeStr = router.query.expiredAt;
    const reverseDateTime =
      dateTimeStr === "" ? new Date() : new Date(dateTimeStr);
    const now = new Date();
    const duration = reverseDateTime - now;
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
  }, [
    router.query.accountName,
    router.query.accountNumber,
    router.query.amount,
    router.query.description,
    router.query.qrCode,
    router.query.expiredAt,
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      counter.current = counter.current > 0 ? counter.current - 1 : 0;
      if (counter.current % 5 === 0 && counter.current > 0) {
        validatePaymentResult();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes} phút:${seconds < 10 ? `0${seconds}` : seconds} giây`;
  };

  const validatePaymentResult = async () => {
    try {
      if (orderCode.current) {
        const data = {
          orderCode: orderCode.current,
          paymentLinkId: paymentId.current,
        };
        const result = await axios.post(
          `https://fsdfssf.truyenso1.xyz/customer/public/customer/deposit/qr/result`,
          data
        );
        console.log("result QR Premium: ", result);
        if (result?.data?.data.code === 200) {
          Router.push("/premium/success");
        } else if (result?.data?.data.code !== 201) {
          Router.push("/premium/failed");
        }
      }
    } catch (e) {
      // Router.push("/premium/failed");
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
          setCopiedAccountMessage("Đã copy");
        } else if (code === "amount") {
          setCopiedAmountMessage("Đã copy");
        } else if (code === "description") {
          setCopiedDescriptionMessage("Đã copy");
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

  return (
    <div className="relative max-w-[768px] mx-auto bg-white md:pt-[88px] flex flex-col justify-center text-second-color">
      <HeaderPayment />
      {timeLeft <= 0 ? (
        <div style={{ marginTop: "20%" }}>
          <img src={"/images/expired_at.png"} className="w-[200px] imgCenter" />
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
              Router.push("/premium");
            }}
          >
            Đăng ký gói Premium khác
          </Button>
          <Button
            className="btnSecond-Second max-w-[300px] mx-auto"
            onClick={() => {
              window.open(
                `https://m.me/185169981351799?text=Mình đăng ký premium qua web với nội dung ${description} không được. Hỗ trợ giúp mình với.`
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
          <p
            className="text-[16px] main-text text-center"
            dangerouslySetInnerHTML={{
              __html: `Sẽ hết hạn sau <strong>${formatTime(
                timeLeft
              )}</strong> nữa`,
            }}
          />
          <div className="px-[20px] space-y-4 mb-[30px]">
            <p className="text-[14px] font-bold mb-[0px]">
              Hãy ấn nút Copy thông tin chuyển khoản bên dưới
            </p>
            <Alert
              message="Lưu ý: chỉ khi copy đúng các thông tin, thì tài khoản mới đăng ký được gói Premium"
              showIcon
              type="warning"
            />
            <div className="text-xs box-transfer-info p-2">
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
                    <p className="text-lg text-[#fff]">Ngân hàng thụ hưởng</p>
                    <p className="font-bold text-sm text-[#00e60e]">
                      Ngân hàng thương mại cổ phần Phương Đông
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-7 m-2">
                  <div className="col-span-5 text-left">
                    <p className="text-lg text-[#fff]">1. Chủ tài khoản:</p>
                    <p className="font-bold text-sm text-[#00e60e]">
                      {accountName}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-7 m-2">
                  <div className="col-span-5 text-left">
                    <p className="text-lg text-[#fff]">
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
                      className="text-xs text-[#fff] bg-[#7f968b] py-1 px-2 rounded-md font-bold self-center"
                      onClick={() => copyToClipboard("accountNumber")}
                    >
                      {copiedAccountMessage || "Sao chép"}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-7 m-2">
                  <div className="col-span-5 text-left">
                    <p className="text-lg text-[#fff]">3. Số tiền:</p>
                    <p className="font-bold text-[#00e60e] text-sm">
                      {formatStringToNumber(amount)}VNĐ
                    </p>
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end">
                    <button
                      className="text-xs text-[#fff] bg-[#7f968b] py-1 px-2 rounded-md font-bold self-center"
                      onClick={() => copyToClipboard("amount")}
                    >
                      {copiedAmountMessage || "Sao chép"}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-8 m-2">
                  <div className="col-span-6 text-left">
                    <p className="text-sm text-[#fff]">
                      4. Ấn sao chép để copy nội dung:{" "}
                      <span className="text-[#feb313]">
                        <strong>
                          <i>
                            (Không copy chính xác, TK sẽ không đăng ký Premium
                            được)
                          </i>
                        </strong>
                      </span>
                    </p>
                    <p className="text-[#00e60e] font-bold text-sm">
                      {description}
                    </p>
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end">
                    <button
                      className="text-xs text-[#fff] bg-[#7f968b] py-1 px-2 rounded-md font-bold self-center"
                      onClick={() => copyToClipboard("description")}
                    >
                      {copiedDescriptionMessage || "Sao chép"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            {qrCode && (
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
            )}
            <Button
              className="btnSecond-Second"
              onClick={() => {
                window.open(
                  `https://m.me/185169981351799?text=Mình đăng ký premium qua web không được. Hỗ trợ giúp mình với.`,
                  "_blank",
                  "Toidoc"
                );
              }}
            >
              <img src="/images/warning.png" className="mr-[5px] w-[20px]" />
              Báo lỗi không đky được Premium
            </Button>
          </div>
        </>
      )}
      {/*<FooterDesktop />*/}
    </div>
  );
};

export default observer(PremiumTransferInfo);
