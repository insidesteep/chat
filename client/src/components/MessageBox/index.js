import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "../ButtonGroup";
import MenuDots from "../MenuDots";
import { MessageForm } from "../Message";
import MessageList from "../MessageList";
// import { messages } from "../../fakeData";
import { fetchMessages } from "../../store/message/message.thunk";
import Scrollbar from "react-scrollbars-custom";
import { useParams } from "react-router";

const MessageBox = ({ partner }) => {
  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const a = useParams();
  console.log(a);

  useEffect(() => {
    console.log("PARNTER", partner);
    dispatch(fetchMessages(partner));
  }, [partner]);

  return (
    <>
      <div className="main__top">
        <ButtonGroup titles={["chat", "media"]} />
      </div>
      <div className="main__middle">
        <Scrollbar>
          <MessageList messages={messages} />
        </Scrollbar>
      </div>
      <div className="main__footer">
        <div className="main__footer-menu">
          <MenuDots />
        </div>
        <div className="main__footer-form">
          <MessageForm to={partner} />
        </div>
      </div>
    </>
  );
};

export default MessageBox;
