/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import styles from "./SpendingLimitForm.module.css";
import {
  useGetSinleUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hook";
import { TResponse } from "@/types";
import { toast } from "sonner";

const categories = [
  "Groceries",
  "Transportation",
  "Healthcare",
  "Utility",
  "Charity",
  "Miscellaneous",
];

const SpendingLimitForm = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data: getMe, isSuccess } = useGetSinleUserQuery(
    user ? user?.userId : null
  ) as unknown as TResponse<any>;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const spendingLimits = (isSuccess && getMe.data.spendingLimits) || [];

  const [limits, setLimits] = useState<{ [key: string]: number }>(
    categories.reduce((acc, category) => {
      acc[category] = 100; // Default value before API fetch
      return acc;
    }, {} as { [key: string]: number })
  );

  // Update state once spendingLimits are fetched
  useEffect(() => {
    if (spendingLimits.length > 0) {
      const fetchedLimits = spendingLimits.reduce(
        (
          acc: { [key: string]: number },
          limit: { name: string; limit: number }
        ) => {
          acc[limit.name] = limit.limit;
          return acc;
        },
        {}
      );
      setLimits(fetchedLimits);
    }
  }, [spendingLimits]);

  const [updateLimits] = useUpdateUserMutation();

  const handleLimitChange = (category: string, value: number) => {
    setLimits((prev) => ({ ...prev, [category]: value }));
  };

  const getStyle = (value: any) => ({
    "--value": `${(value / 1000) * 100}%`,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = (await updateLimits({
      id: user?.userId,
      body: {
        spendingLimits: Object.entries(limits).map(([name, limit]) => ({
          name,
          limit,
        })),
      },
    })) as unknown as TResponse<any>;

    console.log(res);

    if (res.error) {
      toast.error(res.error.data.message, { duration: 2000 });
    } else {
      toast.success(res.data.message, { duration: 2000 });
    }
  };

  return (
    <div className={`${styles.spendLimit}`}>
      <h2>Set Monthly Spending Limits</h2>
      <form onSubmit={handleSubmit}>
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
  );
};

export default SpendingLimitForm;
