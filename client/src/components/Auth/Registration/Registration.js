import { Link } from "react-router-dom";
import "./Registration.styles.scss";
import googlePlusIcon from "../../../assets/img/google-plus-icon.svg";

const Registration = () => {
  return (
    <div className="registration">
      <h3 className="registration__title">Create Account</h3>
      <form className="registration__form">
        <div className="registration__field">
          <input className="registration__input" placeholder="Email" />
        </div>
        <div className="registration__field">
          <input className="registration__input" placeholder="Password" />
        </div>
        <div className="registration__field">
          <input
            className="registration__input"
            placeholder="Repeat Password"
          />
        </div>
        <div className="registration__field">
          <button className="registration__submit">Registration</button>
        </div>
        <h5>Or Sign In Using</h5>
        <div className="registration__field">
          <button className="registration__submit registration__submit--google">
            <img src={googlePlusIcon} /> Sign Up With Google
          </button>
        </div>
        <h5>
          Have already an account?<Link className="registration__link" to="/login">Signin now</Link>
        </h5>
      </form>
    </div>
  );
};

export default Registration;
