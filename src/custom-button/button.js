import React, {useState} from "react";
import PropTypes from "prop-types";

const Button = props => {
  const { label, size = "medium", color = "gray", filled, outlined, disabled, toggle, active, onClick, className } = props;
  const [hover, setHover] = useState(false)

  const hoverEffect = status => {
    status === 'disabled' && null
    status === 'enabled' && setHover(!hover)
  }

  let basicAppearance =
    filled || (toggle && active && filled)
      ? { backgroundColor: color, color: "white" }
      : outlined || (toggle && active && outlined)
      ? { border: `2px solid ${color}`, color: color }
      : toggle && active
      ? { color: color, filter: "brightness(95%)" }
      : { color: color };

  let toggleAppearance = toggle && !active && (filled ? { backgroundColor: "lightgrey", color: color } : outlined ? { border: `2px solid lightgrey`, color: color } : {});

  let hoverStyle = hover && {  cursor: "pointer", filter: "brightness(95%)"}

  let disabledStyle = disabled && {  cursor: "default", filter: "brightness(100%)", opacity: "0.5"}

  let sizeStyle = size === 'small' ? {  width: "auto", height: "25px",} : size === 'medium' ? {  width: "auto", height: "30px", fontSize: "17px",} : size === 'large' ? {  width: "auto", height: "40px", fontSize: "20px",} : {  width: "auto", height: "30px", fontSize: "17px",}

  const buttonTheme = {
    textAlign: "center",
    borderRadius: "3px",
    ...basicAppearance,
    ...toggleAppearance,
    ...hoverStyle,
    ...disabledStyle,
    ...sizeStyle,
  };

  return disabled ? (
    <input disabled type="button" value={label} className={`${className}`} style={buttonTheme} onMouseOver={() => hoverEffect('disabled')} onMouseLeave={() => setHover(!hover)}/>
  ) : (
    <input type="button" value={label} className={`${className}`} style={buttonTheme} onClick={onClick} onMouseOver={() => hoverEffect('enabled')} onMouseLeave = {() => setHover(!hover)} />
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
