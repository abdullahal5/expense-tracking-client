import { FaShoppingCart } from "react-icons/fa";
import styles from "./CategoryCard.module.css";

const CategoryCard = () => {
  const totalAmount = 2300;
  const spentAmount = 800;

  const progressWidth = Math.min((spentAmount / totalAmount) * 100, 100);

  const progressColor = spentAmount > totalAmount * 0.5 ? "#FF6347" : "#8b5cf6";

  const spentPercentage = Math.round(progressWidth);

  return (
    <div className={styles.card}>
      <div className={styles["card-header"]}>
        <div className={styles["card-icon-header"]}>
          <div className={styles.icon}>
            <FaShoppingCart />
          </div>
          <div className={styles.title}>
            <h2>Shopping</h2>
            <p className={styles.itemCount}>1 Item</p>
          </div>
        </div>
        <div className={styles.amount}>${totalAmount}</div>
      </div>
      <div className={styles["card-body"]}>
        <div className={styles["progress-text"]}>
          <span className={styles.spent}>${spentAmount} Spend</span>
          <span className={styles.remaining}>
            ${Math.max(totalAmount - spentAmount, 0)} Remaining
          </span>
        </div>
        <div className={styles["progress-container"]}>
          <div className={styles["progress-bar"]}>
            <div
              className={styles["progress-fill"]}
              style={{
                width: `${progressWidth}%`,
                backgroundColor: progressColor,
              }}
            ></div>
          </div>
          <div className={styles.percentage}>{spentPercentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
