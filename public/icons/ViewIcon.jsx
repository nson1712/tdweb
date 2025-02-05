import * as React from "react";

const ViewIcon = (props) => (
  <svg
    className="self-center"
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={8}
    fill="none"
    {...props}
  >
    <path
      fill="#5C95C6"
      d="M4.984 7.5c2.25 0 4-1.938 4.75-3.063.313-.437.313-1 0-1.437-.75-1.063-2.5-3-4.75-3s-4 1.938-4.75 3.063c-.312.437-.312 1 0 1.374.75 1.125 2.5 3.063 4.75 3.063Zm0-5.625c1.063 0 1.875.813 1.875 1.875a1.842 1.842 0 0 1-1.875 1.875A1.842 1.842 0 0 1 3.11 3.75c0-1.063.813-1.875 1.875-1.875Z"
    />
  </svg>
);
export default ViewIcon;
