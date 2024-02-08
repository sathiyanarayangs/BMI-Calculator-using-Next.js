"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './Calculator.module.css';

export default function Calculator() {
  const [selectedGender, setSelectedGender] = useState('male');
  const [feet, setFeet] = useState('');
  const [heightInInches, setHeightInInches] = useState('');
  const [heightInCm, setHeightInCm] = useState('');
  const [isInches, setIsInches] = useState(true);
  const [age, setAge] = useState('');
  const [month,setMonth]=useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState('NaN');
  const [selectedCategory, setSelectedCategory] = useState('Adult (Age 20+)'); 
  const [healthyCategory, setHealthyCategory]=useState('');
  const [healthyweight1, sethealthyweight1]=useState('');
  const [healthyweight2, sethealthyweight2]=useState('');
  const [xAxis, setxAxis]=useState('');

  const handleAgeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };

  const handleMonthChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  const handleWeightChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  const handleFeetChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setFeet(event.target.value);
  };

  const handleInchesChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setHeightInInches(event.target.value);
  };
  

  const handleHeightChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setHeightInCm(event.target.value);
  };

  const handleUnitSwitch = () => {
    setFeet(''); 
    setHeightInInches(''); 
    setIsInches(!isInches);
	  setBmiResult('NaN'); 
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };
  

  async function handleCalculate(ev) {
    const response = await fetch('/api/bmi', {
      method: 'POST',
      body: JSON.stringify({feet, heightInInches, heightInCm, weight, isInches}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
      const data = await response.json();
      setBmiResult(data.toFixed(2));
      if(isInches){
        let h1=(18.5/703)*(parseInt(feet)*12+parseInt(heightInInches))*(parseInt(feet)*12+parseInt(heightInInches));
        sethealthyweight1(h1.toFixed(0));
        let h2=(25.0/703)*(parseInt(feet)*12+parseInt(heightInInches))*(parseInt(feet)*12+parseInt(heightInInches));
        sethealthyweight2(h2.toFixed(0));
      }
      if(!isInches){
        let h1=18.5*parseInt(heightInCm)*parseInt(heightInCm)*0.0001;
        sethealthyweight1(h1.toFixed(0));
        let h2=25.0*parseInt(heightInCm)*parseInt(heightInCm)*0.0001;
        sethealthyweight2(h2.toFixed(0));
      }
      if(data<18.5){
        setHealthyCategory('Underweight')
        setxAxis("100");
      }
      else if(data>=18.5 && data<25.0){
        setHealthyCategory('Healthy')
        setxAxis("300");
      }
      else if(data>=25.0 && data<30.0){
        setHealthyCategory('Overweight')
        setxAxis("500");
      }
      else if(data>30.0){
          setHealthyCategory('Obese')
          setxAxis("700");
      }

    }
    else {
      alert("Error");
    }
  }

  return (
    <>
    <div style={{display: 'flex', justifyContent:'space-evenly'}}>
      <div style={{ width: '80%'}}>
        <div className={styles.Header}>
              <div className={styles.HeaderContent}>
                <h1 className={styles.Title}>BMI Calculator</h1>
                <h2 className={styles.Subtitle}>Use this calculator to check your body mass index (BMI).</h2>
              </div>
              <div>
                <Image className={styles.Logo} src="/bmilogo.png" alt="" width={100} height={50} />
              </div>
        </div>
        <div className={styles.stylesGrid}>
          <div className={styles.stylesLeftGrid}>
            <div>
              <label className={styles.Label}>Select</label>
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} style={{padding:'15px'}}>
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
                    ):(
                    <div style={{display:'flex', position:'relative'}}>
                      <input
                        type="number"
                        value={heightInCm}
                        onChange={handleHeightChange}
                        className={styles.Input}
                      />
                      <span className={styles.suffix}>cms</span>
                      </div>)}
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
                  <div style={{display:'flex', position:'relative'}}>
                      <input
                        type="number"
                        value={weight}
                        onChange={handleWeightChange}
                        className={styles.Input}
                      />
                      <span className={styles.suffix}>lbs</span>
                      </div>
                    ):(
                    <div style={{display:'flex', position:'relative'}}>
                      <input
                        type="number"
                        value={weight}
                        onChange={handleWeightChange}
                        className={styles.Input}
                      />
                      <span className={styles.suffix}>Kg</span>
                      </div>)}
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
              </div>
            

             <div className={styles.stylesRightGrid}> {/*Right side division */}
              {bmiResult==='NaN'?(
                <div style={{textAlign:'center', fontWeight:'500'}}>
                  <p>Use this calculator to check your body mass index (BMI), </p>
                  <p>which can be a helpful tool in determining your weight category. </p>
                  <p>Or, use it to calculate your child’s BMI.</p>
                </div>
              ):(
              <div className={styles.RightContent}>
                <h1 style={{fontWeight:'bold'}}>Your Body Mass Index (BMI) is <span style={{fontSize:'40px', color:'#657E79', fontWeight:'bold', marginLeft:'10px', marginRight:'10px'}}>{bmiResult}</span></h1><br /><hr /><br />
                <h1 style={{fontWeight:'bold'}}>According to your inputs, your weight is in the<span style={{fontSize:'40px', color:'#657E79', fontWeight:'bold', marginLeft:'10px', marginRight:'10px'}}>{healthyCategory}</span>category</h1><br />
                <br /><br />
                <svg width="100%" height="300" style={{position:'absolute', zIndex:'2'}}>
                  <circle cx={xAxis} cy="25" r="18" stroke="white" stroke-width="4" fill="#657E79" />
                </svg> 
                <br />
                <div style={{display:'flex', position:'relative', zIndex:'1'}}>
                  <div style={{backgroundColor:'green', width:'200px', height:'5px'}}></div>
                  <div style={{backgroundColor:'lightgreen', width:'200px', height:'5px'}}></div>
                  <div style={{backgroundColor:'orange', width:'200px', height:'5px'}}></div>
                  <div style={{backgroundColor:'red', width:'200px', height:'5px'}}></div>
                </div>
                <br />
                <div style={{display:'flex', marginBottom:'20px'}}>
                  <div style={{width:'200px', height:'5px', textAlign:'center', fontWeight:'bold'}}>Underweight</div>
                  <div style={{ width:'200px', height:'5px', textAlign:'center', fontWeight:'bold'}}>Healthy</div>
                  <div style={{ width:'200px', height:'5px', textAlign:'center', fontWeight:'bold'}}>Overweight</div>
                  <div style={{ width:'200px', height:'5px', textAlign:'center', fontWeight:'bold'}}>Obese</div>
                </div>
                <div style={{display:'flex'}}>
                  <div style={{width:'200px', height:'5px', textAlign:'center',  color:'grey'}}>(Below 18.5)</div>
                  <div style={{ width:'200px', height:'5px', textAlign:'center', color:'grey'}}>(18.5 - 25.0)</div>
                  <div style={{ width:'200px', height:'5px', textAlign:'center', color:'grey'}}>(25.0 - 30.0)</div>
                  <div style={{ width:'200px', height:'5px', textAlign:'center', color:'grey'}}>(30.0 & Above)</div>
                </div>
                <br /><br /><hr /><br />
                <h1 style={{fontWeight:'bold'}}>For your height, a healthy weight would be between <span style={{fontSize:'40px', color:'#657E79', fontWeight:'bold', marginLeft:'10px', marginRight:'10px'}}>{healthyweight1} & {healthyweight2}</span>{isInches?("pounds"):("kilograms")}</h1>
              </div>)}
            </div>
          </div>
          </div>
        </div>
    </>
  );
}