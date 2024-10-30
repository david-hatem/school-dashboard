"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/SplashScreen.module.css";

const SplashScreen: React.FC = () => {
  const router = useRouter();

  // Redirect to /admin after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/admin");
    }, 3000);

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <span className={styles.text}>SCHOOL</span>
      </div>
    </div>
  );
};

export default SplashScreen;
