import "./ButtonClose.styles.scss";

const ButtonClose = ({ invert, onClick }) => {
  const invertClass = invert ? "btn-close--invert" : "";

  return (
    <button
      type="button"
      className={`btn-close ${invertClass}`}
      onClick={onClick}
    ></button>
  );
};

export default ButtonClose;
