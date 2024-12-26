import styles from "./PasswordCheck.module.scss";
import { useEffect, useState } from "react";

const PasswordCheck = (props) => {
  const { value, updateLevelProtection } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const steps = 5;
  const [stepChecks, setStepChecks] = useState([]);
  useEffect(() => {
    let newStepChecks = [];
    const specialRegex = /[^A-Z a-z0-9]/;
    if (value) {
      // lowercase
      [...value].forEach((c) => {
        if (
          isNaN(Number(c)) &&
          !specialRegex.test(c) &&
          c === c.toLowerCase() &&
          !newStepChecks.includes("lowercase")
        ) {
          newStepChecks.push("lowercase");
        }
      });
      // uppercase
      [...value].forEach((c) => {
        if (
          isNaN(Number(c)) &&
          !specialRegex.test(c) &&
          c === c.toUpperCase() &&
          !newStepChecks.includes("uppercase")
        ) {
          newStepChecks.push("uppercase");
        }
      });
      // onenumber
      [...value].forEach((c) => {
        if (
          !isNaN(Number(c)) &&
          c !== " " &&
          !newStepChecks.includes("onenumber")
        ) {
          newStepChecks.push("onenumber");
        }
      });
      // 8characterminimum
      if (
        [...value].length >= 8 &&
        !newStepChecks.includes("8characterminimum")
      ) {
        newStepChecks.push("8characterminimum");
      }
      // One special character
      [...value].forEach((c) => {
        if (
          (specialRegex.test(c) || c === " ") &&
          !newStepChecks.includes("specialcharacter")
        ) {
          newStepChecks.push("specialcharacter");
        }
      });
    }
    setStepChecks(newStepChecks);
    setCurrentStep(newStepChecks.length);
    updateLevelProtection && updateLevelProtection(newStepChecks.length);
  }, [value]);
  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        {Array.from(Array(steps).keys()).map((i) => (
          <div
            key={i}
            className={styles.stepProgressBar}
            style={{
              background:
                currentStep > i ? "#50D775" : "rgba(255, 255, 255, 0.2)",
            }}
          />
        ))}
      </div>
      <div className={styles.inforChecks}>
        <div className={styles.inforCheck}>
          <div className={styles.inforCheckItem}>
            <img
              src={
                stepChecks.includes("lowercase")
                  ? '/images/ellipse-active.svg'
                  : '/images/ellipse.svg'
              }
              alt="lowercase"
              className='mr-[10px]'
            />
            <span
              style={{
                color: stepChecks.includes("lowercase") ? "#50D775" : "#FFFFFF",
              }}
            >
              One lowercase character
            </span>
          </div>
          <div className={styles.inforCheckItem}>
            <img
              src={
                stepChecks.includes("specialcharacter")
                  ? '/images/ellipse-active.svg'
                  : '/images/ellipse.svg'
              }
              alt="specialcharacter"
              className='mr-[10px]'
            />
            <span
              style={{
                color: stepChecks.includes("specialcharacter")
                  ? "#50D775"
                  : "#FFFFFF",
              }}
            >
              One special character
            </span>
          </div>
          <div className={styles.inforCheckItem}>
            <img
              src={
                stepChecks.includes("8characterminimum")
                  ? '/images/ellipse-active.svg'
                  : '/images/ellipse.svg'
              }
              alt="8characterminimum"
              className='mr-[10px]'
            />
            <span
              style={{
                color: stepChecks.includes("8characterminimum")
                  ? "#50D775"
                  : "#FFFFFF",
              }}
              className='mr-[10px]'
            >
              8 character minimum
            </span>
          </div>
        </div>
        <div className={styles.inforCheck}>
          <div className={styles.inforCheckItem}>
            <img
              src={
                stepChecks.includes("uppercase")
                  ? '/images/ellipse-active.svg'
                  : '/images/ellipse.svg'
              }
              alt="uppercase"
              className='mr-[10px]'
            />
            <span
              style={{
                color: stepChecks.includes("uppercase") ? "#50D775" : "#FFFFFF",
              }}
            >
              One uppercase character
            </span>
          </div>
          <div className={styles.inforCheckItem}>
            <img
              src={
                stepChecks.includes("onenumber")
                  ? '/images/ellipse-active.svg'
                  : '/images/ellipse.svg'
              }
              alt="onenumber"
              className='mr-[10px]'
            />
            <span
              style={{
                color: stepChecks.includes("onenumber") ? "#50D775" : "#FFFFFF",
              }}
            >
              One number
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PasswordCheck;
