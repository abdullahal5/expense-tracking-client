import "./style.css";
import { FaPlay } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative hero py-16 overflow-hidden">
      <div className="background-overlay"></div>

      <div className="absolute-elements">
        <div className="gradient-circle-1"></div>
        <div className="gradient-circle-2"></div>
        <div className="gradient-circle-3"></div>
        <div className="gradient-circle-4"></div>
      </div>

      <div className="content z-10">
        <div className="text-center">
          <h1 className="heading">
            Organize, Analyze, and <br />
            <span className="highlight"> Optimize Your Spending</span>
          </h1>
          <p className="subheading">
            Easily track your spending, set budgets, and save for what matters
            most. Simple tools to help you stay on top of your spending and make
            smarter financial decisions.
          </p>
          <div className="button-container">
            <button className="browse-jobs-button">Explore More</button>
            <div className="how-it-works">
              <button className="play-button">
                <FaPlay />
              </button>
              <span>How it works?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
