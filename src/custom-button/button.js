import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./button.css";

const Button = props => {
  const { label, size = "medium", color = "gray", filled, outlined, disabled, toggle, active, onClick, className } = props;

  const buttonClass = classnames("btn", {
    small: size === "small",
    medium: size === "medium",
    large: size === "large",
    disabled: disabled
  });

  let basicAppearance =
    filled || (toggle && active && filled)
      ? { backgroundColor: color, color: "white" }
      : outlined || (toggle && active && outlined)
      ? { border: `2px solid ${color}`, color: color }
      : toggle && active
      ? { color: color, filter: "brightness(95%)" }
      : { color: color };

  let toggleAppearance = toggle && !active && (filled ? { backgroundColor: "lightgrey", color: color } : outlined ? { border: `2px solid lightgrey`, color: color } : {});

  const buttonTheme = {
    ...basicAppearance,
    ...toggleAppearance
  };

  return disabled ? (
    <input disabled type="button" value={label} className={`${className} ${buttonClass}`} style={buttonTheme} />
  ) : (
    <input type="button" value={label} className={`${className} ${buttonClass}`} style={buttonTheme} onClick={onClick} />
  );
};

Button.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.any,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  filled: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  outlined: PropTypes.bool,
  size: PropTypes.string,
  toggle: PropTypes.bool
};

export default Button;
