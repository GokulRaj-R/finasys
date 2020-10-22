import React from "react";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#fcfcfc" }}>{props.children}</div>
    </>
  );
};

export default Layout;
