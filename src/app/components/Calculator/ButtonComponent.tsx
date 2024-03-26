import React from "react";
import styles from './Button.module.css';

export default function ButtonComponent({ bmiResult, handleCalculate }) {
	return (
		<div className={styles.ButtonContainer}>	
			<button onClick={handleCalculate} className={styles.CalculateButton}>
				{bmiResult==='NaN'?(<div>Calculate &gt;</div>):(<div>Recalculate &#10227;</div>)}
			</button>
		</div>
	)
}