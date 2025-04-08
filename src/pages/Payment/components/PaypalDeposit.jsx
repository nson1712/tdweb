import { useState } from "react";
import { usePaypalPackages } from "../../../hook/useData";
import { Button, Collapse, ConfigProvider, Form, Input, Select } from "antd";
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
import { useRouter } from "next/router";

const PaypalDeposit = ({ api }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { ref } = router.query;
  const { paypalPackages } = usePaypalPackages();
  const [selectedPackage, setSelectedPackage] = useState(
    paypalPackages?.[0] ? paypalPackages[0].value : 7
  );

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const createOrder = (_, actions) => {
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

  const onApprove = (_, actions) => {
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

  const onFinish = (values) => {
    window.open(
      `https://m.me/185169981351799?text=Mình vừa thanh toán qua Momo, Toidoc hỗ trợ mình nhé! %0A Mã khách hàng: ${
        ref || values.referralCode
      }`
    );
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
                        Nạp qua Paypal
                      </div>
                      <div className="text-slate-500 text-xs sm:text-sm line-clamp-1">
                        Cần chờ admin duyệt 5 - 10 phút, phù hợp với khách hàng nước ngoài..
                      </div>
                    </div>
                  </div>
                </div>
              ),
              children: (
                <div className="text-base">
                  <p className="text-lg font-bold">
                    Hướng dẫn nạp kim cương qua Paypal
                  </p>
                  <p>
                    <span className="font-bold">Bước 1:</span> Chọn gói kim
                    cương muốn nạp
                  </p>
                  <p>
                    <span className="font-bold">Bước 2:</span> Bấm nút Paypal
                    màu vàng bên dưới để thực hiện thanh toán
                  </p>
                  <Form
                    form={form}
                    onFinish={onFinish}
                    scrollToFirstError={{ behavior: "smooth" }}
                  >
                    <p className="text-base">
                      <span className="font-bold">Bước 3:</span> Sau khi thanh
                      toán thành công, vui lòng chụp lại hóa đơn thanh toán rồi
                      gửi cho Admin xác nhận{" "}
                      <span>
                        <Form.Item noStyle label={null}>
                          <Button
                            className="text-lg font-bold text-blue-500 hover:!text-blue-600 hover:!bg-transparent px-1"
                            type="text"
                            htmlType="submit"
                          >
                            TẠI ĐÂY
                          </Button>
                        </Form.Item>
                      </span>
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

                    <Form.Item label="Chọn gói kim cương" required>
                      <Select
                        defaultValue={7}
                        placeholder="Chọn gói kim cương"
                        onChange={(value) => setSelectedPackage(value)}
                        options={paypalPackages}
                      />
                    </Form.Item>
                  </Form>

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
