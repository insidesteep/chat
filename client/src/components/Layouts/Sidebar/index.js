import { Scrollbar } from "react-scrollbars-custom";
import { Switch, Route } from "react-router-dom";
import Avatar from "../../Avatar";
import Button from "../../Button";
import DialogList from "../../DialogList.js";
import MenuDots from "../../MenuDots";
import ButtonGroup from "../../ButtonGroup";
import { Search } from "../../Search";
import { useSelector } from "react-redux";
import "./Sidebar.styles.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchConversations } from "../../../store/conversation/conversation.thunk";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const { conversations } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConversations());
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="dialog">
          <div className="dialog__blok-left">
            <div className="dialog__avatar">
              <Avatar image={user.avatar} />
            </div>
            <div className="dialog__info">
              <p className="dialog__name">{user.name}</p>
              <Button
                value="working"
                indicator="working"
                dropdown={["online", "working"]}
              />
            </div>
          </div>
          <div className="dialog__extra">
            <MenuDots />
          </div>
        </div>
      </div>
      <div className="sidebar__main">
        <Scrollbar>
          <Switch>
            <Route path="/dialogs">
              <DialogList dialogs={conversations} />.
            </Route>
            <Route path="/contacts">
              <DialogList dialogs={conversations} />
            </Route>
            <Route path="/groups">
              <DialogList dialogs={conversations} />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
          </Switch>
        </Scrollbar>
      </div>
      <div className="sidebar__footer">
        <ButtonGroup type="icon" />
      </div>
    </div>
  );
};

export default Sidebar;
