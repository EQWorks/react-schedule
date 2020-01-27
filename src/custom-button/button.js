import React, {useState} from "react";
import PropTypes from "prop-types";

const Button = props => {
  const { label, size, color='gray', width = 'auto', border = 'none', borderRadius = '3px', basic, filled, outlined, disabled, 
          toggle, active, onClick, onMouseOver, onMouseDown, onMouseUp, className, overflow='hidden', fontSize } = props;
  const [hover, setHover] = useState(false)

  const hoverEffect = status => {
    status === 'disabled' && null
    status === 'enabled' && setHover(true)
  }

  let basicAppearance =
    filled || (toggle && active && filled)
      ? { backgroundColor: color, color: "white" }
      : outlined || (toggle && active && outlined)
      ? { border: `2px solid ${color}`, color: color }
      : toggle && active
      ? { color: color, filter: "brightness(95%)" }
      : { color: color };

  let toggleAppearance = 
    toggle && !active && (filled ? { backgroundColor: "lightgrey", color: 'gray' } 
      : outlined 
      ? { border: `2px solid lightgrey`, color: color } 
      : {color: color});

  let toggleAppearanceBasic = 
    toggle && !active && basic && (filled ? { backgroundColor: "white", color: 'gray', border: '1px solid lightgrey' } 
      : outlined 
      ? { border: `2px solid lightgrey`, color: color } 
      : {color: color});

  let hoverStyle = hover && {  cursor: "pointer", filter: "brightness(95%)"}

  let disabledStyle = disabled && {  cursor: "default", opacity: "0.5"}

  let sizeStyle = 
    size === 'small' 
      ? {  width: width, height: "25px",} 
      : size === 'medium' 
      ? {  width: width, height: "30px", } 
      : size === 'large' 
      ? {  width: width, height: "40px", } 
      : {}

  let buttonBorder = basic ? {border: '1px solid lightgrey'} : outlined ? {} : {border: border}

  const buttonTheme = {
    textAlign: "center",
    overflow: overflow,
    fontSize: fontSize,
    borderRadius: borderRadius,
    ...basicAppearance,
    ...toggleAppearance,
    ...toggleAppearanceBasic,
    ...hoverStyle,
    ...disabledStyle,
    ...sizeStyle,
    ...buttonBorder
  };

  return disabled ? (
    <input disabled type="button" value={label} className={`${className}`} style={buttonTheme} onMouseOver={() => hoverEffect('disabled')} />
  ) : (
    <input type="button" value={label} className={`${className}`} style={buttonTheme} onClick={(e) => onClick(e, {...props})} 
          onMouseOver={onMouseOver} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseEnter={() => hoverEffect('enabled')} onMouseLeave = {() => setHover(false)} />
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
  toggle: PropTypes.bool,
  overflow: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.string,
  onMouseOver: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  basic: PropTypes.bool
};

export default Button;
