import { Switch, Route } from "react-router-dom";
import ButtonGroup from "../../ButtonGroup";
import MenuDots from "../../MenuDots";
import { MessageBubble, MessageForm } from "../../Message";
import MessageList from "../../MessageList";
import MessageBox from "../../MessageBox";
import "./Main.styles.scss";
import { useSelector } from "react-redux";

const Main = () => {
  const { profileBarVisible } = useSelector((state) => state.ui);
  const profileClass = profileBarVisible ? "main--profile" : "";

  return (
    <div className={`main ${profileClass} main--upload`}>
      <Switch>
        <Route
          exact
          path="/search/:id"
          render={({ match }) => <MessageBox partner={match.params.id} />}
        />
        <Route
          exact
          path="/dialogs/:id"
          render={({ match }) => <MessageBox partner={match.params.id} />}
        />
        <Route path="/">
          <h1>PUSTO</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
