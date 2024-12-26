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
import { toast } from 'react-toastify'
import Form from '../../components/Form/Form'

const Login = ({
  values,
  updateProperty,
  handleTouched,
  submitForm
}) => {
  const [loading, setLoading] = useState(false)
  const handleLogin = async (data) => {
    try {
      setLoading(true)

      const result = await Api.post({
        url: '/customer/public/customer/login',
        data
      })

      setLoading(false)

      localStorage.setItem('accessToken', result.data.token)


      Router.push('/')

     
    } catch(e){
      setLoading(false)
    }
  }

  return (
    <CommonLayout >
      <div>
        <Header selectedTab={'PROFILE'}/>
        <div className='relative pb-[100px] max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] md:px-[8px] min-h-[100vh] flex flex-col justify-center px-[20px]'>
          <p className='text-[20px] font-bold main-text text-center'>
            Đăng nhập
          </p>
          <Form onSubmit={submitForm(handleLogin)} className='max-w-[420px] w-full mx-auto'>
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

            <p className='text-[14px] secondary-text mt-[50px] text-center cursor-pointer'
              onClick={() => {
                Router.push('/dang-ky')
              }}
            >
              Chưa có tài khoản? <a className='link'>Đăng ký</a>
            </p>
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
