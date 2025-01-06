"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={styles["navbar-container"]}>
        <div className={styles["navbar-logo"]}>
          <Link href="/">Logo</Link>
        </div>
        <div className={styles["navbar-buttons"]}>
          <Link href="/dashboard" className={styles.button}>
            Dashboard
          </Link>
          {isClient && user?.email ? (
            <Image
              src={user.profilePicture}
              width={50}
              height={50}
              className={styles.profileImage}
              alt="profile image"
            />
          ) : (
            <Link
              href="/login"
              className={`${styles.button} ${styles["login-button"]}`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
