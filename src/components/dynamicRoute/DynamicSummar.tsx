/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetSinleUserQuery } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hook";
import { IExpense, TResponse, TSpendingLimit } from "@/types";
import styles from "./DynamicSummary.module.css";
import {
  FaCar,
  FaEllipsisH,
  FaHandHoldingHeart,
  FaHeartbeat,
  FaLightbulb,
  FaShoppingCart,
} from "react-icons/fa";
import { useGetAllExpenseQuery } from "@/redux/features/expense/expenseApi";

const DynamicSummary = ({ slug }: { slug: string }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: getMe } = useGetSinleUserQuery(
    user ? user.userId : null
  ) as TResponse<any>;
  const { data: expenses } = useGetAllExpenseQuery(undefined) as TResponse<any>;

  const spendingLimits = getMe?.data?.spendingLimits as
    | TSpendingLimit[]
    | undefined;

  const filterCategory = spendingLimits?.find(
    (item) => item?.name?.toLowerCase() === slug.toLowerCase()
  );

  const totalAmount = filterCategory?.limit ?? 0;
  const spentAmount = 30;

  const progressWidth = Math.min((spentAmount / totalAmount) * 100, 100);
  const progressColor = spentAmount > totalAmount * 0.5 ? "#FF6347" : "#8b5cf6";
  const spentPercentage = Math.round(progressWidth);

  let icon;
  switch (filterCategory?.name) {
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

  const allExpenses = expenses?.data as IExpense[];

  const filteredExpenses = allExpenses?.filter(
    (item) => item.category.toLowerCase() == slug.toLowerCase()
  );

  console.log(filteredExpenses);
  return (
    <div className={styles.card}>
      <div className={styles["card-header"]}>
        <div className={styles["card-icon-header"]}>
          <div className={styles.icon}>{icon}</div>
          <div className={styles.title}>
            <h2>{filterCategory?.name}</h2>
            <p className={styles.itemCount}>
              {filteredExpenses?.length} Items
            </p>
          </div>
        </div>
        <div className={styles.amount}>${totalAmount}</div>
      </div>
      <div className={styles["card-body"]}>
        <div className={styles["progress-text"]}>
          <span className={styles.spent}>${spentAmount} Spent</span>
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

export default DynamicSummary;
