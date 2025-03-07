import React, { useEffect, useRef, useState }from 'react';
import Image from 'next/image';
import * as Api from "../../api/api";
import Button from '../../components/Button';
import { formatStringToNumber, getDepositPackage } from '../../utils/utils';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import GlobalStore from '../../stores/GlobalStore';
import { CopyOutlined } from '@ant-design/icons';
import { QRCode } from "react-qrcode-logo";
import imageLoader from '../../loader/imageLoader';
import { toast } from 'react-toastify';

const OpenChapterInfo = ({story, chapter, handleOpenChapter, handleSupport, availableCash, fullPriceStory, setShowWarningDepositSuccess, handlePaymentDepositAuto}) => {
  
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [contentTransfer, setContentTransfer] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [orderCode, setOrderCode] = useState('');
  const [paymentLinkId, setPaymentLinkId] = useState('');
  const [copiedAccountMessage, setCopiedAccountMessage] = useState("");
  const [copiedAmountMessage, setCopiedAmountMessage] = useState("");
  const [copiedDescriptionMessage, setCopiedDescriptionMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFetchData, setIsFetchData] = useState(false);
  const [isExpiredQR, setIsExpiredQR] = useState(false);
  
  const counter = useRef(0);
  const qrRef = useRef(null);
  const isOpenFull = useRef(true);

  useEffect(() => {
      if (chapter?.price > availableCash?.balance && !isFetchData) {
        handleRequestPayment();
      }
  }, [chapter, availableCash, fullPriceStory, executeRecaptcha]);

  useEffect(() => {
    // Chạy mỗi giây
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      counter.current = counter.current > 0 ? counter.current - 1 : 0;
      if (counter.current % 10 === 0 && counter.current > 20) {
        validatePaymentResult();
      }
    }, 1000);

    // Cleanup khi component bị unmount
    return () => clearInterval(timer);
  }, [qrCode]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsExpiredQR(true);
    } else {
      setIsExpiredQR(false);
    }
  }, [timeLeft]);
    

  const handleRequestPayment = async () => {
    try {
      if (!isFetchData) {
        setIsFetchData(true);
      const packageDeposit = await getDepositPackage(fullPriceStory?.remained);
      console.log("packageDeposit: ", packageDeposit);
      setAmount(packageDeposit.value);
      setQrUrl(packageDeposit.qrUrl);
      // if (cash === 0) {
      //   setShowWarningPackage(true);
      // } else {
      //   setLoading(true);
      //   console.log("Start submit form");
        if (!executeRecaptcha) {
          // console.log("Execute recaptcha not yet available");
          setIsFetchData(false);
          return;
        }
        // console.log("Start get token");
        const token = await executeRecaptcha("onSubmit");
        let data = {};
        data.token = token;
        data.amount = packageDeposit.value;
        // console.log('packageDeposit.value: ', packageDeposit.value);
        
        const timestamp = Date.now();
        data.requestId = GlobalStore.profile?.referralCode + "_" + timestamp;
        // console.log("referralCode: ", GlobalStore.profile?.referralCode);
        data.customerCode = GlobalStore.profile?.referralCode;

        const result = await Api.post({
          url: "/customer/public/customer/deposit/qr",
          data,
          hideError: true,
        });
        
      //   setLoading(false);
        if ("00" !== result?.data.code) {
          // alert(result?.data.message);
        } else {
          // console.log('Result create QR: ', result);
          const now = new Date();
          // Add 10 minutes to the current time
          const timePlusTenMinutes = Math.floor((new Date(now.getTime() + 10 * 60000) - now)/1000); // 10 minutes = 10 * 60 * 1000 milliseconds

          setAccountName(result?.data.accountName);
          setAccountNumber(result?.data.accountNumber);
          setContentTransfer(result?.data.contentTransfer);
          setAmount(result?.data.amount);
          setQrCode(result?.data.qrCode);
          setOrderCode(result?.data.orderCode);
          setPaymentLinkId(result?.data.paymentLinkId);
          setTimeLeft(timePlusTenMinutes);
          counter.current = timePlusTenMinutes;
        }
      }
    } catch (e) {
      console.log(e)
    }
    setIsFetchData(false);
  };

  const validatePaymentResult = async () => {
    try {
      if (orderCode) {
        const data = {
          orderCode: orderCode,
          paymentLinkId: paymentLinkId,
        };
        const result = await Api.post({
          url: '/customer/public/customer/deposit/qr/result',
          data,
          hideError: true
        });
        // console.log('result QR: ', result);
        if (result?.data?.code === 200) {
          setTimeLeft(0);
          toast(`Nạp kim cương thành công!${isOpenFull.current ? '\nHệ thống đang mở chương cho bạn....' : ''}`, {
            type: "success",
            theme: "colored",
          });
          // console.log('isOpenFull 1: ', isOpenFull.current);
          await handlePaymentDepositAuto(isOpenFull.current);
        }
      }
    } catch (e) {
      toast('Thanh toán không thành công. Vui lòng liên hệ Admin hỗ trợ.', {
          type: "error",
          theme: "colored",
      });
    }
  };

  const handleDownload = async () => {
    qrRef.current?.download("image/jpg", "ma-qr-chuyen-khoan");
  };

  const handleCheckboxChange = (event) => {
    isOpenFull.current = event.target.checked;
    // console.log('isOpenFull 0: ', isOpenFull.current);
  };

  const copyToClipboard = (code) => {
    let text = "";
    switch (code) {
      case "accountNumber":
        text = accountNumber || 'CAS0913431088';
        break;
      case "amount":
        text = amount;
        break;
      case "description":
        text = contentTransfer || 'Ung ho kc';
        break;
      default:
        text = "";
    }
    navigator.clipboard.writeText(text).then(
      () => {
        if (code === "accountNumber") {
          setCopiedAccountMessage("Đã copy! ");
        } else if (code === "amount") {
          setCopiedAmountMessage("Đã copy! ");
        } else if (code === "description") {
          setCopiedDescriptionMessage("Đã copy! ");
        }
      },
      () => {
        if (code === "accountNumber") {
          setCopiedAccountMessage("Copy lỗi");
        } else if (code === "amount") {
          setCopiedAmountMessage("Copy lỗi");
        } else if (code === "description") {
          setCopiedDescriptionMessage("Copy lỗi");
        }
      }
    );
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes} phút:${seconds < 10 ? `0${seconds}` : seconds} giây`;
  };

  return (
    <>
      {isFetchData ? 
        <p>Vui lòng chờ giây lát, hệ thống đang tải dữ liệu .... </p>
      : 
      chapter?.price <= availableCash?.balance ?
        <div className='box-login'>
          <p className='white-text' style={{'margin': '10px 20px', 'fontWeight': 'bold'}}>
            <span className='fl mr-[5px]'>Chương này nhà đăng đặt khoá.</span>
            <span className='fl mr-[5px]'>Hãy ủng hộ</span>
            <span className='fl mr-[5px]'>{formatStringToNumber(chapter?.price)}</span>
            <span className='fl  mr-[5px]'><img src={story?.contributorId ? '/images/red-diamond.png' : '/images/blue-diamond.png'} style={{'width': '25px'}}/></span>
            để đọc tiếp!
          </p>
          <div style={{'margin': '30px 10px', 'borderTop': '1px solid #fff'}}></div>
          {!story?.contributorId && 
            <>
              <div className='diamond-info'>
                <img src='/images/icon-check.png' style={{'width': '20px', 'marginRight': '5px'}}/>
                <p style={{'margin': '0px', 'fontSize': '14px', 'color': '#fff'}}>
                <span className='fl mr-[5px]'>Bạn có thể nạp kim cương</span>
                <span className='fl  mr-[5px]'><img src='/images/red-diamond.png' style={{'width': '15px', 'marginTop': '9px'}}/></span>
                để mở khoá chương này
                </p>
              </div>
              <div className='diamond-info'>
                <img src='/images/icon-check.png' style={{'width': '20px', 'marginRight': '5px'}}/>
                <p style={{'margin': '0px', 'fontSize': '14px', 'color': '#fff'}}>
                  <span className='fl mr-[5px]'>Nếu thiếu</span>
                  <span className='fl  mr-[5px]'><img src='/images/blue-diamond.png' style={{'width': '15px', 'marginTop': '9px'}}/></span>
                  <span className='fl mr-[5px]'>hệ thống sẽ tự quy đổi từ </span>
                  <span className='fl  mr-[5px]'><img src='/images/red-diamond.png' style={{'width': '15px', 'marginTop': '9px'}}/></span>
                  <span>theo tỉ lệ 1:1 khi ấn mở khoá chương. </span>
                </p>
              </div>
            </>
            
          }
          <div className='diamond-info'>
            <img src='/images/icon-check.png' style={{'width': '20px', 'marginRight': '5px'}}/>
            <p style={{'margin': '0px', 'fontSize': '14px', 'color': '#fff'}}>Bạn có thể "Đọc lại chương" của truyện này nhiều lần mà không cần ủng hộ thêm kim cương.</p>
          </div>
          <div className='diamond-info'>
            <img src='/images/icon-check.png' style={{'width': '20px', 'marginRight': '5px'}}/>
            <p style={{'margin': '0px', 'fontSize': '14px', 'color': '#fff'}}>Nếu truyện chưa hoàn, thì bạn cần ủng hộ thêm kim cương cho chương mới.</p>
          </div>
          {story?.contributorId && <div className='diamond-info'>
            <img src='/images/icon-check.png' style={{'width': '20px', 'marginRight': '5px'}}/>
            <p style={{'margin': '0px', 'fontSize': '14px', 'color': '#fff'}}>
            <span className='fl mr-[5px]'>Bạn có thể kiếm kim cương</span>
            <span className='fl mr-[5px]'>{chapter?.price}</span>
            <span className='fl  mr-[5px]'><img src='/images/red-diamond.png' style={{'width': '15px', 'marginTop': '9px'}}/></span>
            <span className=''>từ bình chọn truyện trên App. Tham khảo </span>
            <span className=''><a href='https://docgia-guide.toidoc.vn/ve-vang' style={{'color': '#03effd', 'textDecoration': 'underline'}}>Tại đây</a>!</span>
            </p>
          </div>}
          <a id={chapter?.price <= availableCash?.balance ? 'open-chapter-btn' : 'deposit-diamond-btn'} style={{'marginTop': '30px', 'display': 'flex', 'justifyContent': 'center'}}>
            <Button onClick={() => handleOpenChapter()} className='button-open-chapter'>{chapter?.price <= availableCash?.balance ? 'Mở khoá chương' : 'Nạp kim cương'}</Button>
          </a>
          <div style={{'marginTop': '30px', 'display': 'flex', 'justifyContent': 'center'}}>
          
            <Button onClick={() => handleSupport()} className='button-support-chapter' style={{'padding': '10px 20px'}}>
              <img src='/images/messenger.png' className='fl' style={{'width': '20px', 'height': '20px', 'marginRight': '10px'}}/>Hỗ trợ
            </Button>
          </div>
        </div>
        :
        <div className='box-login'>
          <p className='white-text my-[10px] mx-[20px] font-roboto'>
            <span className='fl mr-[5px]'>Chương này nhà đăng đặt khoá.</span>
            <span className='fl mr-[5px]'>Hãy ủng hộ</span>
            <span className='fl mr-[5px] text-[#02f094]'><strong>{formatStringToNumber(fullPriceStory?.remained)}</strong></span>
            <span className='fl  mr-[5px]'><img src={story?.contributorId ? '/images/red-diamond.png' : '/images/blue-diamond.png'} style={{'width': '25px'}}/></span>
            {story?.status === 'ACTIVE' ? 'để đọc Full truyện.\nVui lòng quét mã QR bên dưới để chuyển khoản ngay!' : 'để đọc các chương khoá hiện tại. Vui lòng nạp theo gói với mã QR bên dưới'}
          </p>
          {story?.status === 'PENDING' && <p className='white-text my-[10px] mx-[20px] text-sm'><i><strong>Lưu ý:</strong> Truyện này chưa ra full chương. Các chương ra mới tiếp theo 👉 bạn cần thêm kim cương</i></p>}

          <div className="text-xs box-transfer-info pt-[10px] px-[10px] pb-[20px]">
            {qrCode === '' ?
              <>
                <div className='flex justify-center'>
                  <div>
                    <div className='flex justify-center'>
                      <Image
                        loader={imageLoader}
                        height={140}
                        width={130}
                        src={qrUrl || '/images/qr-son.jpg'}
                        priority
                        className="bd-radius-10"
                      />
                    </div>
                    <div className='flex justify-center mt-[10px]'>
                      <a
                        className="bg-[#02f094] rounded-md px-3 py-1.5 text-[#000] font-semibold shadow-md"
                        href={qrUrl || '/images/qr-son.jpg'}
                        download="qr-ck.jpg"
                      >
                        Tải mã QR
                      </a>
                    </div>
                  </div>
                </div>
                <div style={{'margin': '20px 0px', 'borderTop': '0.5px solid #b9b9b9'}}></div>
                <p className="text-center text-md mb-[20px] mt-[20px] white-text mx-[20px]">
                  Hoặc bạn có thể Copy thông tin thanh toán dưới đây
                </p>
                <div style={{'margin': '0px 0px 20px 0px', 'borderTop': '0.5px solid #b9b9b9'}}></div>
              </>
              :
              isExpiredQR ? 
                <>
                  <p className='text-[16px] text-center text-[#ff7400] lh-15'>Mã QR đã hết hạn. Vui lòng bấm để tạo mã mới!</p>
                  <div onClick={handleRequestPayment} className='flex justify-center'>
                    <img src='/images/mask-qr.jpg' className='w-[180px] h-[180px]'/>
                  </div>
                </>
              :
              <>
                <div>
                  <p
                    className="text-[16px] text-center text-[#02f094] lh-15"
                    dangerouslySetInnerHTML={{
                      __html: `<strong class="text-yellow">GÓI NẠP ${formatStringToNumber(amount)} VNĐ.</strong> Mã QR chỉ có hiệu lực trong<br/><strong class="white-text">${formatTime(
                        timeLeft
                      )}</strong>`,
                    }}
                  />
                  <label className="flex items-center space-x-2 mb-[10px] ml-[5px]">
                    <input
                      type="checkbox"
                      checked={isOpenFull.current}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4"
                    />
                    <span className="white-text text-[16px]">Mở full tất cả các chương</span>
                  </label>
                  <div>
                    <QRCode
                      ref={qrRef}
                      value={qrCode}
                      size={200}
                      logoImage="/images/toidoc-t-logo.png" // Path to your logo image
                      logoWidth={50}
                      logoHeight={50}
                      eyeRadius={5}
                      eyeColor={"#3765af"}
                      fgColor="#5C95C6"
                      qrStyle={"dots"}
                      removeQrCodeBehindLogo={true}
                      logoPadding={8}
                      logoPaddingStyle={"circle"}
                      enableCORS={true}
                    />
                  </div>
                  <div className="flex justify-center mt-[10px]">
                    <Button
                      className="bg-[#02f094] rounded-md px-3 py-1.5 text-[#000] font-semibold shadow-md"
                      onClick={() => handleDownload()}
                    >
                      Tải mã QR
                    </Button>
                  </div>
                </div>
                <div style={{'margin': '20px 0px', 'borderTop': '0.5px solid #b9b9b9'}}></div>
                <p className="text-center text-md mb-[20px] mt-[20px] white-text mx-[20px]">
                  Hoặc bạn có thể Copy thông tin thanh toán dưới đây
                </p>
                <div style={{'margin': '0px 0px 20px 0px', 'borderTop': '0.5px solid #b9b9b9'}}></div>
              </>
            }
            {(!isExpiredQR || qrCode === '') &&
              <>
                <div>
                  <div className="m-2 flex">
                    <div className="mr-3 flex justify-center">
                      <img
                        loading="lazy"
                        width="50"
                        height="30"
                        decoding="async"
                        data-nimg="1"
                        className="rounded-full m-auto self-center"
                        style={{
                          color: "transparent",
                          backgroundColor: "#fff",
                          padding: "5px",
                        }}
                        src="https://img.bankhub.dev/OCB.png"
                      />
                    </div>
                    <div>
                      <p className="lh-1 text-lg text-[#fff] mb-[5px]">Ngân hàng thụ hưởng</p>
                      <p className="font-bold text-sm text-[#02f094]">Ngân hàng Phương Đông OCB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-7 m-2">
                    <div className="col-span-5 text-left">
                      <p className="lh-1 text-lg text-[#fff] mb-[5px]">1. Chủ tài khoản:</p>
                      <p className="font-bold text-sm text-[#02f094]">
                        {accountName || 'PHAM NGOC SON'}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-7 m-2">
                    <div className="col-span-5 text-left">
                      {qrCode !== '' ? 
                        <p className="lh-1 text-lg text-[#fff] mb-[5px]">
                          2. Ấn sao chép lấy số tài khoản <span className='text-[#feb313] text-sm'><strong><i>(Nhớ copy cả mã CAS)</i></strong></span>:
                        </p>
                        :
                        <p className="lh-1 text-lg text-[#fff] mb-[5px]">
                          2. Số tài khoản:
                        </p>
                      }
                      <p className="font-bold text-sm text-[#02f094]">
                        {accountNumber || 'CAS0913431088'}
                      </p>
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end w-[100px]">
                      <button
                        className="h-fit p-2 text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-md text-xs sm:text-sm text-center shadow-2xl hover:!text-black cursor-pointer"
                        onClick={() => copyToClipboard("accountNumber")}
                      >
                        {copiedAccountMessage || "Sao chép "}
                        <CopyOutlined />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-7 m-2">
                    <div className="col-span-5 text-left">
                      <p className="lh-1 text-lg text-[#fff] mb-[5px]">3. Số tiền:</p>
                      <p className="font-bold text-[#02f094] text-sm">
                        {formatStringToNumber(amount)} VNĐ
                      </p>
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end w-[100px] ">
                      <button
                        className="h-fit p-2 text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-md text-xs sm:text-sm text-center shadow-2xl hover:!text-black cursor-pointer"
                        onClick={() => copyToClipboard("amount")}
                      >
                        {copiedAmountMessage || "Sao chép "} <CopyOutlined />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-7 m-2">
                    <div className="col-span-5 text-left">
                      {qrCode !== '' ? 
                        <p className="lh-1 text-lg text-[#fff] mb-[5px]">
                          4. Ấn sao chép lấy nội dung: <span className='text-[#feb313] text-sm'><strong><i>(Không copy chính xác, kim cương sẽ không về TK)</i></strong></span>
                        </p>
                      :
                        <p className="lh-1 text-lg text-[#fff] mb-[5px]">
                          4. Nội dung CK:
                        </p>
                      }
                      <p className="text-[#02f094] font-bold text-sm">
                        {contentTransfer || 'Ung ho kc'}
                      </p>
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end w-[100px]">
                      <button
                        className="h-fit p-2 text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-md text-xs sm:text-sm text-center shadow-2xl hover:!text-black cursor-pointer"
                        onClick={() => copyToClipboard("description")}
                      >
                        {copiedDescriptionMessage || "Sao chép "} <CopyOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            }
            {qrCode === '' && 
              <button className="btnMain btnSecondDeposit" onClick={() => setShowWarningDepositSuccess()}>
                Báo CK thành công 👆
              </button>
            }
          </div>
          <div style={{'margin': '30px 10px', 'borderTop': '0.5px solid #b9b9b9'}}></div>
          
          
          <div className='flex justify-center'>
            <a href={`/nap-kim-cuong${GlobalStore.profile?.referralCode ? ('?ref=' + GlobalStore.profile?.referralCode + '&story=' + story?.slug + '&chapter=' + chapter?.slug) : ''}`} className="text-underline white-text">
              Xem thêm gói khác
            </a>
          </div>
        </div>
      }
    </>
  )
}


export default OpenChapterInfo;
