"use client"
import Image from 'next/image';
import { useEffect} from 'react';
import React, { useState } from 'react';
import ChartContainer from '../ChartContainer/ChartContainer';
import styles from './Calculator.module.css';

export default function Calculator() {
  const [selectedGender, setSelectedGender] = useState(null);
  const [feet, setFeet] = useState('');
  const [heightInInches, setHeightInInches] = useState('');
  const [heightInCm, setHeightInCm] = useState('');
  const [isInches, setIsInches] = useState(true);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState('NaN');

  const handleAgeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
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
  
  const handleCalculate = () => {
    let heightInMeters;
  
    if (isInches) {
      const totalInches = (parseInt(feet, 10) * 12) + parseInt(heightInInches, 10);
      heightInMeters = totalInches * 0.0254;
    } else {
      heightInMeters = parseFloat(heightInCm) * 0.01;
    }

    const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);
      
    setBmiResult(bmi.toFixed(2));
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await fetch('/api/bmi');
      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Failed to fetch data from API');
      }
      } catch (error) {
      console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
    }, []);

  return (
    <>
    <main className={styles.main}>
      <div>
        <div className={styles.Header}>
          <Image className={styles.Logo} src="/bmilogo.png" alt="" width={100} height={50} />
          <div className={styles.HeaderContent}>
            <h1 className={styles.Title}>BMI Calculator</h1>
            <h2 className={styles.Subtitle}>Body Mass Index</h2>
          </div>
        </div>
        
        <div className={styles.TwoColumnGrid}>
          <div className={styles.FormGroup}>
            <label className={styles.Label}>Gender:</label>
            <div>
            <button onClick={() => handleGenderChange('male')} style={{color: selectedGender === 'male' ? 'white' : '#333', padding: '10px 22px', marginRight: '20px', border: selectedGender === 'male' ? 'white' : '2px solid #333', backgroundColor: selectedGender === 'male' ? 'orange' : 'hsl(0, 0%, 100%)',}}>
              Male
            </button>
            <button onClick={() => handleGenderChange('female')} style={{color: selectedGender === 'female' ? 'white' : '#333', padding: '10px 22px', marginRight: '20px', border: selectedGender === 'female' ? 'white' : '2px solid #333', backgroundColor: selectedGender === 'female' ? 'orange' : 'hsl(0, 0%, 100%)',}}>
                Female
            </button>
            </div>
          </div>

          <div className={styles.FormGroup}>
            <label className={styles.Label}>Age:</label>
            <input
              type="number"
              value={age}
              onChange={handleAgeChange}
              placeholder="Enter age in years"
              className={styles.Input}
            />
            <p className={styles.Note}>(Between 2 yrs and 120 yrs)</p>
          </div>
        </div>

        
        <div className={styles.FormContainer}>
            {isInches ? (
              <div className={styles.FormSection}>
                <div className={styles.InputContainer}>
                  <label className={styles.InputLabel}>Enter Height:</label>
                  <div className={styles.InputWrapper}>
                    <input
                      type="number"
                      value={feet}
                      onChange={handleFeetChange}
                      placeholder="Feet"
                      className={styles.InputFeet}
                    />
                    <input
                      type="number"
                      value={heightInInches}
                      onChange={handleInchesChange}
                      placeholder="Inches"
                      className={styles.InputInches}
                    />
                  </div>
                </div>
                <div className={styles.UnitSwitch}>
                  <p className={styles.SwitchText} onClick={handleUnitSwitch}>
                    Switch to cm
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.FormSection}>
                <div className={styles.InputContainer}>
                  <label className={styles.InputLabel}>Enter Height:</label>
                  <div className={styles.InputWrapper}>
                    <input
                      type="number"
                      value={heightInCm}
                      onChange={handleHeightChange}
                      placeholder="Height in centimeters"
                      className={styles.InputCm}
                    />
                  </div>
                </div>
                <div className={styles.UnitSwitch}>
                  <p className={styles.SwitchText} onClick={handleUnitSwitch}>
                    Switch to inches
                  </p>
                </div>
              </div>
            )}
          

          <div className={styles.WeightContainer}>
            <div className={styles.WeightInput}>
              <label className={styles.WeightLabel}>Weight (kg):</label>
              <input
                type="number"
                value={weight}
                onChange={handleWeightChange}
                placeholder="Enter weight in kg"
                className={styles.WeightField}
              />
            </div>
          </div>
        </div>
        <div className={styles.ButtonContainer}>
          <button onClick={handleCalculate} className={styles.CalculateButton}>
            Calculate
          </button>
        </div>
      </div>
      <div>
        <ChartContainer bmiResult={bmiResult} />
      </div>
    </main>
    </>
  );
}