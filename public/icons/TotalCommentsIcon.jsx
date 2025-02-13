import * as React from "react";

const TotalCommentsIcon = (props) => (
  <svg
    className="self-center"
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#A9B8D3"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 11h4a2 2 0 0 0 2-2V3.667a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2V9a2 2 0 0 0 2 2h1v2l3-2Z"
    />
  </svg>
);
export default TotalCommentsIcon;
