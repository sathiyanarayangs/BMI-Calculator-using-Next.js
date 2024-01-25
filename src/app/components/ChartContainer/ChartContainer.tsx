"use client"
import React from 'react';
import styles from './ChartContainer.module.css';
import { PieChart, Pie, Cell } from 'recharts';


export default function ChartContainer({ bmiResult }){
	
	const RADIAN = Math.PI / 180;
	const data = [
			{ name: 'A', value: 18.5, color: '#9ca3af' },
			{ name: 'B', value: 24.9, color: '#d9f99d' },
			{ name: 'C', value: 29.9, color: '#fdba74' },
			{ name: 'D', value: 35, color: '#fca5a5' },
	];
	const cx = 150;
	const cy = 200;
	const iR = 50;
	const oR = 100;
	let value;
	if(bmiResult<18.5){
		value=8;
	}
	else if(bmiResult<24.9){
		value=30;
	}
	else if(bmiResult<29.9){
		value=58;
	}
	else if(bmiResult<100){
		value=92;
	}

	const needle = (value, data, cx, cy, iR, oR, color) => {
		let total = 0;
		data.forEach((v) => {
		  total += v.value;
		});
		const ang = 180.0 * (1 - value / total);
		const length = (iR + 2 * oR) / 3;
		const sin = Math.sin(-RADIAN * ang);
		const cos = Math.cos(-RADIAN * ang);
		const r = 5;
		const x0 = cx + 5;
		const y0 = cy + 5;
		const xba = x0 + r * sin;
		const yba = y0 - r * cos;
		const xbb = x0 - r * sin;
		const ybb = y0 + r * cos;
		const xp = x0 + length * cos;
		const yp = y0 + length * sin;
	  
		return [
		  <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
		  <path key="path" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
		];
	  };
			
	return(
		<>
		<div className={styles.Container}>
			<div className={styles.Box}>
				<p className={styles.BmiText}>Your BMI is</p>
				<p
				className={`${styles.BmiValue} ${
					bmiResult < 18.5 ? styles.Underweight : bmiResult <= 24.9 ? styles.Normal : styles.Obese
				}`}
				>
				{bmiResult}
				</p>
			</div>
			{isNaN(bmiResult) ? (<h1></h1>):
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
					<div style={{ width: '50%', height: '30vh' }}>
						<PieChart width={400} height={500}>
							<Pie
							dataKey="value"
							startAngle={180}
							endAngle={0}
							data={data}
							cx={cx}
							cy={cy}
							innerRadius={iR}
							outerRadius={oR}
							fill="#8884d8"
							stroke="none"
							>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
							</Pie>
							{needle(value, data, cx, cy, iR, oR, '#333')}
						</PieChart>
					</div>
				</div>
			}	

			<div style={{marginBottom:'50px'}}>
				{isNaN(bmiResult) ? (
				<h1></h1>
				) : bmiResult < 18.5 ? (
				<h1 style={{fontSize:'35px'}} className={styles.Underweight}>Underweight</h1>
				) : bmiResult <= 24.9 ? (
				<h1 style={{fontSize:'35px'}} className={styles.Normal}>Normal</h1>
				) : bmiResult <= 29.9 ? (
					<h1 style={{fontSize:'35px'}} className={styles.Obese}>Overweight</h1>
				) : (
				<h1 style={{fontSize:'35px'}} className={styles.Obese}>Obese</h1>
				)}
			</div>

			<div className={styles.Info}>
				<p>By maintaining a healthy weight, you lower your risk of developing serious health problems.</p>
				<p className={styles.HealthyBMI}>Healthy BMI range: 18.5 kg/m² - 25 kg/m²</p>
			</div>
		</div>
		</>
	);
}