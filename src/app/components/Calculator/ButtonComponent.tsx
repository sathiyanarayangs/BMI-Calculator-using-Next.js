import React from "react";
import styles from './Button.module.css';

export default function ButtonComponent({ bmiResult, handleSubmit, customStyle }) {
  const buttonClassName = customStyle ? customStyle : {}

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit(); 
  };

  return (
    <div>	
      <button className={styles.defaultStyles} style={buttonClassName} onClick={handleClick}>
        {bmiResult === 'NaN' ? (
          <div>Calculate &gt;</div>
        ) : (
          <div>Recalculate &#10227;</div>
        )}
      </button>
    </div>
  );
}