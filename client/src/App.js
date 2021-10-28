import { useEffect } from "react";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { LoginView, RegistrationView, HomeView } from "./views";
import { authorization } from "./store/auth/auth.thunk";
import { logout } from "./store/auth/auth.slice";
import Preloader from "./components/Preloader";

function App() {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookie.get("token")) {
      dispatch(authorization());
    } else {
      dispatch(logout());
    }
  }, []);

  return (
    <div className="app">
      <Router>
        {loading ? (
          <Preloader />
        ) : (
          <Switch>
            <Route
              exact
              path={[
                "/",
                "/dialogs/",
                "/dialogs/*",
                "/contacts",
                "/groups",
                "/search",
                "/search/*",
              ]}
              component={HomeView}
            />
            <Route path="/login" component={LoginView} />
            <Route path="/registration" component={RegistrationView} />
            <Redirect to="/" />
          </Switch>
        )}
      </Router>
      {/* <Avatar />
      <Dialog active isMe unreadCount={3} />
      <Dialog unreadCount={10} />
      <MessageBubble infoType="media" text="Hello m8!" date="15:03" />
      <MessageBubble text="Thank you Phillip!" date="15:05" type="orange" />
      <MessageForm />
      <ButtonGroup titles={["chat", "media"]} />
      <hr />
      <ButtonGroup type="icon" icons={svgIcons} />
      <Button value="Available" indicator="online" />
      <Button value="Call" colorName="pink" iconSrc={callIcon} />
      <Button
        value="working"
        indicator="working"
        dropdown={["online", "offline", "working"]}
      />
      <ButtonClose />
      <ButtonClose invert/> */}
    </div>
  );
}

export default App;
