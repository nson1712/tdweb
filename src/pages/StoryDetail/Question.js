import React, {useState} from 'react';
import * as Api from '../../api/api';
import Button from '../../components/Button';
import LocalForm from '../../components/Form/LocalForm';
import Form from '../../components/Form/Form';
import Field from '../../components/Form/Field';
import InputField from '../../components/InputField/InputField';

const Question = ({question, closeModal,
  values,
  updateProperty,
  handleTouched,
  submitForm
}) => {

  const [errorStr, setErrorStr] = useState('');
  const [loading, setLoading] = useState(false);

  const submitAnswer = async (data) => {
    try {
      setLoading(true);
      setErrorStr('');
      data.id = question.id
      const result = await Api.post({
        url: '/data/private/data/question/validate',
        data
      })

      setLoading(false);
      if(!result.data) {
        setErrorStr('Câu trả lời của bạn chưa chính xác!')
      } else {
        closeModal();
      }
     
    } catch(e){
      setErrorStr(e+'');
    }
  }

  return (
    <>
      <div style={{margin: '20px', marginTop: '40px', marginBottom: '40px'}}>
        <h3 style={{paddingRight: '20px', 'fontWeight': 'bold', 'marginBottom': '10px', textAlign: 'center'}}>Xác minh tôi không phải là Robot</h3>
        <p><i>(Tải app Toidoc để không phải trả lời câu hỏi)</i></p>
        
        <div>
          <Form onSubmit={submitForm(submitAnswer)} className='max-w-[420px] w-full mx-auto'>
            <Field name='answer'
              value={values.answer}
              updateProperty={updateProperty}
              handleTouched={handleTouched}
              component={InputField}
              label={question?.question}
              placeholder='Nhập câu trả lời'
            />
            {errorStr !== '' && <p style={{marginBottom: '10px', color: 'red'}}><i>{errorStr}</i></p>}
            <Button className='btnMain'
              type='submit'
              loading={loading}
            >
              Trả lời
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}


const validate = (values) => {
  const errors = {}

  if (!values.answer) {
    errors.answer = 'Vui lòng nhập câu trả lời của bạn.'
  }

  return errors
}

export default LocalForm({
  validate,
  MyComponent: Question
})
