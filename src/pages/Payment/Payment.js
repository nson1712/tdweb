import React, { useState, useEffect } from "react";
import Router from "next/router";
import Header from "../../components/Header/Header";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import * as Api from "../../api/api";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import LocalForm from "../../components/Form/LocalForm";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Field from "../../components/Form/Field";
import RedDiamondIcon from "./RedDiamondIcon";
import { formatStringToNumber } from "../../utils/utils";
import FooterDesktop from "../../components/FooterDesktop";
import ChatSupport from "../../components/Button/ChatSupport";
import ModalComponent from "../../components/Modal/Modal";
import HeaderPayment from "./HeaderPayment";

const Payment = ({ values, updateProperty, handleTouched, submitForm }) => {
  const [loading, setLoading] = useState(false);
  const [cash, setCash] = useState(0);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [packageValue, setPackageValue] = useState({});
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showWarningPackage, setShowWarningPackage] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showMorePackage, setShowMorePackage] = useState(false);
  const [hideMorePackage, setHideMorePackage] = useState(false);

  const packages = [
    {
      label: "15,500",
      deposit: "18,000VNĐ",
      value: 15500,
    },
    {
      label: "50,000",
      deposit: "50,000VNĐ",
      value: 50000,
    },
    {
      label: "105,000",
      deposit: "100,000VNĐ",
      value: 105000,
    },
    {
      label: "315,000",
      deposit: "300,000VNĐ",
      value: 315000,
    },
    {
      label: "530,000",
      deposit: "500,000VNĐ",
      value: 530000,
    },
    {
      label: "1,060,000",
      deposit: "1,000,000VNĐ",
      value: 1060000,
    },
  ];

  useEffect(() => {
    setPackageValue(null);
    setClickedIndex(null);
  }, []);

  const handleChangePackage = (index, item) => {
    setShowWarningPackage(false);
    setClickedIndex(index);
    setPackageValue(item.value);
    switch (item.value) {
      case 15500:
        setCash(18000);
        break;
      case 50000:
        setCash(50000);
        break;
      case 105000:
        setCash(100000);
        break;
      case 315000:
        setCash(300000);
        break;
      case 530000:
        setCash(500000);
        break;
      case 1060000:
        setCash(1000000);
        break;
      case 2120000:
        setCash(2000000);
        break;
      default:
        setCash(item.value);
    }
  };

  const handleRequestPayment = async (data) => {
    try {
      if (cash === 0) {
        setShowWarningPackage(true);
      } else {
        setLoading(true);
        console.log("Start submit form");
        if (!executeRecaptcha) {
          console.log("Execute recaptcha not yet available");
          return;
        }
        console.log("Start get token");
        const token = await executeRecaptcha("onSubmit");
        data.token = token;
        data.amount = cash;
        const timestamp = Date.now();
        data.requestId = data.customerCode + "_" + timestamp;

        const result = await Api.post({
          url: "/customer/public/customer/deposit/qr",
          data,
        });
        setLoading(false);
        if ("00" !== result?.data.code) {
          alert(result?.data.message);
        } else {
          const now = new Date();
          // Add 10 minutes to the current time
          const timePlusTenMinutes = new Date(now.getTime() + 10 * 60000); // 10 minutes = 10 * 60 * 1000 milliseconds

          Router.push(
            `/nap-kim-cuong/thong-tin-chuyen-khoan?accountName=${
              result?.data.accountName
            }&accountNumber=${result?.data.accountNumber}&amount=${
              result?.data.amount
            }&description=${result?.data.contentTransfer}&qrCode=${
              result?.data.qrCode
            }&expiredAt=${timePlusTenMinutes.toISOString()}&order=${
              result?.data.orderCode
            }&paymentId=${result?.data.paymentLinkId}`
          );
          // window.open(result?.data.checkoutLink, "_self")
        }
      }
    } catch (e) {
      console.log("Error get token: ", e);
      setLoading(false);
    }
  };

  return (
    <CommonLayout>
      <div>
        <div className="header-payment">
          <Header />
        </div>
        <div className="relative max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] flex flex-col justify-center text-second-color">
          <HeaderPayment />
          <p className="text-[20px] font-bold main-text text-center">
            Web Nạp KC Tự Động Chính Thức của Toidoc
          </p>
          <div className="pl-[20px] pr-[20px] mb-[20px]">
            <div className="max-w-[450px] w-full mx-auto alert alert--secondary admonition_LlT9 pl-[20px] pr-[20px]">
              <div className="admonitionHeading_tbUL">
                <span className="admonitionIcon_kALy w-[20px]">
                  <svg viewBox="0 0 14 16">
                    <path
                      fillRule="evenodd"
                      d="M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"
                    ></path>
                  </svg>
                </span>
                Lưu ý:
              </div>
              <div class="admonitionContent_S0QG">
                <p>
                  Mã khách hàng: là mã TD.... được lấy từ màn hình "Tài Khoản"
                  trên App Toidoc
                </p>
              </div>
              <a
                onClick={(e) => setShowModal(true)}
                style={{ color: "#0693ee", textDecoration: "underline" }}
              >
                Xem hướng dẫn
              </a>
            </div>
            <Form
              onSubmit={submitForm(handleRequestPayment)}
              className="max-w-[450px] w-full mx-auto"
            >
              <Field
                name="customerCode"
                value={values.customerCode}
                updateProperty={updateProperty}
                handleTouched={handleTouched}
                component={InputField}
                label="1. Copy và Paste mã KH vào ô dưới"
              />
              <p className="text-[14px] font-semibold">
                2. Bấm chọn gói nạp bên dưới
              </p>
              {showWarningPackage && (
                <p className="text-[14px] text-red">
                  * Bạn phải lựa chọn gói kim cương
                </p>
              )}
              <div className="btnContainer">
                {packages.slice(0, 3).map((item, index) => (
                  <Button
                    key={index}
                    className={`btn btnSelectDiamond w-[350px] h-[50px] pt-[10px] ${
                      clickedIndex === index ? "clicked" : ""
                    }`}
                    onClick={() => handleChangePackage(index, item)}
                  >
                    <div>
                      {`CK ${item.deposit} -> Nhận ${item.label}`}{" "}
                      <RedDiamondIcon className="float-right ml-[5px]" />
                    </div>
                  </Button>
                ))}

                {showMorePackage &&
                  packages.slice(3, 6).map((item, index) => (
                    <Button
                      key={index + 3}
                      className={`btn btnSelectDiamond w-[350px] h-[50px] pt-[10px] ${
                        clickedIndex === index + 3 ? "clicked" : ""
                      }`}
                      onClick={() => handleChangePackage(index + 3, item)}
                    >
                      <div>
                        {`CK ${item.deposit} -> Nhận ${item.label}`}{" "}
                        <RedDiamondIcon className="float-right ml-[5px]" />
                      </div>
                    </Button>
                  ))}
                {!showMorePackage && (
                  <a
                    onClick={(e) => {
                      setShowMorePackage(!showMorePackage);
                      setHideMorePackage(!hideMorePackage);
                    }}
                    style={{ color: "#0693ee", textDecoration: "underline" }}
                  >
                    Xem thêm gói khác
                  </a>
                )}
                {hideMorePackage && (
                  <a
                    onClick={(e) => {
                      setShowMorePackage(!showMorePackage);
                      setHideMorePackage(!hideMorePackage);
                    }}
                    style={{ color: "#0693ee", textDecoration: "underline" }}
                  >
                    Ẩn bớt gói
                  </a>
                )}
              </div>

              <p className="text-[16px] font-bold">
                Số tiền bạn cần chuyển là:{" "}
                <span className="text-[20px] font-bold main-text">
                  {formatStringToNumber(cash)} VNĐ
                </span>
              </p>

              <Button
                className="btnMain btnSecond"
                type="submit"
                loading={loading}
              >
                Hiển thị thông tin chuyển khoản
              </Button>

              <Button
                className="btnSecond-Second"
                onClick={() => {
                  window.open(
                    `https://m.me/185169981351799?text=Mình nạp qua web không được. Hỗ trợ giúp mình với.`,
                    "_blank",
                    "Toidoc"
                  );
                }}
                loading={loading}
              >
                Báo lỗi không nạp được
              </Button>
            </Form>
          </div>
          <FooterDesktop />
        </div>
      </div>
      <ChatSupport showChat={showChat} setShowChat={setShowChat} />

      {showModal && (
        <ModalComponent
          show={showModal}
          handleClose={(e) => setShowModal(false)}
          isCountDown={false}
        >
          <img
            src="https://media.truyenso1.xyz/ads/guide-customer-code-1.jpg"
            className="imgBanner"
          />
        </ModalComponent>
      )}
    </CommonLayout>
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.customerCode) {
    errors.customerCode = "Vui lòng nhập mã khách hàng";
  } else if (
    !values.customerCode.startsWith("TD") ||
    values.customerCode.length < 12
  ) {
    errors.customerCode = "Mã khách hàng không chính xác.";
  }
  return errors;
};

export default LocalForm({
  validate,
  MyComponent: Payment,
});
