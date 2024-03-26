import React from "react";
import styles from './Calculator.module.css';
import ButtonComponent from './ButtonComponent';

export default function LeftGrid({
	selectedCategory,
	setSelectedCategory,
	selectedGender,
	handleGenderChange,
	age,
	month,
	handleAgeChange,
	handleMonthChange,
	feet,
	heightInInches,
	handleFeetChange,
	handleInchesChange,
	heightInCm,
	handleHeightChange,
	weight,
	handleWeightChange,
	isInches,
	setIsInches,
	handleCalculate,
	bmiResult,
  }){

	return(
		<div className={styles.stylesLeftGrid}>
			<div>
			<label className={styles.Label}>Select</label>
				<select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} style={{padding:'15px', width:'100%', border: '1px solid #ccc',borderRadius:'0.25rem', fontWeight:'500'}}>
				<option value="Child (Age 5-19)">Child (Age 5-19)</option>
				<option value="Adult (Age 20+)">Adult (Age 20+)</option>
				</select>
			</div>
			{selectedCategory==="Child (Age 5-19)"?(
			<div>
				<label className={styles.Label}>Age</label>
				<div style={{display: 'flex'}}>
						<div style={{width:'45%', marginRight: '20px', display:'flex', position:'relative'}}>
							<input
							type="number"
							value={age}
							onChange={handleAgeChange}
							className={styles.Input}
							/>
							<span className={styles.suffix}>years</span>
						</div>
						<div style={{width:'50%', display:'flex', position:'relative'}}>
						<input
							type="number"
							value={month}
							onChange={handleMonthChange}
							className={styles.Input}
						/>
						<span className={styles.suffix}>months</span>
						</div>
				</div>
				<div className={styles.inputInvalid}>
					{(parseInt(age)>=5  && parseInt(age)<=19) || age=="" ? (<div></div>):(<span>Please enter an age between 5 and 19 years. </span> )}
					{(parseInt(month)>=0  && parseInt(month)<=11) || month=="" ? (<div></div>):(<span>Please enter an age between 0 and 11 months.</span> )}
				</div>
				</div>
			):(
			<div></div>
			)}

			<div>
				<label className={styles.Label}>Height</label>
				<div>
				<label style={{marginRight:'30px'}}>
				<input type="radio" value="false" 
								checked={isInches === false} 
								onChange={e => setIsInches(false)} style={{marginRight:'5px' , accentColor: '#657E79'}}/>
				Centimetres
				</label>
				<label>
				<input type="radio" value="true" 
								checked={isInches === true} 
								onChange={e => setIsInches(true)}  style={{marginRight:'5px' , accentColor: '#657E79'}}/>
				Feet and inches
				</label>
				</div>
				<div>
				{isInches?(
				<div>
					<div>
					<div style={{display: 'flex'}}>
						<div style={{width:'45%', marginRight: '20px', display:'flex', position:'relative'}}>
							<input
							type="number"
							value={feet}
							onChange={handleFeetChange}
							className={styles.Input}
							/>
							<span className={styles.suffix}>ft</span>
						</div>
						<div style={{width:'50%', display:'flex', position:'relative'}}>
							<input
							type="number"
							value={heightInInches}
							onChange={handleInchesChange}
							className={styles.Input}
							/>
						<span className={styles.suffix}>in</span>
						</div>
					</div>
					</div>
					<div className={styles.inputInvalid}>
						{(parseInt(feet)>=0  && parseInt(feet)<=11) || feet=="" ? (<div></div>):(<span>Height value must be between 4 and 8 feet. </span> )}
						{(parseInt(heightInInches)>=4  && parseInt(heightInInches)<=8) || heightInInches=="" ? (<div></div>):(<span>Please enter a value between 0 and 11 inches </span> )}
					</div>
				</div>
					):(
					<div>
						<div style={{display:'flex', position:'relative'}}>
						<input
							type="number"
							value={heightInCm}
							onChange={handleHeightChange}
							className={styles.Input}
						/>
						<span className={styles.suffix}>cms</span>
						</div>
						<div className={styles.inputInvalid}>
						{(parseInt(heightInCm)>=100  && parseInt(heightInCm)<=244) || heightInCm=="" ? (<div></div>):(<span>Please enter a value between 100 and 244 cm </span> )}
						</div>
					</div> 
					)}
				</div>
			</div>
			

			<div>
				<label className={styles.Label}>Weight</label>
				<div>
				<label style={{marginRight:'30px'}}>
				<input type="radio" value="false" 
								checked={isInches === false} 
								onChange={e => setIsInches(false)} style={{marginRight:'5px', accentColor: '#657E79'}}/>
				Kilograms
				</label>
				<label>
				<input type="radio" value="true" 
								checked={isInches === true} 
								onChange={e => setIsInches(true)} style={{marginRight:'5px', accentColor: '#657E79'}} />
				Pounds
				</label>
				</div>
				<div>
				{isInches?(
					<div>
						<div style={{display:'flex', position:'relative'}}>
							<input
							type="number"
							value={weight}
							onChange={handleWeightChange}
							className={styles.Input}
							/>
							<span className={styles.suffix}>lbs</span>
						</div>
						<div className={styles.inputInvalid}>
						{(parseInt(weight)>=40  && parseInt(weight)<=600) || weight=="" ? (<div></div>):(<span>Please enter a weight between 40 and 600 pounds </span> )}
						</div>
					</div>
					):(
					<div>
						<div style={{display:'flex', position:'relative'}}>
							<input
							type="number"
							value={weight}
							onChange={handleWeightChange}
							className={styles.Input}
							/>
							<span className={styles.suffix}>Kg</span>
						</div>
						<div className={styles.inputInvalid}>
						{(parseInt(weight)>=15  && parseInt(weight)<=272) || weight=="" ? (<div></div>):(<span>Please enter a weight between 15 and 272 Kilogram </span> )}
						</div>
					</div>
					
					)}
				</div>
			</div>
			
			{selectedCategory==="Child (Age 5-19)"?(

				<div>
				<label className={styles.Label}>Gender</label>
				<div>
					<label style={{marginRight:'30px'}}>
					<input type="radio" value="male" 
									checked={selectedGender === 'male'} 
									onChange={e => handleGenderChange('male')} style={{marginRight:'5px', accentColor: '#657E79'}}/>
					Male
					</label>
					<label>
					<input type="radio" value="female" 
									checked={selectedGender === 'female'} 
									onChange={e =>handleGenderChange('female')} style={{marginRight:'5px', accentColor: '#657E79'}}/>
					Female
					</label>
				</div>
				</div>
			):(<div></div>)}
			
			<ButtonComponent
				bmiResult={bmiResult}
				handleCalculate={handleCalculate}
			/>
		  </div>
	)
}