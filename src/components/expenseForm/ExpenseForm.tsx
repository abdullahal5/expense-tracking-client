/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import styles from "./ExpenseForm.module.css";
import Title from "../title/Title";

const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    purpose: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (expense.category && expense.amount && expense.purpose) {
      setExpense({ category: "", amount: "", purpose: "" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <Title title="Add Your Expense" />
        <form className={styles.expenseForm} onSubmit={handleSubmit}>
          <h2>Track Your Expense</h2>

          <div className={styles.formControl}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={expense.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Groceries">Groceries</option>
              <option value="Transportation">Transportation</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Utility">Utility</option>
              <option value="Charity">Charity</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="amount">Amount ($)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="purpose">Purpose</label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={expense.purpose}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.btn}>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
