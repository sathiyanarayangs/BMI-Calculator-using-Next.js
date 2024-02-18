import React from "react";
import styles from './Calculator.module.css';

export default function ButtonComponent({ bmiResult, handleCalculate }) {
	return (
		<div className={styles.ButtonContainer}>
				{bmiResult==='NaN'?(
				<button onClick={handleCalculate} className={styles.CalculateButton}>
					Calculate &gt;
				</button>
				):(
				<button onClick={handleCalculate} className={styles.CalculateButton}>
					Recalculate &#10227;
				</button>)}
			</div>
	)}