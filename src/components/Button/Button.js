import React from "react";
import classNames from "classnames";
import Loader from "react-loader-spinner";
import classes from "./Button.module.scss";

const Button = ({
  id = "",
  loading = false,
  loadingColor = "#ffffff",
  className = "",
  children,
  onClick,
  disabled = false,
  type = "button",
  customLoader = null,
}) => (
  <button
    id={id}
    className={classNames(
      classes.btn,
      className,
      loading && classes.eventNone,
      disabled && classes.disabled
    )}
    onClick={onClick}
    type={type}
    disabled={disabled || loading}
  >
    {children}
    {loading && (
      <div className={classNames(classes.loader, customLoader)}>
        <Loader
          type="Oval"
          color={loadingColor || "#ffffff"}
          height={16}
          width={16}
        />
      </div>
    )}
  </button>
);

export default Button;
