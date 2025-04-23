import { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Collapse,
  ConfigProvider,
  Form,
  Input,
  Select,
  Radio,
} from "antd";
import PaypalIcon from "../../../../public/icons/PaypalIcon";
import { usePaypalPackages } from "../../../hook/useData";

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
  const router = useRouter();
  const { ref } = router.query;
  const { paypalDiamondPackages, paypalPremiumPackages } = usePaypalPackages();
  const [selectedDiamondPackage, setSelectedDiamondPackage] = useState(
    paypalDiamondPackages?.[0] ? paypalDiamondPackages[0].value : 7
  );
  const [selectedPremiumPackage, setSelectedPremiumPackage] = useState(
    paypalPremiumPackages?.[0] ? paypalPremiumPackages[0].value : 25
  );
  const [type, setType] = useState("diamond");
  const options = [
    {
      value: "diamond",
      label: "Kim cương",
    },
    {
      value: "premium",
      label: "Premium",
    },
  ];

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const createOrder = (_, actions) => {
    const selectedValue =
      type === "diamond" ? selectedDiamondPackage : selectedPremiumPackage;

    if (!selectedValue) {
      openNotificationWithIcon("error", "Vui lòng chọn gói!");
      return;
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: selectedValue.toString(),
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
      `https://m.me/185169981351799?text=Mình vừa thanh toán Paypal trên web, Toidoc nạp giúp mình vs! %0A Mã khách hàng: ${
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
                        Cần chờ admin duyệt 5 - 10 phút, phù hợp với khách hàng
                        nước ngoài..
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

                    <Form.Item>
                      <Radio.Group
                        options={options}
                        defaultValue="diamond"
                        onChange={(e) => {
                          if (e.target.value === "diamond") {
                            setType("diamond");
                            setSelectedPremiumPackage(null);
                            setSelectedDiamondPackage(7);
                          } else {
                            setType("premium");
                            setSelectedDiamondPackage(null);
                            setSelectedPremiumPackage(25);
                          }
                        }}
                      />
                    </Form.Item>

                    {type === "diamond" ? (
                      <Form.Item label="Chọn gói kim cương" required>
                        <Select
                          // defaultValue={7}
                          value={selectedDiamondPackage}
                          placeholder="Chọn gói kim cương"
                          onChange={(value) => setSelectedDiamondPackage(value)}
                          options={paypalDiamondPackages}
                        />
                      </Form.Item>
                    ) : (
                      <Form.Item label="Chọn gói premium" required>
                        <Select
                          // defaultValue={25}
                          value={selectedPremiumPackage}
                          placeholder="Chọn gói premium"
                          onChange={(value) => setSelectedPremiumPackage(value)}
                          options={paypalPremiumPackages}
                        />
                      </Form.Item>
                    )}
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
