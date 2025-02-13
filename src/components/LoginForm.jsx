import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../api/post-login.js";
import {useAuth} from "../hooks/use-auth.js";
import "../pages/global.css";


function LoginForm() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();


        const [credentials, setCredentials] = useState({
              username: "",
              password: "",
        });
        
        const handleChange = (event) => {
              const { id, value } = event.target;
              setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  [id]: value,
              }));
        };

        const handleSubmit = (event) => {
                   event.preventDefault();
                   if (credentials.username && credentials.password) {
                       postLogin(
                           credentials.username,
                           credentials.password
                       ).then((response) => {
                        window.localStorage.setItem("token", response.token);
                        window.localStorage.setItem("userid", response.user_id);
                        setAuth({
                              token: response.token,
                        });
                        navigate("/");
                        
                       });
                   }
        };


    return (
      <form>
        <div>
          <label htmlFor="username">Username:</label>
            <input
                   type="text"
                   id="username"
                   placeholder="Enter username"
                   onChange={handleChange}
            />


        </div>
        <div>
          <label htmlFor="password">Password:</label>
            <input
                   type="password"
                   id="password"
                   placeholder="Password"
                   onChange={handleChange}
            />

        </div>
        
        <button class="rainbow-button" id="submit" type="button" onClick={handleSubmit}>
               Login
        </button>

        <button class="rainbow-button" id="submit" type="button" onClick={() => navigate("/signup")}>
              Sign Up
        </button>

      </form>
    );
  }
  
  export default LoginForm;