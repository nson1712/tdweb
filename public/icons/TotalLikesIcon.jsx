import * as React from "react";

const TotalLikesIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#A9B8D3"
      d="M1.335 7.564v3.947a1.128 1.128 0 0 0 1.128 1.128h1.692V6.436H2.463a1.128 1.128 0 0 0-1.128 1.128Z"
      opacity={0.12}
    />
    <path
      stroke="#A9B8D3"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.155 12.64V6.435m-2.82 1.128v3.947a1.128 1.128 0 0 0 1.128 1.128h7.571a1.692 1.692 0 0 0 1.672-1.434l.608-3.948a1.691 1.691 0 0 0-1.672-1.949H8.666a.564.564 0 0 1-.564-.564V2.751a1.39 1.39 0 0 0-1.39-1.39.464.464 0 0 0-.423.275L4.304 6.101a.564.564 0 0 1-.516.335H2.463a1.128 1.128 0 0 0-1.128 1.128Z"
    />
  </svg>
);
export default TotalLikesIcon;
