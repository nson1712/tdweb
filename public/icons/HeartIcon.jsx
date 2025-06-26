import * as React from "react"
import { memo } from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 30 35"
    {...props}
  >
    <rect width={32} height={32} x={1} y={1} fill="url(#a)" rx={16} />
    <rect
      width={33}
      height={33}
      x={0.5}
      y={0.5}
      stroke="#fff"
      strokeOpacity={0.3}
      rx={16.5}
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M10.821 11.129c1.954-1.67 4.472-1.366 6.174.121 1.7-1.488 4.19-1.77 6.166-.128 2.162 1.797 2.422 4.863.756 7.006-.577.745-1.653 1.825-2.732 2.854a126.944 126.944 0 0 1-2.946 2.709l-.016.014c-.118.106-.236.21-.345.293a1.44 1.44 0 0 1-.466.247 1.466 1.466 0 0 1-.835 0 1.474 1.474 0 0 1-.465-.246 5.963 5.963 0 0 1-.346-.294l-.016-.014a126.921 126.921 0 0 1-2.945-2.71c-1.08-1.028-2.155-2.108-2.733-2.853-1.672-2.15-1.365-5.193.75-7Zm6.142 3.37a.728.728 0 0 0-1.34-.095l-.891 1.78h-.278a.727.727 0 1 0 0 1.454h.727a.727.727 0 0 0 .65-.402l.306-.61.9 2.697a.727.727 0 0 0 1.34.095l.89-1.78h.279a.727.727 0 1 0 0-1.454h-.728a.728.728 0 0 0-.65.402l-.306.61-.9-2.698v.001Z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="a"
        x1={33}
        x2={-1.6}
        y1={1}
        y2={4.114}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E27D6F" />
        <stop offset={1} stopColor="#DA4936" />
      </linearGradient>
    </defs>
  </svg>
)
const HeartIcon = memo(SvgComponent)
export default HeartIcon