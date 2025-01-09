import {
  FaShoppingCart,
  FaCar,
  FaHeartbeat,
  FaLightbulb,
  FaHandHoldingHeart,
  FaEllipsisH,
} from "react-icons/fa";
import styles from "./CategoryCard.module.css";
import { ICategoryCard } from "@/types";
import Link from "next/link";

const CategoryCard = ({ item }: { item: ICategoryCard }) => {
  const totalAmount = item.limit;
  const spentAmount = item.totalSpentAmount;

  const progressWidth = Math.min((spentAmount / totalAmount) * 100, 100);

  const progressColor = spentAmount > totalAmount * 0.5 ? "#FF6347" : "#8b5cf6";

  const spentPercentage = Math.round(progressWidth);

  let icon;
  switch (item.name) {
    case "Groceries":
      icon = <FaShoppingCart />;
      break;
    case "Transportation":
      icon = <FaCar />;
      break;
    case "Healthcare":
      icon = <FaHeartbeat />;
      break;
    case "Utility":
      icon = <FaLightbulb />;
      break;
    case "Charity":
      icon = <FaHandHoldingHeart />;
      break;
    default:
      icon = <FaEllipsisH />;
  }

  return (
    <Link
      style={{
        textDecoration: "none",
        color: "black",
      }}
      href={`/dashboard/summary/${item?.name}`}
    >
      <div className={styles.card}>
        <div className={styles["card-header"]}>
          <div className={styles["card-icon-header"]}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.title}>
              <h2>{item.name}</h2>
              <p className={styles.itemCount}>{item.totalItems} Item</p>
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
    </Link>
  );
};

export default CategoryCard;
