import { Link, Outlet } from "react-router-dom";
import {useAuth} from "../hooks/use-auth.js";
import "../pages/global.css";

function NavBar() {

  const {auth, setAuth} = useAuth();

   const handleLogout = () => {
       window.localStorage.removeItem("token");
       window.localStorage.removeItem("userid");
       setAuth({ token: null });
   };

   console.log(auth)


  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {auth.token ? (
            <Link to="/" onClick={handleLogout}>
                  Log Out
            </Link>
            ) : (
            <Link to="/login">Log In</Link>
            
        )}

        <Link to="/signup">Sign Up</Link>
       
        <Link to="/about">Contact Us</Link>
        {/*<Link to="/contact">Contact</Link>*/}

        {auth.token ? <Link to="/create-project">Create Project</Link> : null} 

      </nav>
      {/* React Router will pass components into the <Outlet /> based on the path */}
      <Outlet />
    </div>
  );
}

export default NavBar;