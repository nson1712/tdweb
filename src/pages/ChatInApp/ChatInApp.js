import { useState, useEffect, useRef } from 'react';
import styles from "./ChatInApp.module.scss";
import { QRCode } from 'react-qrcode-logo';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const qrRef = useRef(null);

  useEffect(() => {
    if (selectedOption === 'option2') {
    } else {
    }
  }, [selectedOption]);

  const handleDownload = async() => {
    qrRef.current?.download();
  }

  return (
    <div className={styles.container}>
      <div className={styles.toidocChatBox}>
        <h1 className={`${styles.title} ${styles.whiteColor}`}>Với Gói Premium, bạn sẽ nhận được các lợi ích sau</h1>
        <div className={styles.benefitItem}>
          <img src='/images/tick.png' className={styles.imgCheckIcon} />
          <p className={`${styles.emptyMarginP} ${styles.ml10} ${styles.whiteColor}`}>Bạn được đọc tất cả các truyện trên nền tảng của Toidoc mà không bị mất thêm kim cương.</p>
        </div>
        <div className={styles.benefitItem}>
          <img src='/images/tick.png' className={styles.imgCheckIcon} />
          <p className={`${styles.emptyMarginP} ${styles.ml10} ${styles.whiteColor}`}>Bạn không cần quan tâm đến truyện giá đắt hay rẻ.</p>
        </div>
        <div className={styles.benefitItem}>
          <img src='/images/tick.png' className={styles.imgCheckIcon} />
          <p className={`${styles.emptyMarginP} ${styles.ml10} ${styles.whiteColor}`}>Bạn không mất thêm kim cương đối với truyện đang ra chương mới.</p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => setSelectedOption('option1')} className={styles.button}>
          1 tháng Chỉ Với 79K
        </button>
        <button onClick={() => setSelectedOption('option2')} className={styles.button}>
          6 tháng Chỉ Với 499K
        </button>
        <button onClick={() => setSelectedOption('option3')} className={styles.button}>
          1 năm Chỉ Với 999K
        </button>
      </div>
      {selectedOption === 'option2' &&
        <>
        <QRCode
            ref={qrRef}
            value="00020101021238570010A000000727012700069704480113CAS09619196700208QRIBFTTA53037045405180005802VN62390835CSJYQPEPN82 TD000827097755000018000630403E7"
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
        <button type='button' onClick={() => handleDownload()} style={{ 'backgroundColor': '#04b17c', 'borderRadius': '5px', 'padding': '5px 10px', 'color': '#fff', 'margin': 'auto'}}>
						Download QR Code
					</button>

        </>
        }
    </div>
  );
};

// const styles = {
  
//   title: {
//     fontSize: '18px',
//     marginBottom: '20px',
//   },
//   buttonContainer: {
//     marginBottom: '20px',
//   },
//   button: {
//     fontSize: '16px',
//     margin: '5px',
//     padding: '10px',
//   },
// };

export default Home;
