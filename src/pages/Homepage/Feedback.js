import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import Field from '../../components/Form/Field'
import LocalForm from '../../components/Form/LocalForm'
import Header from '../../components/Header/Header'
import InputField from '../../components/InputField/InputField'
import TextAreaField from '../../components/TextAreaField'
import { validateEmail } from '../../utils/validators'
import * as Api from '../../api/api'
import Router from 'next/router'
import { toast } from 'react-toastify'
import Form from '../../components/Form/Form'

const Feedback = ({
  values,
  updateProperty,
  handleTouched,
  submitForm,
  handleClose
}) => {
  const [loading, setLoading] = useState(false)
  const handleLogin = async (data) => {
    try {
      setLoading(true)

      const result = await Api.post({
        url: '/customer/public/feedback/save',
        data
      })

      setLoading(false)
      handleClose()

      toast('Cảm ơn bạn đã gửi góp ý!', {
        type: "success",
        theme: "colored",
      })

     
    } catch(e){
      setLoading(false)
    }
  }

  return (
          <Form onSubmit={submitForm(handleLogin)} className='max-w-[420px] w-full mx-auto'>
            <Field name='email'
              value={values.email}
              updateProperty={updateProperty}
              handleTouched={handleTouched}
              component={InputField}
              label='Email'
              placeholder='Nhập địa chỉ email'
            />
            <Field name='content'
              value={values.content}
              updateProperty={updateProperty}
              handleTouched={handleTouched}
              component={TextAreaField}
              label='Nội dung góp ý'
              placeholder='Nhập nội dung góp ý'
            />

            <Button className='btnMain'
              type='submit'
              loading={loading}
            >
              Gửi góp ý
            </Button>

          </Form>
  )
}

const validate = (values) => {
  const errors = {}

  if (values.email && !validateEmail(values.email)) {
    errors.email = 'Vui lòng nhập địa chỉ email hợp lệ'
  }

  if (!values.content) {
    errors.content = 'Vui lòng nhập nội dung góp ý'
  }

  return errors
}

export default LocalForm({
  validate,
  MyComponent: Feedback
})
