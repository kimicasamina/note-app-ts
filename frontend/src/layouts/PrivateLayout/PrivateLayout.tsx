import React from "react";
import { Outlet } from "react-router-dom";
import "./PrivateLayout.css";

const PrivateLayout = () => {
  return (
    <>
      <Outlet />
    </>
    // <div>
    //   {/* <header>Private Layout Header</header> */}
    //   <main>
    //   </main>
    //   {/* <footer>Footer</footer> */}
    // </div>
  );
};

export default PrivateLayout;
