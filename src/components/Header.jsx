import { useState, useEffect } from "react";
import classes from "./Header.module.css";

function Header() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600 || window.innerHeight <= 700);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logoContainer}>
          <a href="https://www.nia.nih.gov/research/abc-ds" target="_blank">
            <img className={classes.logo} src="logo-abc-ds.svg" alt="logo" />
          </a>
        </div>
        <h1 className={classes.rubikDirtRegular}>KBIT-2 Calculator</h1>
        <div className={classes.content}>
          {!isSmallScreen && (
            <p className={classes.description}>
              The Kaufman Brief Intelligence Test Second Edition (KBIT-2) is a
              brief measure of verbal and nonverbal intelligence used in the
              Alzheimer's Biomarker Consortium - Down Syndrome study.{" "}
            </p>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
