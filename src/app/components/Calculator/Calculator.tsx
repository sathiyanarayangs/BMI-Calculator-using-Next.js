"use client"
import React, { useState } from 'react';
import styles from './Calculator.module.css';
import Header from './Header';
import LeftGrid from './LeftGrid';
import RightGrid from './RightGrid';

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
  

  function handleCalculate(ev) {
    let valid=false;

    if(isInches){
      if((parseInt(feet)>=4 && parseInt(feet)<=8) && (parseInt(heightInInches)>=0 && parseInt(heightInInches)<=11) && (parseInt(weight)>=40 && parseInt(weight)<=600)){
        valid=true;
      }
    }
    else{
      if((parseInt(heightInCm)>=100 && parseInt(heightInCm)<=244) && (parseInt(weight)>=15 && parseInt(weight)<=272)){
        valid=true;
      }
    }

    if(selectedCategory=="Child (Age 5-19)"){
      if(parseInt(age)<5 || parseInt(age)>19 || parseInt(month)>12){
        valid=false;
      }
    }

    if(valid){
      const queryString = `?feet=${feet}&heightInInches=${heightInInches}&heightInCm=${heightInCm}&weight=${weight}&isInches=${isInches}`;

      return fetch(`/api/bmi${queryString}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }).then(response => {
          if (response.ok) {
            return response.json().then(data => {
              console.log("Data from API:", data); 
              setBmiResult(parseFloat(data).toFixed(2));
              console.log("BMI Result:", parseFloat(data).toFixed(2));
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
            });
          }
            else {
              alert("Error");
            }
          }).catch(error => {
          console.log('error: ', error);
        });
      }
  }

  return (
    <>
    <div style={{display: 'flex', justifyContent:'space-evenly'}}>
      <div style={{ width: '80%'}}>
        <Header/>
        <div className={styles.stylesGrid}>
          <LeftGrid
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedGender={selectedGender}
              handleGenderChange={handleGenderChange}
              age={age}
              month={month}
              handleAgeChange={handleAgeChange}
              handleMonthChange={handleMonthChange}
              feet={feet}
              heightInInches={heightInInches}
              handleFeetChange={handleFeetChange}
              handleInchesChange={handleInchesChange}
              heightInCm={heightInCm}
              handleHeightChange={handleHeightChange}
              weight={weight}
              handleWeightChange={handleWeightChange}
              isInches={isInches}
              setIsInches={setIsInches}
              handleCalculate={handleCalculate}
              bmiResult={bmiResult}
          />
          <RightGrid
              bmiResult={bmiResult}
              healthyCategory={healthyCategory}
              xAxis={xAxis}
              healthyweight1={healthyweight1}
              healthyweight2={healthyweight2}
              isInches={isInches}
          />
      </div>
    </div>
  </div>
  </>
  );
}