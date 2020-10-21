import { makeStyles } from "@material-ui/core";
import React from "react";
import Navbar from "../components/Navbar";
import bgHome from "../assets/images/bg_home.png";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  home: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#fdfafa",
  },
  top: {
    width: "100%",
    display: "flex",
    height: "500px",
  },
  home_top_left: {
    flexGrow: 1,
    height: "100%",
  },
  home_top_right: {
    width: "60%",
    height: "100%",
    // height: "auto",
    background: `url(${bgHome})`,
    backgroundPosition: "center",
    backgroundSize: "auto 80%",
    backgroundRepeat: "no-repeat",
  },
}));
const App = () => {
  const styles = useStyles();
  return (
    <div>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <Navbar />
      <div className={styles.home}>
        <div className={styles.top}>
          <div className={styles.home_top_left}></div>
          <div className={styles.home_top_right} />
        </div>
      </div>
    </div>
  );
};

export default App;
