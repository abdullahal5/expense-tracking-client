/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import styles from "./ExpenseForm.module.css";
import Title from "../title/Title";
import { useAddExpenseMutation } from "@/redux/features/expense/expenseApi";
import { useAppSelector } from "@/redux/hook";
import { toast } from "sonner";
import { TResponse } from "@/types";

const ExpenseForm = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    purpose: "",
  });

  const [addExpense] = useAddExpenseMutation();

  const defaultValues = {
    category: "Groceries",
    amount: "50",
    purpose: "Groceries shopping for the week",
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && user?.userId) {
      const data = {
        category: e.currentTarget.category.value,
        amount: Number(e.currentTarget.amount.value),
        purpose: e.currentTarget.purpose.value,
        author: user?.userId,
      };

      const res = (await addExpense(data)) as unknown as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { duration: 2000 });
      } else {
        toast.success(res.data.message, { duration: 2000 });
        setExpense({
          category: "",
          amount: "",
          purpose: "",
        });
        // router.push("/");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };


  const handleSetDefaultValues = () => {
    setExpense(defaultValues);
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
              placeholder="Enter your expense amount"
              value={expense.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="purpose">Purpose</label>
            <textarea
              id="purpose"
              name="purpose"
              rows={10}
              placeholder="Please describe the purpose of this expense"
              value={expense.purpose}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.btn}>
            Add Expense
          </button>

          <button
            className={styles.defaultbtn}
            onClick={handleSetDefaultValues}
          >
            Set Default Values
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
