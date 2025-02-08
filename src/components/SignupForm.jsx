import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup.js";
import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";
import "../pages/global.css";
import "../pages/SignupPage.css";

function SignupForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    rePassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.rePassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await postSignup(formData);
      // Automatically log in the user
      const response = await postLogin(formData.username, formData.password);
      window.localStorage.setItem("token", response.token);
      setAuth({ token: response.token });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="rePassword">Re-enter Password:</label>
        <input type="password" id="rePassword" onChange={handleChange} required />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button class="rainbow-button" id="submit" type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;