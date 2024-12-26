import React from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

const TooltipComponent = ({ children, id, title, placement = "top" }) => {
  return (
    <OverlayTrigger
      key={placement || "top"}
      placement={placement || "top"}
      overlay={<Tooltip id={id}>{title}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  )
}

export default TooltipComponent
