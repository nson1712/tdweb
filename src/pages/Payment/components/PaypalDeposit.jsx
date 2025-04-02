import { useState } from "react";
import { usePaypalPackages } from "../../../hook/useData";
import { Collapse, ConfigProvider, Form, Select } from "antd";
import PaypalIcon from "../../../../public/icons/PaypalIcon";
import {
  PayPalButtons,
  PayPalCardFieldsProvider,
  PayPalCVVField,
  PayPalExpiryField,
  PayPalNameField,
  PayPalNumberField,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import SubmitPayment from "./SubmitPayment";

const PaypalDeposit = ({ api }) => {
  const [form] = Form.useForm();
  const { paypalPackages } = usePaypalPackages();
  const [selectedPackage, setSelectedPackage] = useState(
    paypalPackages?.[0] ? paypalPackages[0].value : 7
  );

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const createOrder = (data, actions) => {
    if (!selectedPackage) {
      openNotificationWithIcon("error", "Vui lòng chọn gói!");
      return;
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: selectedPackage.toString(),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(() => {
      openNotificationWithIcon("success", "Thanh toán thành công!");
      form.resetFields();
    });
  };

  const onError = () => {};

  const paypalCardButtonTransactionProps = {
    createdOrder() {},
    onApprove() {},
  };
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "Ad_kfIztCssh1X3HrKoDMxBQiCI0B6quYjgppzA5U4YIuZQ17Fur5M2UR6-QiwSnwJqKnXzxfDDlZDqO",
        currency: "USD",
        intent: "capture",
        components: "card-fields,buttons",
      }}
    >
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
              key: "pay-pal",
              label: (
                <div className="flex justify-between gap-x-4">
                  <div className="flex gap-x-4">
                    <PaypalIcon />
                    <div>
                      <div className="text-base font-semibold">
                        Nạp kim cương qua Paypal
                      </div>
                      <div className="text-slate-500 text-xs sm:text-sm line-clamp-1">
                        Cần chờ admin duyệt, phù hợp với khách hàng nước ngoài..
                      </div>
                    </div>
                  </div>
                </div>
              ),
              children: (
                <div className="text-base">
                <p className="text-lg font-bold">Hướng dẫn nạp kim cương qua Paypal</p>
                <p><span className="font-bold">Bước 1:</span> Chọn gói kim cương muốn nạp</p>
                <p><span className="font-bold">Bước 2:</span> Bấm nút Paypal màu vàng bên dưới để thực hiện thanh toán</p>
                <p><span className="font-bold">Bước 3:</span> Sau khi thanh toán thành công, vui lòng chụp lại hóa đơn
                    thanh toán rồi gửi cho Admin xác nhận{" "}
                    <span>
                      <a
                        className="text-lg text-blue-500 hover:!text-blue-600 font-bold"
                        href="https://m.me/185169981351799"
                        target="_blank"
                      >
                        TẠI ĐÂY
                      </a>
                    </span></p>

                  <Form.Item label="Chọn gói kim cương">
                    <Select
                      defaultValue={7}
                      placeholder="Chọn gói kim cương"
                      onChange={(value) => setSelectedPackage(value)}
                      options={paypalPackages}
                    />
                  </Form.Item>
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                  <PayPalCardFieldsProvider
                    {...paypalCardButtonTransactionProps}
                  >
                    <PayPalNameField />
                    <PayPalNumberField />
                    <PayPalExpiryField />
                    <PayPalCVVField />
                    <SubmitPayment />
                  </PayPalCardFieldsProvider>
                </div>
              ),
            },
          ]}
        />
      </ConfigProvider>
    </PayPalScriptProvider>
  );
};

export default PaypalDeposit;
