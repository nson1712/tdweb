import React, { Component } from 'react'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import classNames from 'classnames'
import Dropzone from 'react-dropzone-uploader'
import * as Api from '../../api/api'
import axios from 'axios'
import classes from './UploadMediaField.module.scss'
import { renderField } from '../Form'

class UploadDocument extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: {},
    }
  }

  getFilesFromEvent = (e) =>
    new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject))
      })
    })

  getUploadParams = async ({ file }) => {
    const formData = new FormData()
    formData.append('files', file)
    // const size = file.size
    const size = file.size
    const id = this.uuidv4()
    const { input } = this.props
    const { value, onChange, folder } = input
    const valueArr = value || []
    try {
      onChange([...valueArr, { id, url: file.name, status: 'UPLOADING' }])

      this.setState((prevState) => ({
        ...prevState,
        loading: {
          ...prevState.loading,
          [id]: 0.05,
        },
      }))

      const result = await Api.get({
        url: '/static/public/presignurl',
        hideError: true,
        params: {
          filename: file.name,
          folder,
        },
      })

      const extend = file.name ? file.name.split('.').pop() : 'File'

      await axios.put(result.data.url, file, {
        headers: {
          'x-amz-acl': 'public-read',
          'Content-Type': extend === 'svg' && 'image/svg+xml',
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.loaded / size
          this.setState((prevState) => ({
            ...prevState,
            loading: {
              ...prevState.loading,
              [id]: progress,
            },
          }))
        },
      })

      const [imageUrl] = result.data.url.split('?')

      // eslint-disable-next-line react/destructuring-assignment
      const newValue = this.props.input.value.map((item) => {
        if (item.id === id) {
          return {
            id: item.id,
            url: imageUrl,
            fileName: file.name,
            status: 'DONE',
          }
        }
        return item
      })
      onChange(newValue)
    } catch (e) {
      console.log('e', e)
      // eslint-disable-next-line react/destructuring-assignment
      const newValue = this.props.input.value.filter((item) => item.id !== id)
      onChange(newValue)
    }
    return {
      // url: `${ServiceUploadUrl}/public/upload-compress`,
    }
  }

  Preview = () => {
    const { input } = this.props
    const { value } = input
    const { loading } = this.state
    return (
      <div>
        <div className={classes.files}>
          {value &&
            value.map((file, i) => (
              <div key={i} className={classes.fileWrapper}>
                <div className={classes.file}>
                  <a
                    className={classNames(classes.left)}
                    href={file.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <div className={classes.imageWrapper}>
                      {file.url && file.status !== 'UPLOADING' && (
                        <img src={`${file.url}`} className={classes.image} alt='img' />
                      )}
                    </div>
                  </a>
                  <a
                    className={classes.btnClose}
                    onClick={this.handleRemoveDocument(i)}
                  >
                    <i className={classNames(classes.times, 'fas fa-times')} />
                  </a>
                </div>
                {loading[file.id] && loading[file.id] !== 1 && (
                  <div className={classes.row}>
                    <div className={classes.progressWrapper}>
                      <div
                        className={classes.progress}
                        style={{ width: `${loading[file.id] * 100}%` }}
                      />
                    </div>
                    <p className={classes.percent}>
                      {`${Math.round(loading[file.id] * 100)}%`}
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    )
  }

  Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const { input, title, description, hasError } = this.props
    return (
      <label
        className={classNames(
          classes.inputComponent,
          hasError && classes.error
        )}
      >
        {this.Preview()}

        { input.value?.length === 0
          && <div className='text-center'>
            <img src='/images/paperclip.svg' className='w-[58px] mb-[30px] mx-auto' atl='icon'/>
            <p className='text-[24px] leading-[130%] font-bold text-white mb-[14px]'>
              { title }
            </p>
            <p className='text-[16px] leading-[24px] gray-text-2 px-[24px]'>
              { description }
            </p>
            <input
              style={{ display: 'none' }}
              type='file'
              accept={accept}
              multiple={false}
              onChange={(e) => {
                getFilesFromEvent(e).then((chosenFiles) => {
                  onFiles(chosenFiles)
                })
              }}
            />
          </div>
        }
        
        
      </label>
    )
  }

  handleRemoveDocument = (pos) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dropzoneRef.handleRemove(this.dropzoneRef.files[pos])
    const { input } = this.props
    const newValue = input.value.filter((item, i) => i !== pos)
    input.onChange(newValue)
  }

  Layout = ({ input, dropzoneProps }) => (
    <div>
      <div {...dropzoneProps}>{input}</div>
    </div>
  )

  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16),
    )
  }

  render() {
    const { hasError, accept } = this.props
    return (
      <div
        className={classNames(classes.container, hasError && 'errorWrapper')}
      >
        <Dropzone
          inputContent='Drag and drop image here!'
          InputComponent={this.Input}
          LayoutComponent={this.Layout}
          getUploadParams={this.getUploadParams}
          multiple
          getFilesFromEvent={this.getFilesFromEvent}
          // PreviewComponent={null}
          maxFiles={1}
          accept={
            accept || 'image/*'
          }
          ref={(ref) => (this.dropzoneRef = ref)}
          // onChangeStatus={this.handleChangeStatus}
        />
      </div>
    )
  }
}

export default renderField(UploadDocument)
