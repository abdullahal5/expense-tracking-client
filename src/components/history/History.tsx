/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Table from "@/components/table/Table";
import { tableHead } from "@/contant";
import { useGetAllExpenseQuery } from "@/redux/features/expense/expenseApi";
import { IExpense, TResponse } from "@/types";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import styles from "./History.module.css";
import { useAppSelector } from "@/redux/hook";
import Modal from "../modal/Modal";
import UpdateExpense from "../UpdateExpense/UpdateExpense";

const History = () => {
  const [filter, setFilter] = useState<string>("Today");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [customDate, setCustomDate] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth);
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
  
  const { data: expenses } = useGetAllExpenseQuery(undefined) as TResponse<any>;
  const allExpenses = expenses?.data as IExpense[];

  const filteredOwnData = allExpenses?.filter(
    (item) => item?.author?._id === user?.userId
  );

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  const data = filteredOwnData?.map((expense) => ({
    _id: expense._id,
    Name: expense.author?.name || "Unknown",
    Email: expense.author?.email || "Unknown",
    Date: expense?.createdAt
      ? new Date(expense.createdAt).toISOString().split("T")[0]
      : "N/A",
    Category: expense?.category || "Uncategorized",
    Rate: `$${expense?.amount?.toFixed(2) || "0.00"}`,
  }));

  const filteredData = data?.filter((row) => {
    if (!row.Date) return false;

    const expenseDate = new Date(row.Date);
    const matchesSearch =
      row.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.Category.toLowerCase().includes(searchQuery.toLowerCase());

    switch (filter) {
      case "All":
        return matchesSearch;
      case "Today":
        return (
          matchesSearch &&
          expenseDate.toISOString().split("T")[0] === formattedToday
        );
      case "Yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return (
          matchesSearch &&
          expenseDate.toISOString().split("T")[0] ===
            yesterday.toISOString().split("T")[0]
        );
      case "Last 7 Days":
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        return (
          matchesSearch && expenseDate >= sevenDaysAgo && expenseDate <= today
        );
      case "Last 1 Month":
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);
        return (
          matchesSearch && expenseDate >= oneMonthAgo && expenseDate <= today
        );
      case "Custom":
        return (
          matchesSearch &&
          customDate &&
          expenseDate.toISOString().split("T")[0] === customDate
        );
      default:
        return matchesSearch;
    }
  });

  const updatedData = filteredData?.map((row) => ({
    ...row,
    Actions: (
      <div className={styles.actionIcons}>
        <FaEdit onClick={() => openModal(row?._id)} className={styles.editIcon} />
        <FaTrash className={styles.deleteIcon} />
      </div>
    ),
  }));

  const tabs = [
    "All",
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 1 Month",
    "Custom",
  ];

  return (
    <>
      <div className={styles.historyContainer}>
        <h1 className={styles.title}>Expense History</h1>

        <div className={styles.filterSectionWrapper}>
          <div className={styles.filterSection}>
            <div className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by Name, Email, or Category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles["filter-tabs"]}>
              {tabs.map((tab) => (
                <div
                  key={tab}
                  className={`${styles["filter-tab"]} ${
                    filter === tab ? styles.active : ""
                  }`}
                  onClick={() => setFilter(tab)}
                >
                  {tab}
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
                  className={styles.datePicker}
                />
              </div>
            )}
          </div>
        </div>

        {updatedData?.length ? (
          <div className={styles["table-and-price-container"]}>
            <Table columns={tableHead} data={updatedData} />
          </div>
        ) : (
          <div className={styles.noDataMessage}>
            No available data for the selected date range.
          </div>
        )}
      </div>
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

export default History;
