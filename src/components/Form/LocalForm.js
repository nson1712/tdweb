import React, { useEffect, useState } from 'react'

let timeout;

const LocalForm = ({validate, MyComponent}) => (props) => {
  const [values, setValues] = useState({})

  const initialForm = () => {
    const errors = validate ? validate({}, props) : {}

    const tempValues = {}
    Object.keys(errors).forEach((key) => {
      tempValues[key] = {
        meta: {
          touched: false,
          error: errors[key]
        }
      }
    })

    setValues(tempValues)
  }

  useEffect(() => {
    initialForm()
  }, [props])

  const updateProperties = (val) => {
    setValues((prev) => {
      const tempValues = {}
      Object.keys(val).forEach((key) => {
        tempValues[key] = {
          ...prev[key],
          value: val[key]
        }
      })
     

      return {...prev, ...tempValues}
    })

    setTimeout(() => {
      runValidate(val)
      
    }, 300)
  }

  const updateProperty = (key, value) => {
    
    setValues((prev) => {
      const tempValues = ({
        ...prev,
        [key]: {
          ...prev[key],
          value,
        }
      })

      return tempValues
    })


    clearTimeout(timeout)

    timeout = setTimeout(() => {
      runValidate({[key]: value})
      
    }, 300)


  }

  const runValidate = (val) => {
    const rawValues = getFormProperty()
    const errors = validate({...rawValues, ...val}, props)
    setValues((prev) => {
      const tempValues = {}
      Object.keys({...prev, ...errors}).forEach((key) => {
        tempValues[key] = {
          ...prev[key],
          meta: {
            ...prev[key]?.meta,
            error: errors[key]
          }
        }
      })
      return tempValues
    })
  }

  const handleTouched = (key) => {
    setValues((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        meta: {
          ...prev[key]?.meta,
          touched: true
        }
      }
    }))
  }

  const initialValues = (values) => {
   
    setValues((prev) => {
      const tempValues = {}

      Object.keys(values).forEach((key) => {
        tempValues[key] = {
          value: values[key],
          meta: prev[key]?.meta || {}
        }
      })

      return {...prev, ...tempValues}
    })

    setTimeout(() => {
      runValidate(values)
      
    }, 0)
  }

  const clearValues = () => {
    initialForm()
  }

  const setAllTouched = (rawValues) => {
    const errors = validate(rawValues, props)
    setValues((prev) => {

      const tempValues = {}

      Object.keys(prev).forEach((key) => {
        tempValues[key] = {
          ...prev[key],
          meta: {
            error: errors[key],
            touched: true
          }
        }
      })
      return tempValues
    })
  }

  const hasErrorsCurrentForm = (rawValues) => {
    const errors = validate(rawValues, props)
    return Object.keys(errors)?.length > 0
  }

  const getFormProperty = () => {
    const rawValues = {}

    Object.keys(values).forEach((key) => {
      rawValues[key] = values[key].value
    })

    return rawValues
  }

  const submitForm = (submitFunction, notClear) => () => {
    const rawValues = getFormProperty()
    setAllTouched(rawValues)
    
    if (!hasErrorsCurrentForm(rawValues)) {
      const result = submitFunction(rawValues)
      if (result) {
        result.then(() => {
          if (!notClear) {
            this.clearValues()
          }
        }).catch(() => {
        })
      }
    }
  }

  return (
    <MyComponent
      {...props}
      updateProperty={updateProperty}
      submitForm={submitForm}
      initialValues={initialValues}
      clearValues={clearValues}
      values={values}
      handleTouched={handleTouched}
      updateProperties={updateProperties}
    />
  )
}


export default LocalForm
