import React from "react";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <div>
      <header>Private Layout Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default PrivateLayout;
