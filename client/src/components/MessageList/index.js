import { useDispatch, useSelector } from "react-redux";
import { toggleProfileBar } from "../../store/ui/ui.slice";
import { fetchProfile } from "../../store/user/user.thunk";
import Avatar from "../Avatar";
import { MessageBubble } from "../Message";

import "./MessageList.styles.scss";

const MessageList = ({ messages = [] }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const openProfile = (id) => {
    dispatch(toggleProfileBar());
    dispatch(fetchProfile(id));
  };

  return (
    <div className="message-list">
      {messages.map((m, idx) => (
        <div
          key={idx}
          className={`message-list__item ${
            m.user.id === user._id ? "message-list__item--me" : ""
          }`}
        >
          <div className="message-list__user">
            <div className="message-list__name">{m.user.name}</div>
            <Avatar
              image={m.user.photo}
              onClick={() => openProfile(m.user.id)}
            />
          </div>
          <div className="message-list__content">
            {m.data.map((item, i) => (
              <div className="message-list__message">
                <MessageBubble
                  key={i}
                  {...item}
                  type={m.user.id === user._id ? "orange" : ""}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
