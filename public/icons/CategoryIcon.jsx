import * as React from "react";
import { memo } from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width={7} height={7} x={4} y={13} fill="#3ae4de" rx={1.5} />
    <circle cx={16.5} cy={16.5} r={3.5} fill="#ff3446" />
    <path
      fill="#ffdc00"
      d="M9.11 11c-1.12 0-1.78-1.26-1.15-2.17l2.87-4.2c.56-.82 1.78-.83 2.35 0l2.87 4.21c.63.92-.03 2.17-1.15 2.17H9.12z"
    />
    <path d="M9.5 20.5h-4c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2zm-4-7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1zM16.5 20.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-7c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zM14.89 11.5H9.11c-1.54 0-2.41-1.72-1.56-2.96l2.87-4.2a1.915 1.915 0 0 1 3.17 0l2.87 4.21c.85 1.24-.03 2.96-1.56 2.96zm-3.65-6.6L8.37 9.1a.89.89 0 0 0 .74 1.39h5.78c.72 0 1.14-.8.74-1.39l-2.87-4.21a.925.925 0 0 0-1.52 0z" />
  </svg>
);
const CategoryIcon = memo(SvgComponent);
export default CategoryIcon;
