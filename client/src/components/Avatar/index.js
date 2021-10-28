import "./Avatar.styles.scss";

const Avatar = ({ image, width = 44, height = 44, onClick }) => {
  return (
    <img
      className="avatar"
      src={image}
      width={width + "px"}
      height={height + "px"}
      onClick={onClick}
    />
  );
};

export default Avatar;
