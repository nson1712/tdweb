import * as React from "react";
import { memo } from "react";
const SvgComponent = (props) => (
  <svg
    className="self-center"
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path
      fill="#5C95C6"
      d="M10.73 25.083h4.668V15.74h4.204l.462-4.644h-4.666V8.75c0-.644.522-1.167 1.166-1.167h3.5V2.917h-3.5a5.833 5.833 0 0 0-5.833 5.833v2.345H8.398l-.462 4.643h2.795v9.345Z"
    />
  </svg>
);
const FacebookIcon = memo(SvgComponent);
export default FacebookIcon;
