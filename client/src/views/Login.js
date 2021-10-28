import { Login } from "../components/Auth";
import GuestGuard from "../components/Auth/GuestGuard";

const LoginView = () => {
  return (
    <GuestGuard>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Login />
      </div>
    </GuestGuard>
  );
};

export default LoginView;
