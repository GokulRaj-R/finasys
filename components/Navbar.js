import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import logoImage from "../assets/icons/logo.png";
import Link from "next/link";
import web3 from "../ethereum/web3";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  logo_container: {
    height: "100%",
    "& span": {
      fontSize: "2em",
      color: "#308fc9",
      fontWeight: "600",
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
      fontWeight: "600",
      cursor: "pointer",
      color: "#555555",
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
  const [accounts, setAccounts] = useState([]);
  const getAccounts = async () => {
    return await web3.eth.getAccounts();
  };

  useEffect(() => {
    (async () => {
      setAccounts(await getAccounts());
    })();
  }, []);

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <Link href="/">
          <a className={styles.logo_container}>
            <img className={styles.logo} src={logoImage} />
            <span> Finasys</span>
          </a>
        </Link>
        <div className={styles.dropdown}>
          <Link href="/dashboard">
            <Typography variant="h6"> Dashboard</Typography>
          </Link>
          <Link
            disabled={!accounts.length}
            href={accounts ? `/user/${accounts[0]}` : "/"}
          >
            <Typography variant="h6"> Profile </Typography>
          </Link>
          <Link href="/">
            <Typography variant="h6"> Loan </Typography>
          </Link>
          <Link href="/lend/all">
            <Typography variant="h6"> Lend</Typography>
          </Link>
          <Link href="/auction/all">
            <Typography variant="h6"> Auction</Typography>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
