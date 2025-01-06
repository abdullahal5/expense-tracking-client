import { FaPlay } from "react-icons/fa";
import styles from "./Banner.module.css";
import Link from "next/link";

const Banner = () => {
  return (
    <div className={`${styles.hero} relative py-16 overflow-hidden`}>
      <div className={styles["background-overlay"]}></div>
      <div className={styles["absolute-elements"]}>
        <div className={styles["gradient-circle-1"]}></div>
        <div className={styles["gradient-circle-2"]}></div>
        <div className={styles["gradient-circle-3"]}></div>
        <div className={styles["gradient-circle-4"]}></div>
      </div>

      <div className={`${styles.content} z-10`}>
        <div className="text-center">
          <h1 className={`${styles.heading}`}>
            Organize, Analyze, and <br />
            <span className={styles.highlight}>Optimize Your Spending</span>
          </h1>
          <p className={styles.subheading}>
            Easily track your spending, set budgets, and save for what matters
            most. Simple tools to help you stay on top of your spending and make
            smarter financial decisions.
          </p>
          <div className={styles["button-container"]}>
            <button className={styles["browse-jobs-button"]}>
              Explore More
            </button>
            <div className={styles["how-it-works"]}>
              <Link className={styles["play-button"]} href={""}>
                <FaPlay />
              </Link>
              <span>How it works?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
