import "./Sign_up.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Sign_in from "../Sign_in/Sign_in";
import { useState } from "react";

function Sign_up() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleSignUp = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!name || !email || !password) alert("Please fill the inputs !");
    else if (emailPattern.test(email)) {
      history("/sign-in", {
        state: { name: name, email: email, password: password },
      });
      alert(`email : ${email} \npassword : ${password}`);
    } else {
      alert(" Please provide valid inputs");
    }
  };

  return (
    <section className="sign-up">
      <div className="signUp-container">
        <h1>SIGN UP</h1>
        <div className="name-email">
          <input
            type="text"
            placeholder="username"
            required
            maxLength="20"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-container">
          <button className="signUp-link" onClick={handleSignUp}>
            Register
          </button>
          <p>already have an account ?</p>
          <button
            onClick={() => {
              history("/sign-in", {
                state: { name: name, email: email, password: password },
              });
            }}
            className="signIn-link"
          >
            Log in
          </button>
        </div>
      </div>
      <Routes>
        <Route path="/sign-in" element={<Sign_in />} />
      </Routes>
    </section>
  );
}

export default Sign_up;
