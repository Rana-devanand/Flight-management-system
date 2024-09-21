import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routers from "./utils/Routers";
import React from "react";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/PlainTicket"];
  const hideNavbarPayment = ["/Payment"];
  

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldHidePayment = hideNavbarPayment.includes(location.pathname);


  return (
    <React.Fragment>
      {/* Conditionally render Navbar only if the route is not "/plainTicket" */}

      {!shouldHideNavbar && !shouldHidePayment && <Navbar />}
      {/* <Navbar /> */}

      <Routers />
    </React.Fragment>

  );
}

export default App;
