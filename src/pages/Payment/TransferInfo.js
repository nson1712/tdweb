import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import Header from '../../components/Header/Header'
import { observer } from 'mobx-react'
import Router, { useRouter } from 'next/router'
import HeaderPayment from './HeaderPayment'
import FooterDesktop from '../../components/FooterDesktop'
import { QRCode } from 'react-qrcode-logo';
import { formatStringToNumber} from '../../utils/utils'
import Button from '../../components/Button/Button'

const TransferInfo = () => {
  const [ accountName, setAccountName ] = useState('')
  const [ accountNumber, setAccountNumber ] = useState('')
  const [ amount, setAmount ] = useState(0)
  const [ description, setDescription ] = useState('')
  const [ qrCode, setQrCode ] = useState('')
  const [copiedAccountMessage, setCopiedAccountMessage] = useState('');
  const [copiedAmountMessage, setCopiedAmountMessage] = useState('');
  const [copiedDescriptionMessage, setCopiedDescriptionMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const router = useRouter()
  const qrRef = useRef(null);
  const counter = useRef(0);
  const orderCode = useRef('');
  const paymentId = useRef('');

  useEffect(() => {
    const dateTimeStr = router.query.expriedAt;
    console.log('expiredAt: ', dateTimeStr);
    const reverseDateTime = dateTimeStr === '' ? new Date() : new Date(dateTimeStr);
    console.log('reverseDateTime: ', reverseDateTime);
    const now = new Date();
    const duration = reverseDateTime - now;
    console.log('duration:', duration);
    const remainTime = Math.floor(duration/1000);
    setTimeLeft(remainTime);
    counter.current = remainTime;

    setAccountName(router.query.accountName || '')
    setAccountNumber(router.query.accountNumber || '')
    setAmount(router.query.amount || '')
    setDescription(router.query.description || '')
    setQrCode(router.query.qrCode || '')
    orderCode.current = (router.query.order || '')
    paymentId.current = (router.query.paymentId || '')
  }, [router.query.accountName, router.query.accountNumber, router.query.amount, router.query.description, router.query.qrCode, router.query.expriedAt])

  useEffect(() => {
    // Chạy mỗi giây
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      counter.current = counter.current > 0 ? (counter.current - 1) : 0;
      if (counter.current % 5 === 0 && counter.current > 0) {
        validatePaymentResult();
      }
    }, 1000);

    // Cleanup khi component bị unmount
    return () => clearInterval(timer);
  }, []);

  // Hàm để chuyển đổi giây sang phút và giây
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes} phút:${seconds < 10 ? `0${seconds}` : seconds} giây`;
  };

  const validatePaymentResult = async() => {
    try {
      if (orderCode.current) {
        const data = {
          orderCode: orderCode.current,
          paymentLinkId: paymentId.current
        }
        const result = await axios.post(`https://api.toidoc.vn/customer/public/customer/deposit/qr/result`, data);
        if (result?.data?.data.code === 200) {
          Router.push('/nap-kim-cuong/success')
        } else if (result?.data?.data.code !== 201) {
          Router.push('/nap-kim-cuong/failed')
        }
      }
    } catch(e) {
      Router.push('/nap-kim-cuong/failed')
    }
  }


  const handleDownload = async() => {
    qrRef.current?.download('image/jpg', 'ma-qr-chuyen-khoan');
  }

  const copyToClipboard = (code) => {
    let text = ''
    switch (code) {
      case 'accountNumber':
        text = accountNumber;
        break;
      case 'amount':
        text = amount;
        break;
      case 'description':
        text = description;
        break;
      default:
        text = '';
    }
    navigator.clipboard.writeText(text).then(
      () => {
        if (code === 'accountNumber') {
          setCopiedAccountMessage('Đã copy')
        } else if (code === 'amount') {
          setCopiedAmountMessage('Đã copy')
        } else if (code === 'description') {
          setCopiedDescriptionMessage('Đã copy')
        }
      },
      () => {
        if (code === 'accountNumber') {
          setCopiedAccountMessage('Copy lỗi')
        } else if (code === 'amount') {
          setCopiedAmountMessage('Copy lỗi')
        } else if (code === 'description') {
          setCopiedDescriptionMessage('Copy lỗi')
        }
      }
    );
  };

  return (
    <CommonLayout active='HOME'>
      <div>
        <div className='header-payment'>
          <Header/>
        </div>
        <div className='relative max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] flex flex-col justify-center text-second-color'>
          <HeaderPayment />
          {timeLeft <= 0 ?
            <div style={{'marginTop': '20%'}}>
              <img src={'/images/expired_at.png'} className='w-[200px] imgCenter'/>
              <p className='text-[20px] font-bold main-text text-center mt-[20px] mb-[5px]'>
                Thông Tin Chuyển Khoản Đã Hết<br/>Hiệu Lực.
              </p>
              <p className='text-[16px] main-text text-center'>
                <i>(Vui lòng bấm vào nút bên dưới để tạo mới.)</i>
              </p>
              <Button className='btnMain btnSecond max-w-[300px] mx-auto mt-[20px]'
                onClick={(e) => {
                  Router.push('/nap-kim-cuong')
                }}
              >
                Nạp gói kim cương khác
              </Button>
              <Button className='btnSecond-Second max-w-[300px] mx-auto'
                onClick={(e) => {
                  window.open(`https://m.me/185169981351799?text=Mình qua web với nội dung ${description} không được. Hỗ trợ giúp mình với.`)
                }}
              >
                Liên hệ hỗ trợ
              </Button>
            </div>
            :
            <>
              <p className='text-[20px] font-bold main-text text-center mb-[0px]'>
                Thông Tin Chuyển Khoản
              </p>
              <p className='text-[16px] main-text text-center' dangerouslySetInnerHTML={{__html: `Sẽ hết hạn sau <strong>${formatTime(timeLeft)}</strong> nữa`}} />
              <div className='pl-[20px] pr-[20px] mb-[20px]'>
                <p className='text-[14px] font-bold mb-[0px]'>Hãy ấn nút Copy thông tin chuyển khoản bên dưới</p>
                <p className='text-[14px] text-red'><i>(Lưu ý chỉ copy đúng các thông tin, thì kim cương mới tự động về tài khoản của bạn)</i></p>
                <div className="text-xs box-transfer-info">
                  <div>
                    <div className="m-2 flex">
                      <div className="mr-3 flex justify-center">
                        <img loading="lazy" width="50" height="30" decoding="async" data-nimg="1" className="rounded-full m-auto self-center" style={{'color':'transparent',  'background-color': '#fff', 'padding': '5px'}} src="https://bidv.com.vn/wps/wcm/connect/48a10028-99d9-4b2c-9e19-5541dbb16a73/Header.png?MOD=AJPERES&attachment=true&id=1648629012586"/>
                      </div>
                      <div>
                        <p className="text-sm text-[#fff]">Ngân hàng thụ hưởng</p>
                        <p className="font-bold text-sm text-[#fff]">Ngân hàng Đầu Tư & Phát Triển BIDV</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-7 m-2">
                      <div className="col-span-5 text-left">
                        <p className="text-sm text-[#fff]">1. Chủ tài khoản:</p>
                        <p className="font-bold text-sm text-[#fff]">{accountName}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-7 m-2">
                      <div className="col-span-5 text-left">
                        <p className="text-sm text-[#fff]">2. Số tài khoản (nhớ copy cả mã CAS):</p>
                        <p className="font-bold text-sm text-[#fff]">{accountNumber}</p>
                      </div>
                      <div className="col-span-2 text-right flex items-center justify-end">
                        <button className="text-xs text-[#fff] bg-[#7f968b] py-1 px-2 rounded-md font-bold self-center"
                          onClick={() => copyToClipboard('accountNumber')}>{copiedAccountMessage || 'Sao chép'}</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-7 m-2">
                      <div className="col-span-5 text-left">
                        <p className="text-sm text-[#fff]">3. Số tiền:</p>
                        <p className="font-bold text-[#fff] text-sm">{formatStringToNumber(amount)}VNĐ</p>
                      </div>
                      <div className="col-span-2 text-right flex items-center justify-end">
                        <button className="text-xs text-[#fff] bg-[#7f968b] py-1 px-2 rounded-md font-bold self-center"
                          onClick={() => copyToClipboard('amount')}>{copiedAmountMessage || 'Sao chép'}</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-8 m-2">
                      <div className="col-span-6 text-left">
                        <p className="text-sm text-[#fff]">4. Nội dung chuyển khoản:</p>
                        <p className="text-[#fff] font-bold text-sm">{description}</p>
                      </div>
                      <div className="col-span-2 text-right flex items-center justify-end">
                        <button className="text-xs text-[#fff] bg-[#7f968b] py-1 px-2 rounded-md font-bold self-center"
                          onClick={() => copyToClipboard('description')}>{copiedDescriptionMessage || 'Sao chép'}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <br/>
                {qrCode && 
                  <>
                    <p className='text-[14px] font-bold mb-[0px]'>Hoặc bạn có thể quyét mã QR dưới đây</p>
                    <div>
                      <QRCode
                        ref={qrRef}
                        value={qrCode}
                        size={200}
                        logoImage='/images/toidoc-t-logo.png' // Path to your logo image
                        logoWidth={50}
                        logoHeight={50}
                        eyeRadius={5}
                        eyeColor={'#3765af'}
                        fgColor='#5C95C6'
                        qrStyle={'dots'}
                        removeQrCodeBehindLogo={true}
                        logoPadding={8}
                        logoPaddingStyle={'circle'}
                        enableCORS={true}
                      />
                      <div className='vertical-center'>
                        <button type='button' onClick={() => handleDownload()} style={{ 'backgroundColor': '#04b17c', 'borderRadius': '5px', 'padding': '5px 10px', 'color': '#fff', 'marginTop': '20px' }}>
                          Tải mã QR Code
                        </button>
                      </div>
                    </div>
                  </>
                }
                <Button className='btnSecond-Second'
                  onClick={() => {
                    window.open(`https://m.me/185169981351799?text=Mình nạp qua web không được. Hỗ trợ giúp mình với.`, "_blank", "Toidoc");
                  }}
                >
                Báo lỗi không nạp được
                </Button>
              </div>
            </>
          }
          <FooterDesktop />
        </div>
      </div>
    </CommonLayout>
  )
}

export default observer(TransferInfo)
