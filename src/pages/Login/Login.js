import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import Field from '../../components/Form/Field'
import LocalForm from '../../components/Form/LocalForm'
import Header from '../../components/Header/Header'
import InputField from '../../components/InputField/InputField'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import { validateEmail } from '../../utils/validators'
import * as Api from '../../api/api'
import Router from 'next/router'
import { setAccessToken, setRefreshToken } from '../../utils/storage'
import Form from '../../components/Form/Form'
import { base64URLdecode } from '../../utils/utils'
import GlobalStore from '../../stores/GlobalStore'
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const Login = ({
  values,
  updateProperty,
  handleTouched,
  submitForm
}) => {
  const [loading, setLoading] = useState(false)
  const handleLoginEmail = async (data) => {
    try {
      setLoading(true)

      const result = await Api.post({
        url: '/customer/public/customer/login',
        data
      })

      setLoading(false)
      await setAccessToken(result?.data?.accessToken);
      await setRefreshToken(result?.data?.refreshToken);

      const tokens = result?.data?.accessToken.split('.');
      const decoded = base64URLdecode(tokens[1]);
      const jsonObj = JSON.parse(decoded);
      GlobalStore.profile = {
        ...GlobalStore.profile,
        ...jsonObj,
      };
      GlobalStore.isLoggedIn = true;

      Router.push('/tai-khoan');
     
    } catch(e){
      setLoading(false)
    }
  }

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async(tokenResponse) => {
      console.log('tokenResponse: ', tokenResponse);
      const loginResult = await Api.post({
        url: '/customer/public/login-by-social',
        data: {
          token: tokenResponse.access_token,
          socialType: 'GOOGLE',
        },
      });

      await setAccessToken(loginResult?.data?.accessToken);
      await setRefreshToken(loginResult?.data?.refreshToken);

      const tokens = loginResult?.data?.accessToken.split('.');
      console.log('updateProfileInfo start decode token')
      const decoded = base64URLdecode(tokens[1]);
      const jsonObj = JSON.parse(decoded);
      console.log('updateProfileInfo jsonObj: ', jsonObj);
      GlobalStore.profile = {
        ...GlobalStore.profile,
        ...jsonObj,
      };
      GlobalStore.isLoggedIn = true;
      Router.push('/tai-khoan');
    }});

  return (
    <CommonLayout >
      <div>
        <Header selectedTab={'PROFILE'}/>
        <div className='relative pb-[100px] max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] md:px-[8px] min-h-[100vh] flex flex-col justify-center px-[20px]'>
          <p className='text-[20px] font-bold main-text text-center'>
            Đăng nhập
          </p>
          <Form onSubmit={submitForm(handleLoginEmail)} className='max-w-[420px] w-full mx-auto'>
            <Field name='email'
              value={values.email}
              updateProperty={updateProperty}
              handleTouched={handleTouched}
              component={InputField}
              label='Email'
              placeholder='Nhập địa chỉ email'
            />
            <Field name='password'
              value={values.password}
              updateProperty={updateProperty}
              handleTouched={handleTouched}
              component={InputField}
              label='Mật khẩu'
              placeholder='Nhập mật khẩu'
              type='password'
            />

            <Button className='btnMain'
              type='submit'
              loading={loading}
            >
              Đăng nhập
            </Button>

            <div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'marginTop': '20px'}}>
              <p className='text-[14px] secondary-text text-center cursor-pointer fl margin-auto'>
                Bạn chưa có tài khoản? 
              </p>
              <Button className='link text-underline' onClick={(e) => handleLoginGoogle(e)}>Đăng ký qua tài khoản Google</Button>
            </div>
            
          </Form>
          
        </div>
      </div>
    </CommonLayout>
  )
}

const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Vui lòng nhập đia chỉ email'
  } else if (!validateEmail(values.email)) {
    errors.email = 'Vui lòng nhập địa chỉ email hợp lệ'
  }

  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu'
  }

  return errors
}

export default LocalForm({
  validate,
  MyComponent: Login
})
