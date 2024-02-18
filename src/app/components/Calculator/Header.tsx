import React from 'react';
import styles from './Calculator.module.css';
import Image from 'next/image';

export default function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderContent}>
        <h1 className={styles.Title}>BMI Calculator</h1>
        <h2 className={styles.Subtitle}>Use this calculator to check your body mass index (BMI).</h2>
      </div>
      <div>
        <Image className={styles.Logo} src="/bmilogo.png" alt="" width={100} height={50} />
      </div>
    </div>
  );
};

