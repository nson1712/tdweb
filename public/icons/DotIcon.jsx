import * as React from "react";
const DotIcon = (props) => (
  <svg
    className="self-center"
    xmlns="http://www.w3.org/2000/svg"
    width={3}
    height={4}
    fill="none"
    {...props}
  >
    <circle cx={1.5} cy={2} r={1.5} fill="#D9D9D9" />
  </svg>
);
export default DotIcon;
