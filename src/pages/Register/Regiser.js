import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Field from "../../components/Form/Field";
import LocalForm from "../../components/Form/LocalForm";
import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField";
import { validateEmail } from "../../utils/validators";
import * as Api from "../../api/api";
import Router from "next/router";
import { toast } from "react-toastify";
import Form from "../../components/Form/Form";

const Register = ({ values, updateProperty, handleTouched, submitForm }) => {
  const [loading, setLoading] = useState(false);
  const handleRegister = async (data) => {
    try {
      setLoading(true);

      await Api.post({
        url: "/customer/public/customer/register",
        data,
      });

      toast("Đăng ký thành công. Vui lòng đăng nhập", {
        type: "success",
        theme: "colored",
      });

      setLoading(false);

      Router.push("/dang-nhap");
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header selectedTab={"PROFILE"} />
      <div className="relative pb-[100px] max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] px-[20px] md:px-[8px] min-h-[100vh] flex flex-col justify-center">
        <p className="text-[20px] font-bold main-text text-center">
          Đăng ký tài khoản
        </p>
        <Form
          onSubmit={submitForm(handleRegister)}
          className="max-w-[420px] w-full mx-auto"
        >
          <Field
            name="email"
            value={values.email}
            updateProperty={updateProperty}
            handleTouched={handleTouched}
            component={InputField}
            label="Email"
            placeholder="Nhập địa chỉ email"
          />
          <Field
            name="password"
            value={values.password}
            updateProperty={updateProperty}
            handleTouched={handleTouched}
            component={InputField}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
          />
          <Field
            name="confirmPassword"
            value={values.confirmPassword}
            updateProperty={updateProperty}
            handleTouched={handleTouched}
            component={InputField}
            label="Nhắc lại mật khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
          />

          <Button className="btnMain" type="submit" loading={loading}>
            Đăng ký
          </Button>

          <p
            className="text-[14px] secondary-text mt-[50px] text-center cursor-pointer"
            onClick={() => {
              Router.push("/dang-nhap");
            }}
          >
            Đã có tài khoản? <a className="link">Đăng nhập ngay</a>
          </p>
        </Form>
      </div>
    </div>
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Vui lòng nhập đia chỉ email";
  } else if (!validateEmail(values.email)) {
    errors.email = "Vui lòng nhập địa chỉ email hợp lệ";
  }

  if (!values.password) {
    errors.password = "Vui lòng nhập mật khẩu";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Mật khẩu không khớp nhau";
  }

  return errors;
};

export default LocalForm({
  validate,
  MyComponent: Register,
});
