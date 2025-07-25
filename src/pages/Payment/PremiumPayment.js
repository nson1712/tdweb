import React, { useState, useEffect } from "react";
import Router from "next/router";
import * as Api from "../../api/api";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import LocalForm from "../../components/Form/LocalForm";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Field from "../../components/Form/Field";
import { formatStringToNumber } from "../../utils/utils";
import ChatSupport from "../../components/Button/ChatSupport";
import ModalComponent from "../../components/Modal/Modal";
import HeaderPayment from "./HeaderPayment";
import moment from "moment";
import "moment/locale/vi";
import { Alert, notification, Spin } from "antd";
import crownIcon from "../../../public/images/queen-crown.png";
import Image from "next/image";
import { CloseCircleOutlined } from "@ant-design/icons";
import imageLoader from "../../loader/imageLoader";

const PremiumPayment = ({
  values,
  updateProperty,
  handleTouched,
  submitForm,
}) => {
  moment.locale("vi");
  const [loading, setLoading] = useState(false);
  const [cash, setCash] = useState(0);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [premiumPackages, setPremiumPackages] = useState([]);
  const [planCode, setPlanCode] = useState();
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showWarningPackage, setShowWarningPackage] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.open({
      message: "Vui lòng kiểm tra lại Mã Khách Hàng!",
      icon: <CloseCircleOutlined className="text-red-600" />,
      placement,
    });
  };

  useEffect(() => {
    const getPremiumPackage = async () => {
      try {
        const result = await Api.get({
          url: "https://fsdfssf.truyenso1.xyz/customer/subscription/plans",
        });
        setPremiumPackages(
          result.data.PREMIUM.sort(function (a, b) {
            return a.id - b.id;
          })
        );
      } catch (e) {
        console.log(e);
      }
    };

    getPremiumPackage();
  }, []);

  useEffect(() => {
    setClickedIndex(null);
  }, []);

  const handleChangePremiumPackages = (index, item) => {
    setShowWarningPackage(false);
    setClickedIndex(index);
    setPlanCode(item.code);
    setCash(item.price);
  };

  const handleRequestPayment = async (data) => {
    try {
      if (cash === 0) {
        setShowWarningPackage(true);
      } else {
        setLoading(true);
        if (!executeRecaptcha) {
          return;
        }
        const token = await executeRecaptcha("onSubmit");
        data.token = token;
        const timestamp = Date.now();
        data.requestId = data.customerCode + "_" + timestamp;
        data.planCode = planCode;

        const result = await Api.post({
          url: "https://fsdfssf.truyenso1.xyz/customer/public/customer/subscription/qr",
          data,
        });
        setLoading(false);
        if ("00" !== result?.data.code) {
          const now = new Date();
          const timePlusTenMinutes = new Date(now.getTime() + 10 * 60000);
          Router.push(
            `/premium/thong-tin-chuyen-khoan?accountName=PHAM NGOC SON&accountNumber=CAS0913431088&amount=${
              planCode === 'premium_1month' ? 219000 : planCode === 'premium_3month' ? 569000 : planCode === 'premium_6month' ? 1059000 : 1899000
            }&description=Ung ho kc&qrCode=&expiredAt=${timePlusTenMinutes.toISOString()}&order=&paymentId=`
          );
        } else {
          const now = new Date();
          const timePlusTenMinutes = new Date(now.getTime() + 10 * 60000);

          Router.push(
            `/premium/thong-tin-chuyen-khoan?accountName=${
              result?.data.accountName
            }&accountNumber=${result?.data.accountNumber}&amount=${
              result?.data.amount
            }&description=${result?.data.contentTransfer}&qrCode=${
              result?.data.qrCode
            }&expiredAt=${timePlusTenMinutes.toISOString()}&order=${
              result?.data.orderCode
            }&paymentId=${result?.data.paymentLinkId}`
          );
        }
      }
    } catch (e) {
      setLoading(false);
      if (e.status === 400) {
        openNotification("topRight");
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className="relative max-w-[768px] mx-auto bg-white md:pt-[88px] flex flex-col justify-center text-second-color">
        <HeaderPayment />
        <p className="text-[20px] font-bold main-text text-center p-2">
          Web Đăng Ký Premium Chính Thức của Toidoc
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
            <div className="admonitionContent_S0QG">
              <p>
                Mã khách hàng: là mã TD.... được lấy từ màn hình "Tài Khoản"
                trên App Toidoc
              </p>
            </div>
            <a
              onClick={(e) => setShowModal(true)}
              className="text-[#0693ee] underline"
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
              2. Bấm chọn gói PREMIUM bên dưới
            </p>
            {showWarningPackage && (
              <Alert type="error" showIcon message="Vui lòng chọn gói" />
            )}
            <div className="btnContainer">
              {premiumPackages?.map((item, index) => (
                <Button
                  key={index}
                  className={`
                      shadow-xl bg-golden-gradient flex gap-x-1 justify-center rounded-lg relative overflow-hidden font-bold text-base text-[#A54426] w-[350px] h-[50px] hover:translate-y-[-10%] transition duration-300 delay-75 ease-in-out
                      ${clickedIndex === index ? "clicked" : ""}
                    `}
                  onClick={() => handleChangePremiumPackages(index, item)}
                >
                  <div className="self-center">
                    <Image
                      loader={imageLoader}
                      width={24}
                      height={24}
                      src={crownIcon}
                    />
                  </div>
                  <div className="self-center">
                    {`${item.tier} ${moment
                      .duration(item.expiryInterval)
                      .humanize(true)
                      .replace(" tới", "")
                      .replace("một", "1")
                      .replace("tháng", "Tháng")
                      .replace("năm", "Năm")}`}
                  </div>
                </Button>
              ))}
            </div>

            <Alert
              closable
              showIcon
              type="warning"
              message="Nếu như bạn đã đăng ký gói trên chợ, vui lòng hủy gói trên chợ trước khi đăng ký tại đây!"
              className="mb-3"
            />

            <p className="text-[16px] font-bold">
              Số tiền bạn cần chuyển là:{" "}
              <span className="text-[20px] font-bold main-text">
                {formatStringToNumber(cash)} VNĐ
              </span>
            </p>

            <button
              className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center shadow-xl"
              type="submit"
              loading={loading}
            >
              Hiển thị thông tin chuyển khoản
            </button>

            <Button
              className="btnSecond-Second"
              onClick={() => {
                window.open(
                  `https://m.me/185169981351799?text=Mình đăng ký premium qua web không được. Hỗ trợ giúp mình với.`,
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
        {/*<FooterDesktop />*/}
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

      <Spin fullscreen={true} spinning={loading} />
    </>
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
  MyComponent: PremiumPayment,
});
