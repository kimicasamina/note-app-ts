import Header from "../../components/Header/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import "./GuessLayout.css";
import Sidebar from "../../components/Sidebar";

const GuestLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <Sidebar />
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
