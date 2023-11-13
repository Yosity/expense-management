import "./Sign_in.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
function Sign_in() {
  const { state } = useLocation();
  const navigatTo = useNavigate();
  const { name, email, password } = state;
  const [inputEmail, setEmail] = useState("");
  const [inputPassword, setPassword] = useState("");
  const handleSignIn = () => {
    if (inputEmail !== "" && inputEmail === email && inputPassword === password)
      navigatTo("/expense-management/homepage", {
        state: { name: name },
      });
    else
      alert(
        `Please provide valid inputs, or Register\n The expected inputs are :\nemail : ${email}\npassword : ${password}`
      );
  };
  return (
    <section className="sign-in">
      <div className="signIn-container">
        <h1>SIGN IN</h1>
        <div className="name-email">
          <input
            type="email"
            placeholder="email"
            value={inputEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="password"
          placeholder="Password"
          value={inputPassword}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <div className="button-container">
          <button className="signIn-link" onClick={handleSignIn}>
            Log in
          </button>
          <p>Dont have an account ?</p>
          <Link to="/expense-management/" className="signUp-link">
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Sign_in;
