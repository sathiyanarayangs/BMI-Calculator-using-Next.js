import React from 'react';
import styles from './Calculator.module.css';

export default function RightGrid({ bmiResult, healthyCategory, xAxis, healthyweight1, healthyweight2, isInches }) {
  return (
    <div className={styles.stylesRightGrid}>
      {bmiResult === 'NaN' ? (
        <div style={{ textAlign: 'center', fontWeight: '500' }}>
          <p>Use this calculator to check your body mass index (BMI), </p>
          <p>which can be a helpful tool in determining your weight category. </p>
          <p>Or, use it to calculate your child’s BMI.</p>
        </div>
      ) : (
        <div className={styles.RightContent}>
          <h1 style={{ fontWeight: 'bold' }}>Your Body Mass Index (BMI) is <span style={{ fontSize: '40px', color: '#657E79', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>{bmiResult}</span></h1><br /><hr /><br />
          <h1 style={{ fontWeight: 'bold' }}>According to your inputs, your weight is in the<span style={{ fontSize: '40px', color: '#657E79', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>{healthyCategory}</span>category</h1><br />
          <br /><br />
          <svg width="65%" height="300" style={{ position: 'absolute', zIndex: '2' }}>
            <circle cx={xAxis} cy="25" r="18" stroke="white" strokeWidth={4} fill="#657E79" />
          </svg>
          <br />
          <div style={{ display: 'flex', position: 'relative', zIndex: '1' }}>
            <div style={{ backgroundColor: 'green', width: '200px', height: '5px' }}></div>
            <div style={{ backgroundColor: 'lightgreen', width: '200px', height: '5px' }}></div>
            <div style={{ backgroundColor: 'orange', width: '200px', height: '5px' }}></div>
            <div style={{ backgroundColor: 'red', width: '200px', height: '5px' }}></div>
          </div>
          <br />
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <div style={{ width: '200px', height: '5px', textAlign: 'center', fontWeight: 'bold' }}>Underweight</div>
            <div style={{ width: '200px', height: '5px', textAlign: 'center', fontWeight: 'bold' }}>Healthy</div>
            <div style={{ width: '200px', height: '5px', textAlign: 'center', fontWeight: 'bold' }}>Overweight</div>
            <div style={{ width: '200px', height: '5px', textAlign: 'center', fontWeight: 'bold' }}>Obese</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '200px', height: '5px', textAlign: 'center', color: 'grey' }}>(Below 18.5)</div>
            <div style={{ width: '200px', height: '5px', textAlign: 'center', color: 'grey' }}>(18.5 - 25.0)</div>
            <div style={{ width: '200px', height: '5px', textAlign: 'center', color: 'grey' }}>(25.0 - 30.0)</div>
            <div style={{ width: '200px', height: '5px', textAlign: 'center', color: 'grey' }}>(30.0 & Above)</div>
          </div>
          <br /><br /><hr /><br />
          <h1 style={{ fontWeight: 'bold' }}>For your height, a healthy weight would be between <span style={{ fontSize: '40px', color: '#657E79', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>{healthyweight1} & {healthyweight2}</span>{isInches==="true" ? ("pounds") : ("kilograms")}</h1>
        </div>)}
    </div>
  );
}