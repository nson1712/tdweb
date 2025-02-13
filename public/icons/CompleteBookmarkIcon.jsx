import * as React from "react";
import { memo } from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={26}
    fill="none"
    {...props}
  >
    <path
      fill="url(#cpbma)"
      stroke="#E8F8EC"
      d="M6.859.554c-.707.058-1.4.185-2.065.524a5.3 5.3 0 0 0-2.316 2.316c-.338.664-.465 1.357-.523 2.063-.056.67-.056 1.485-.056 2.434V23.8a1.7 1.7 0 0 0 2.543 1.476L12 20.959l7.557 4.318A1.7 1.7 0 0 0 22.1 23.8V7.89c0-.95 0-1.764-.055-2.433-.057-.707-.185-1.4-.523-2.064a5.3 5.3 0 0 0-2.316-2.316C18.542.74 17.849.612 17.143.554 16.472.5 15.657.5 14.708.5H9.292c-.95 0-1.765 0-2.433.054Zm3.587 11.703.354.354.353-.354 4.548-4.548a.7.7 0 0 1 .99.99l-5.397 5.396a.7.7 0 0 1-.99 0L7.909 11.7a.7.7 0 0 1 .99-.99l1.548 1.548Z"
    />
    <defs>
      <linearGradient
        id="cpbma"
        x1={2.399}
        x2={23.03}
        y1={1}
        y2={23.7}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5EBF74" />
        <stop offset={1} stopColor="#3CA35F" />
      </linearGradient>
    </defs>
  </svg>
);
const CompleteBookmarkIcon = memo(SvgComponent);
export default CompleteBookmarkIcon;
