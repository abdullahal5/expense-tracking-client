/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import styles from "./SpendingLimitForm.module.css";

const categories = [
  "Groceries",
  "Transportation",
  "Healthcare",
  "Utility",
  "Charity",
  "Miscellaneous",
];

const SpendingLimitForm = () => {
  const [limits, setLimits] = useState<{ [key: string]: number }>(
    categories.reduce((acc, category) => {
      acc[category] = 100;
      return acc;
    }, {} as { [key: string]: number })
  );

  const handleLimitChange = (category: string, value: number) => {
    setLimits((prev) => ({ ...prev, [category]: value }));
  };

  const getStyle = (value: any) => ({
    "--value": `${(value / 1000) * 100}%`,
  });

  return (
      <>
      <div className={`${styles.spendLimit}`}>
        <h2>Set Monthly Spending Limits</h2>
        <form>
          {categories.map((category) => (
              <div key={category} className={styles["category-input"]}>
              <label>
                {category}: ${limits[category]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={limits[category]}
                onChange={(e) =>
                    handleLimitChange(category, parseInt(e.target.value))
                }
                style={getStyle(limits[category]) as any}
              />
            </div>
          ))}
          <button type="submit">Set Limits</button>
        </form>
      </div>
    </>
  );
};

export default SpendingLimitForm;
