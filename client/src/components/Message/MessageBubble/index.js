import moment from "moment";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./MessageBubble.styles.scss";
import cameraIcon from "../../../assets/img/camera-icon.svg";
import downloadIcon from "../../../assets/img/download-icon.svg";
import { convertToMb, correctFilePath } from "../../../utils";

const MessageBubble = ({ type, text, date, infoType, attachments }) => {
  const settings = {
    spacing: 15,
    slidesPerView: 3,
  };

  const [sliderRef] = useKeenSlider({ ...settings });

  return (
    <div
      className={`message-bubble ${
        type === "orange" ? "message-bubble--orange" : ""
      } ${
        attachments && attachments.images && attachments.images.length > 0
          ? "message-bubble--media"
          : ""
      }`}
    >
      <div className="message-bubble__blok1">
        <p className="message-bubble__text">{text}</p>
      </div>
      {attachments && attachments.images && attachments.images.length > 0 && (
        <div className="message-bubble__blok2">
          <div ref={sliderRef} className="keen-slider message-bubble__slider">
            {attachments.images.map((img, idx) => (
              <div key={idx} className="keen-slider__slide">
                <img src={correctFilePath(img.path)} />
              </div>
            ))}
          </div>
        </div>
      )}
      {attachments && attachments.files && attachments.files.length > 0 && (
        <div className="message-bubble__files">
          {attachments.files.map((file, idx) => (
            <div className="message-bubble__file">
              <div className="message-bubble__file-download"></div>
              <div className="message-bubble__file-container">
                <span className="message-bubble__file-ext">{file.type}</span>
              </div>
              <div className="message-bubble__file-info">
                <p className="message-bubble__file-name">
                  <a href={correctFilePath(file.path)}>{file.fileName}</a>
                </p>
                <p className="message-bubble__file-size">{`${file.type.toUpperCase()} - ${convertToMb(
                  file.size
                )} MB`}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="message-bubble__info">
        <span className="message-bubble__media-count">
          {attachments?.images?.length}x
        </span>
        <img className="message-bubble__media-img" src={cameraIcon} />
        <span className="message-bubble__date">
          {moment(date).format("HH:MM")}
        </span>
        <div className="message-bubble__unread">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
