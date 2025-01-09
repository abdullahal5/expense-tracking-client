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
import { useGetSinleExpenseQuery } from "@/redux/features/expense/expenseApi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const DynamicSummary = ({ slug }: { slug: string }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: getMe } = useGetSinleUserQuery(
    user ? user.userId : null
  ) as TResponse<any>;
  const { data: expenses } = useGetSinleExpenseQuery({
    userId: user?.userId,
    category: { slug },
  }) as TResponse<any>;

  const specificExpenseData = expenses?.data as IExpense[];

  const allAmount = specificExpenseData?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const spendingLimits = getMe?.data?.spendingLimits as
    | TSpendingLimit[]
    | undefined;

  const filterCategory = spendingLimits?.find(
    (item) => item?.name?.toLowerCase() === slug.toLowerCase()
  );

  const totalAmount = filterCategory?.limit ?? 0;
  const spentAmount = allAmount;

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

  const chartData = {
    labels: specificExpenseData?.map((expense) =>
      new Date(expense.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    ),
    datasets: [
      {
        label: "Expenses Over Time",
        data: specificExpenseData?.map((expense) => expense.amount),
        borderColor: "#8b5cf6",
        pointBackgroundColor: "#8b5cf6",
        pointBorderColor: "#fff",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Expense Amount",
        },
      },
    },
  };

  return (
    <div className={styles.summaryDetailsconatiner}>
      <div className={styles.cardAndChartContainer}>
        <div className={styles.card}>
          <div className={styles["card-header"]}>
            <div className={styles["card-icon-header"]}>
              <div className={styles.icon}>{icon}</div>
              <div className={styles.title}>
                <h2>{filterCategory?.name}</h2>
                <p className={styles.itemCount}>
                  {specificExpenseData?.length} Items
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
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>Expense Trend</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <form className={styles.expenseForm}>
            <h2>Add New</h2>
            <div className={styles.formControl}>
              <label htmlFor="amount">Amount ($)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter your expense amount"
                required
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="purpose">Purpose</label>
              <textarea
                id="purpose"
                rows={10}
                name="purpose"
                placeholder="Please describe the purpose of this expense"
                required
              />
            </div>
            <button type="submit" className={styles.btn}>
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DynamicSummary;
