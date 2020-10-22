import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import logoImage from "../assets/icons/logo.png";
import { Link } from "../routes";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  logo_container: {
    height: "100%",
    "& span": {
      fontSize: "2em",
      color: "#640b37",
    },
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logo: {
    height: "3em",
    width: "auto",
  },
  dropdown: {
    display: "flex",
    justifyContent: "space-evenly",
    flexGrow: 1,
    "& h6": {
      fontWeight: "400",
      cursor: "pointer",
      // position:"relative",
      // display: "inline-block",
    },
    // '& h6::before': {
    //     content: "",
    //     position: "absolute",
    //     width: "0",
    //     height: "2px",
    //     bottom: "0",
    //     left: "0",
    //     backgroundColor: "green",
    //     visibility: "hidden",
    //     transition: "all 0.3s ease-in-out",
    // },
    // '& h6:hover::before': {
    //     visibility: "visible",
    //     width: "100%",
    // }
  },
}));

function Navbar() {
  const styles = useStyles();
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Link route="/">
          <a className={styles.logo_container}>
            <img className={styles.logo} src={logoImage} />
            <span> Finasys</span>
          </a>
        </Link>
        <div className={styles.dropdown}>
          <Link route="/dashboard">
            <Typography variant="h6"> Dashboard</Typography>
          </Link>
          <Link route="/">
            <Typography variant="h6"> Loan </Typography>
          </Link>
          <Link route="/lend/all">
            <Typography variant="h6"> Lend</Typography>
          </Link>
          <Link route="/auction/all">
            <Typography variant="h6"> Auction</Typography>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
