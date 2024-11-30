import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Here we import out pages
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import PledgePage from "./pages/PledgePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

// Here we import our components
import NavBar from "./components/NavBar.jsx";

// Here we create our router and tell it whats pages to render at what path
const router = createBrowserRouter([
  // These are the three routes!
  {
    path: "/",
        // Putting our NavBar as the main component will causes the children to render in the <Outlet />
       element: <NavBar />,
       children: [
           { path: "/", element: <HomePage /> },
           { path: "/login", element: <LoginPage /> },
           { path: "/about", element: <AboutPage /> },
           { path: "/contact", element: <ContactPage /> },
           { path: "/project/:id", element:<ProjectPage /> },
           { path: "/pledge", element: <PledgePage /> },
       ],

  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Here we wrap our app in the router provider so the pages render */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
