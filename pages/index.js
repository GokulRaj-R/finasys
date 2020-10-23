import { makeStyles, Grid, Divider } from "@material-ui/core";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import bgHome from "../assets/images/bg_home.png";
import stepsBG from "../assets/images/verify-find-spend.jpg";
import Link from "next/link";

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
    height: "600px",
    paddingTop: "50px",
  },
  home_top_left: {
    flexGrow: 1,
    height: "100%",
    paddingLeft: "5%",
    marginRight: "10%",
  },
  home_top_right: {
    width: "60%",
    height: "100%",
    paddingRight: "40%",
    background: `url(${bgHome})`,
    backgroundPosition: "center",
    backgroundSize: "auto 100%",
    backgroundRepeat: "no-repeat",
  },
  bottom: {
    paddingTop: "50px",
    marginTop: "80px",
    paddingBottom: "100px",
    backgroundColor: "#efefef",
  },
  bottom_left: {
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  bottom_right: {
    background: `url(${stepsBG})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    paddingLeft: "0px",
    border: "solid",
    borderWidth: "2px",
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  heading: {
    fontSize: "4rem",
    fontWeight: "800",
    color: "#333333",
    paddingBottom: "0px",
    marginBottom: "0px",
  },
  subheading: {
    fontSize: "1.5rem",
    paddingBottom: "10px",
    marginBottom: "0px",
    color: "#555555",
  },
  bheading: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#333333",
    paddingBottom: "0px",
    marginBottom: "0px",
  },
  bsubheading: {
    fontSize: "1.4rem",
    fontWeight: "700",
    marginBottom: "0px",
    paddingBottom: "0px",
    color: "#222222",
  },
  bbody: {
    fontWeight: "500",
    paddingBottom: "20px",
    fontSize: "1.05rem",
    color: "#4b4c4d",
  },
  divider: {
    marginTop: "10px",
    paddingBottom: "15px",
    marginBottom: "50px",
    width: "60px",
    backgroundColor: "#5f95d4",
  },
}));

const App = () => {
  useEffect(() => {
    document.title = "Finasys";
  }, []);
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
          <div className={styles.home_top_left}>
            <p className={styles.heading}>
              Financial Aid & Budgeting, made simple
            </p>
            <p className={styles.subheading}>
              {" "}
              Master your money with one easy app{" "}
            </p>
            <Link href="/dashboard">
              <a>Already a verified user? Get started!</a>
            </Link>
          </div>
          <div className={styles.home_top_right} />
        </div>
        <Grid className={styles.bottom} container>
          <Grid item xs={6} className={styles.bottom_left}>
            <p className={styles.bheading}>How Finasys works.</p>
            <Divider className={styles.divider} />
            <p className={styles.bsubheading}>Verify yourself</p>
            <p className={styles.bbody}>
              For user verification provide your name and id to link with
              Finasys.
            </p>
            <p className={styles.bsubheading}>
              Find interesting loans/auctions
            </p>
            <p className={styles.bbody}>
              Browse through all loans & auctions to invest or create a new
              loan.
            </p>
            <p className={styles.bsubheading}>Borrow/Spend with certainty</p>
            <p className={styles.bbody}>
              After finding some loan/auction of interest, spend ethers to
              invest or buy.
            </p>
          </Grid>
          <Grid item xs={5} className={styles.bottom_right}></Grid>
        </Grid>
      </div>
    </div>
  );
};

export default App;
