import moment from "moment";
import Avatar from "../Avatar";
import "./Dialog.styles.scss";

const Dialog = ({
  active = false,
  unread = false,
  status = "offline",
  isMe = false,
  unreadCount,
  message,
  userName,
  date,
  photo,
}) => {
  const statusClasses = {
    offline: "dialog--status-offline",
    online: "dialog--status-online",
    working: "dialog--status-working",
  };

  return (
    <div
      className={`dialog ${isMe ? "dialog--isMe" : ""} ${
        active ? "dialog--active" : ""
      }  ${unread ? "dialog--unread" : ""} ${statusClasses[status]}`}
    >
      <div className="dialog__blok-left">
        <div className="dialog__avatar">
          <Avatar image={photo} />
        </div>
        <div className="dialog__info">
          <p className="dialog__name">{userName}</p>
          <p className="dialog__message">{message}</p>
        </div>
      </div>
      <div className="dialog__extra">
        <span className="dialog__date">
          {moment(date).format("DD/MM/YYYY")}
        </span>
        <div className="dialog__status">
          <span></span>
          <span></span>
          <div className="dialog__message-new">{unreadCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
