/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Title from "@/components/title/Title";
import styles from "./Summary.module.css";
import CategoryCard from "@/components/categoryCard/CategoryCard";
import Table from "@/components/table/Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAppSelector } from "@/redux/hook";
import { useGetSinleUserQuery } from "@/redux/features/auth/authApi";
import { IExpense, TResponse, TSpendingLimit } from "@/types";
import { useGetAllExpenseQuery } from "@/redux/features/expense/expenseApi";
import { filterOptionsByDate, tableHead } from "@/contant";
import Modal from "@/components/modal/Modal";
import UpdateExpense from "@/components/UpdateExpense/UpdateExpense";

const Summary = () => {
  const [filter, setFilter] = useState<string>("Today");
  const [customDate, setCustomDate] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );

  const openModal = (id: string) => {
    setSelectedExpenseId(id);
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelectedExpenseId(null);
    setModalOpen(false);
  };

  const { user } = useAppSelector((state) => state.auth);
  const { data: getMe } = useGetSinleUserQuery(
    user ? user?.userId : null
  ) as unknown as TResponse<any>;

  const spendingLimits = getMe?.data?.spendingLimits as TSpendingLimit[];

  const { data: expenses } = useGetAllExpenseQuery(undefined) as TResponse<any>;
  const allExpenses = expenses?.data as IExpense[];

  const filteredOwnData = allExpenses?.filter(
    (item) => item?.author?._id === user?.userId
  );

  const data = filteredOwnData?.map((expense) => ({
    _id: expense._id,
    Name: {
      value: expense.author?.name || "Unknown",
      tooltip: expense.purpose || "No purpose provided",
    },
    Email: {
      value: expense.author?.email || "Unknown",
      tooltip: expense.purpose || "No purpose provided",
    },
    Date: {
      value: expense?.createdAt
        ? new Date(expense.createdAt).toISOString().split("T")[0]
        : "N/A",
      tooltip: expense.purpose || "No purpose provided",
    },
    Category: {
      value: expense?.category || "Uncategorized",
      tooltip: expense.purpose || "No purpose provided",
    },
    Rate: {
      value: `$${expense?.amount?.toFixed(2) || "0.00"}`,
      tooltip: expense.purpose || "No purpose provided",
    },
  }));

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  const filteredData = data?.filter((row) => {
    if (!row.Date.value) return false;

    const expenseDate = new Date(row.Date.value);
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

  const updatedData = filteredData?.map((row) => {

    console.log(row);
    return {
      ...row,
      Actions: (
        <div style={{ display: "flex", gap: "8px" }}>
          <FaEdit
            onClick={() => openModal(row._id)}
            style={{ color: "#6366f1", cursor: "pointer" }}
          />
          <FaTrash style={{ color: "#ef4444", cursor: "pointer" }} />
        </div>
      ),
    };
  });

  const totalPrice =
    filteredData?.reduce((acc, curr) => {
      const rate = Number(curr.Rate.value.replace(/^\$/, ""));
      if (isNaN(rate)) {
        console.warn("Invalid rate:", curr.Rate);
      }
      return acc + (isNaN(rate) ? 0 : rate);
    }, 0) || 0;

  const calculateCategoryData = (category: string) => {
    const categoryExpenses =
      allExpenses?.filter((expense) => expense?.category === category) || [];

    const totalItems = categoryExpenses?.length;
    const totalSpentAmount = categoryExpenses?.reduce(
      (acc, curr) => acc + curr?.amount,
      0
    );

    return {
      name: category,
      limit: spendingLimits?.find((sl) => sl?.name === category)?.limit || 0,
      totalItems,
      totalSpentAmount,
    };
  };

  const categoryData = [
    "Groceries",
    "Transportation",
    "Healthcare",
    "Utility",
    "Charity",
    "Miscellaneous",
  ].map(calculateCategoryData);

  return (
    <>
      <div className={styles.container}>
        <Title title="Summary of your daily expense" />
        <div className={styles["category-card-container"]}>
          {categoryData?.map((item) => (
            <div key={item.name}>
              <CategoryCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <Title title="Your Latest Added Expense" />
      <div className={styles["filter-tabs"]}>
        {filterOptionsByDate.map((option) => (
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
        <Table columns={tableHead} data={updatedData} />

        <div className={styles["total-price-container"]}>
          <p className={styles["total-price"]}>Total Price: ${totalPrice}</p>
        </div>
      </div>

      {/* modal */}

      {modalOpen && (
        <Modal
          openModal={modalOpen}
          title="Update Expense"
          closeModal={closeModal}
        >
          <UpdateExpense
            closeModal={closeModal}
            contentId={selectedExpenseId as string}
          />
        </Modal>
      )}
    </>
  );
};

export default Summary;
