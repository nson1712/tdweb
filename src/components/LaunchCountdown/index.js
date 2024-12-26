import React, {useEffect, useMemo, useState} from "react";
import Countdown from "../../components/Countdown";
import styles from './LaunchCountdown.module.scss';

const LaunchCountdown = ({ days, hours, minutes, seconds }) => {
    const [time, setTime] = useState(days * 24 * 3600 + hours * 3600 + minutes * 60 + seconds);

    const remainTime = useMemo(() => {
        const days = Math.floor(time / 24 / 3600);
        const hours = Math.floor((time - days * 24 * 3600) / 3600);
        const minutes = Math.floor((time - days * 24 * 3600 - hours * 3600) / 60);
        const seconds = (time - days * 24 * 3600 - hours * 3600) % 60;

        return {
            days,
            hours,
            minutes,
            seconds
        }
    }, [time]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time => time !== 0 ? time - 1 : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1 className={styles.title}>
                Nhận ngay 50K kim cương khi đăng ký trải nghiệm trên App Toidoc
            </h1>
            <div className={styles.container}>
                {/* <Countdown prev={0} count={remainTime.days} label={'days'} /> */}
                {/* <Countdown prev={0} count={remainTime.hours} label={'hours'} /> */}
                <img src='/images/download-app/ket-thuc-sau.png' className={styles.imgFinger}/>
                <Countdown prev={0} count={remainTime.minutes} label={'Phút'} />
                <Countdown prev={0} count={remainTime.seconds} label={'Giây'} />
            </div>
            
        </div>
    );
};

export default LaunchCountdown;