"use client";
import React, { useState } from "react";
import Title from "@/components/title/Title";
import styles from "./Summary.module.css";
import CategoryCard from "@/components/categoryCard/CategoryCard";
import Table from "@/components/table/Table";
import { FaEdit, FaTrash } from "react-icons/fa";

const Summary = () => {
  const [filter, setFilter] = useState("Today");
  const [customDate, setCustomDate] = useState("");

  const columns = [
    "Name",
    "Email",
    "Date",
    "Category",
    "Rate",
    "Product Name",
    "Actions",
  ];

  const data = [
    {
      Name: "John Doe",
      Email: "john.doe@example.com",
      ExpenseDate: "2025-01-05",
      Category: "Office",
      Expense: "50",
      ProductName: "Laptop",
    },
    {
      Name: "Jane Smith",
      Email: "jane.smith@example.com",
      ExpenseDate: "2025-01-06",
      Category: "Transportation",
      Expense: "120",
      ProductName: "Flight Ticket",
    },
    {
      Name: "Alice Johnson",
      Email: "alice.j@example.com",
      ExpenseDate: "2025-01-04",
      Category: "Event",
      Expense: "200",
      ProductName: "Conference Ticket",
    },
    {
      Name: "Bob Brown",
      Email: "bob.brown@example.com",
      ExpenseDate: "2025-01-07",
      Category: "Meals",
      Expense: "30",
      ProductName: "Lunch",
    },
  ];

  const filterOptions = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 1 Month",
    "Custom",
  ];

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  const filteredData = data.filter((row) => {
    const expenseDate = new Date(row.ExpenseDate);
    switch (filter) {
      case "Today":
        return expenseDate.toISOString().split("T")[0] === formattedToday;
      case "Yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return (
          expenseDate.toISOString().split("T")[0] ===
          yesterday.toISOString().split("T")[0]
        );
      case "Last 7 Days":
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        return expenseDate >= sevenDaysAgo && expenseDate <= today;
      case "Last 1 Month":
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);
        return expenseDate >= oneMonthAgo && expenseDate <= today;
      case "Custom":
        return (
          customDate && expenseDate.toISOString().split("T")[0] === customDate
        );
      default:
        return true;
    }
  });

  const updatedData = filteredData.map((row) => ({
    ...row,
    Actions: (
      <div style={{ display: "flex", gap: "8px" }}>
        <FaEdit style={{ color: "#6366f1", cursor: "pointer" }} />
        <FaTrash style={{ color: "#ef4444", cursor: "pointer" }} />
      </div>
    ),
  }));

  const totalPrice = filteredData.reduce((acc, curr) => {
    const price = Number(curr.Expense)
    return acc + price
  }, 0)
  
  return (
    <>
      <div className={styles.container}>
        <Title title="Summary of your daily expense" />
        <div className={styles["category-card-container"]}>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </div>

      <Title title="Your Latest Added Expense" />
      <div className={styles["filter-tabs"]}>
        {filterOptions.map((option) => (
          <div
            key={option}
            className={`${styles["filter-tab"]} ${
              filter === option ? styles.active : ""
            }`}
            onClick={() => setFilter(option)}
          >
            {option}
          </div>
        ))}
      </div>

      {filter === "Custom" && (
        <div className={styles["custom-date-container"]}>
          <input
            type="date"
            max={formattedToday}
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
            className={`${styles["custom-date"]}`}
          />
        </div>
      )}

      <div className={styles["table-and-price-container"]}>
        <Table columns={columns} data={updatedData} />

        <div className={styles["total-price-container"]}>
          <p className={styles["total-price"]}>Total Price: ${totalPrice}</p>
        </div>
      </div>
    </>
  );
};

export default Summary;
