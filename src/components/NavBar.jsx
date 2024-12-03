import { Link, Outlet } from "react-router-dom";
import {useAuth} from "../hooks/use-auth.js";

function NavBar() {

  const {auth, setAuth} = useAuth();

   const handleLogout = () => {
       window.localStorage.removeItem("token");
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
       
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {auth.token ? <Link to="/create-project">Create Project</Link> : null} 


        <Link to="/pledge">Pledge</Link>
      </nav>
      {/* React Router will pass components into the <Outlet /> based on the path */}
      <Outlet />
    </div>
  );
}

export default NavBar;