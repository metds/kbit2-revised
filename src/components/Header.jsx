import { useState, useEffect } from "react";
import classes from "./Header.module.css";

function Header() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600 && window.innerHeight <= 700);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logoContainer}>
          <a href="https://www.nia.nih.gov/research/abc-ds">
            <img className={classes.logo} src="logo-cdp-ds.svg" alt="logo" />
          </a>
        </div>
        <h1 className={classes.pageTitle}>KBIT-2 Revised Calculator</h1>
        <div className={classes.content}>
          {!isSmallScreen && (
            <p className={classes.description}>
              The Kaufman Brief Intelligence Test Second Edition (KBIT-2)
              Revised is a brief measure of verbal and nonverbal intelligence
              used in the Alzheimer's Biomarker Consortium - Down Syndrome
              study.{" "}
            </p>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
