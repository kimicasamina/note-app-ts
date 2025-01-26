import Header from "../components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
    // <div className="guess-layout">
    //   <main className="container">
    //   </main>
    //   {/* <main>
    //   </main>
    //   <footer>Footer</footer> */}
    // </div>
  );
};

export default GuestLayout;
