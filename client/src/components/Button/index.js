import "./Button.styles.scss";
import arrowDown from "../../assets/img/arrow-down-icon.svg";

const Button = ({ value, indicator, colorName, iconSrc, dropdown = [] }) => {

  const colorClass = colorName ? `button--${colorName}` : "";
  const indicatorClass = indicator ? `button__indicator--${indicator}` : "";
  const dropdownClass = dropdown.length > 0 ? "button--dropdown" : "";

  return (
    <button className={`button ${colorClass} ${dropdownClass}`}>
      {indicator && (
        <span className={`button__indicator ${indicatorClass}`}></span>
      )}
      {iconSrc && <img className="button__icon" src={iconSrc} />}
      {value}
      {dropdown.length > 0 && <img className="button__arrow" src={arrowDown} />}
      {dropdown.length > 0 && (
        <ul className="button__dropdown">
          {dropdown.map((d, idx) => (
            <li key={idx} className="button__dropdown-item">
              {d}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
};

export default Button;
