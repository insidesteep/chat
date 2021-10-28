import { Link } from "react-router-dom";
import "./Login.styles.scss";
import googlePlusIcon from "../../../assets/img/google-plus-icon.svg";

const Login = () => {
  const handleSubmit = () => {
    window.open(`${process.env.REACT_APP_API_URL}/api/v1/auth/google`, "_self");
  };

  return (
    <div className="login">
      <h3 className="login__title">Account Login</h3>
      <form className="login__form">
        <div className="registration__field">
          <input className="registration__input" placeholder="Email" />
        </div>
        <div className="registration__field">
          <input className="registration__input" placeholder="Password" />
        </div>
        <div className="login__field">
          <button className="login__submit">Login</button>
        </div>
        <h5>Or Sign Up Using</h5>
        <div className="login__field">
          <button
            type="button"
            className="login__submit login__submit--google"
            onClick={handleSubmit}
          >
            <img src={googlePlusIcon} /> Sign In With Google
          </button>
        </div>
        <h5>
          Not a member?
          <Link className="login__link" to="/registration">
            Signup now
          </Link>
        </h5>
      </form>
    </div>
  );
};

export default Login;
