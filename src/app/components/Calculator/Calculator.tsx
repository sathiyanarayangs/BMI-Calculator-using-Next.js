"use client";
import React, { useState } from "react";
import styles from "./Calculator.module.css";
import Header from "./Header";
import Chart from "./Chart";
import { useForm } from "react-hook-form";
import ButtonComponent from "./ButtonComponent";

export default function Calculator() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedCategory: "Adult (Age 20+)",
      isInches: "true",
      selectedGender: "male",
      age: "",
      month: "",
      feet: "",
      heightInInches: "",
      heightInCm: "",
      weight: "",
    },
  });

  const customStyle = {
    backgroundColor: "#657E79",
    color: "white",
    borderRadius: "4px",
    width: "100%",
  };

  const watchCategory = watch("selectedCategory");
  const watchUnit = watch("isInches");
  const [bmiResult, setBmiResult] = useState("NaN");
  const [healthyCategory, setHealthyCategory] = useState("");
  const [healthyweight1, sethealthyweight1] = useState("");
  const [healthyweight2, sethealthyweight2] = useState("");
  const [xAxis, setxAxis] = useState("");

  const onSubmit = async (data) => {
    let feet = data.feet;
    let heightInInches = data.heightInInches;
    let heightInCm = data.heightInCm;
    const queryString = `?feet=${feet}&heightInInches=${heightInInches}&heightInCm=${heightInCm}&weight=${data.weight}&isInches=${data.isInches}`;
    return fetch(`/api/bmi${queryString}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((bmi) => {
            console.log("Data from API:", bmi);
            setBmiResult(parseFloat(bmi).toFixed(2));
            console.log("BMI Result:", parseFloat(bmi).toFixed(2));
            console.log(parseInt(data.feet));
            if (watchUnit === "true") {
              let h1 =
                (18.5 / 703) *
                (parseInt(feet) * 12 + parseInt(heightInInches)) *
                (parseInt(feet) * 12 + parseInt(heightInInches));
              sethealthyweight1(h1.toFixed(0));
              let h2 =
                (25.0 / 703) *
                (parseInt(feet) * 12 + parseInt(heightInInches)) *
                (parseInt(feet) * 12 + parseInt(heightInInches));
              sethealthyweight2(h2.toFixed(0));
            } else {
              let h1 =
                18.5 * parseInt(heightInCm) * parseInt(heightInCm) * 0.0001;
              sethealthyweight1(h1.toFixed(0));
              let h2 =
                25.0 * parseInt(heightInCm) * parseInt(heightInCm) * 0.0001;
              sethealthyweight2(h2.toFixed(0));
            }
            if (bmi < 18.5) {
              setHealthyCategory("Underweight");
              setxAxis("100");
            } else if (bmi >= 18.5 && bmi < 25.0) {
              setHealthyCategory("Healthy");
              setxAxis("300");
            } else if (bmi >= 25.0 && bmi < 30.0) {
              setHealthyCategory("Overweight");
              setxAxis("500");
            } else if (bmi > 30.0) {
              setHealthyCategory("Obese");
              setxAxis("700");
            }
          });
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ width: "100%" }}>
            <Header />
            <div className={styles.stylesGrid}>
              <div className={styles.stylesLeftGrid}>
                <div>
                  <label className={styles.Label}>Select</label>
                  <select
                    {...register("selectedCategory")}
                    style={{
                      padding: "15px",
                      width: "100%",
                      border: "1px solid #ccc",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    <option value="Adult (Age 20+)">Adult (Age 20+)</option>
                    <option value="Child (Age 5-19)">Child (Age 5-19)</option>
                  </select>
                </div>
                {watchCategory === "Child (Age 5-19)" ? (
                  <div>
                    <label className={styles.Label}>Age</label>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          width: "45%",
                          marginRight: "20px",
                          display: "flex",
                          position: "relative",
                        }}
                      >
                        <input
                          {...register("age", {
                            required: true,
                            validate: (value) =>
                              (parseInt(value) >= 5 && parseInt(value) <= 19) ||
                              "Please enter an age between 5 and 19 years. ",
                          })}
                          type="number"
                          className={styles.Input}
                        />
                        <span className={styles.suffix}>years</span>
                      </div>
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          position: "relative",
                        }}
                      >
                        <input
                          {...register("month", {
                            required: true,
                            validate: (value) =>
                              (parseInt(value) >= 0 && parseInt(value) <= 11) ||
                              "Please enter an age between 0 and 11 months. ",
                          })}
                          type="number"
                          className={styles.Input}
                        />
                        <span className={styles.suffix}>months</span>
                      </div>
                    </div>
                    {errors.age && (
                      <span className={styles.inputInvalid}>
                        {errors.age.message}
                      </span>
                    )}
                    {errors.month && (
                      <span className={styles.inputInvalid}>
                        {errors.month.message}
                      </span>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}

                <div>
                  <label className={styles.Label}>Height</label>
                  <div>
                    <label style={{ marginRight: "30px" }}>
                      <input
                        type="radio"
                        {...register("isInches")}
                        value="false"
                        checked={watchUnit === "false"}
                        onChange={() => setValue("isInches", "false")}
                        style={{ marginRight: "5px", accentColor: "#657E79" }}
                      />
                      Centimetres
                    </label>
                    <label>
                      <input
                        type="radio"
                        {...register("isInches")}
                        value="true"
                        checked={watchUnit === "true"}
                        onChange={() => setValue("isInches", "true")}
                        style={{ marginRight: "5px", accentColor: "#657E79" }}
                      />
                      Feet and inches
                    </label>
                  </div>
                  {watchUnit === "true" ? (
                    <div>
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "45%",
                            marginRight: "20px",
                            display: "flex",
                            position: "relative",
                          }}
                        >
                          <input
                            type="number"
                            {...register("feet", {
                              validate: (value) =>
                                (parseInt(value) >= 4 &&
                                  parseInt(value) <= 8) ||
                                "Height value must be between 4 and 8 feet. ",
                            })}
                            className={styles.Input}
                          />
                          <span className={styles.suffix}>ft</span>
                        </div>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            position: "relative",
                          }}
                        >
                          <input
                            type="number"
                            {...register("heightInInches", {
                              validate: (value) =>
                                (parseInt(value) >= 0 &&
                                  parseInt(value) <= 11) ||
                                "Please enter a value between 0 and 11 inches. ",
                            })}
                            className={styles.Input}
                          />
                          <span className={styles.suffix}>in</span>
                        </div>
                      </div>

                      {errors.feet && (
                        <span className={styles.inputInvalid}>
                          {errors.feet.message}
                        </span>
                      )}
                      {errors.heightInInches && (
                        <span className={styles.inputInvalid}>
                          {errors.heightInInches.message}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: "flex", position: "relative" }}>
                        <input
                          type="number"
                          {...register("heightInCm", {
                            validate: (value) =>
                              (parseInt(value) >= 100 &&
                                parseInt(value) <= 244) ||
                              "Please enter a value between 100 and 244 cm",
                          })}
                          className={styles.Input}
                        />
                        <span className={styles.suffix}>cms</span>
                      </div>
                      {errors.heightInCm && (
                        <span className={styles.inputInvalid}>
                          {errors.heightInCm.message}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className={styles.Label}>Weight</label>
                  <div>
                    <label style={{ marginRight: "30px" }}>
                      <input
                        type="radio"
                        {...register("weight")}
                        value="kg"
                        checked={watchUnit === "false"}
                        onChange={() => setValue("isInches", "false")}
                        style={{ marginRight: "5px", accentColor: "#657E79" }}
                      />
                      Kilograms
                    </label>
                    <label>
                      <input
                        type="radio"
                        {...register("weight")}
                        value="pounds"
                        checked={watchUnit === "true"}
                        onChange={() => setValue("isInches", "true")}
                        style={{ marginRight: "5px", accentColor: "#657E79" }}
                      />
                      Pounds
                    </label>
                  </div>
                  <div style={{ display: "flex", position: "relative" }}>
                    <input
                      type="number"
                      {...register("weight", {
                        validate: (value) =>
                          (watchUnit === "true" &&
                            parseInt(value) >= 40 &&
                            parseInt(value) <= 600) ||
                          (watchUnit === "false" &&
                            parseInt(value) >= 15 &&
                            parseInt(value) <= 272) ||
                          "Please enter a weight within the valid range",
                      })}
                      className={styles.Input}
                    />
                    <span className={styles.suffix}>
                      {watchUnit === "true" ? "lbs" : "Kg"}
                    </span>
                  </div>
                  {errors.weight && (
                    <span className={styles.inputInvalid}>
                      {errors.weight.message}
                    </span>
                  )}
                </div>

                {watchCategory === "Child (Age 5-19)" && (
                  <div>
                    <label className={styles.Label}>Gender</label>
                    <div>
                      <label style={{ marginRight: "30px" }}>
                        <input
                          type="radio"
                          {...register("selectedGender")}
                          value="male"
                          onChange={({ target }) =>
                            setValue("selectedGender", target.value)
                          }
                          style={{ marginRight: "5px", accentColor: "#657E79" }}
                        />
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          {...register("selectedGender")}
                          value="female"
                          onChange={({ target }) =>
                            setValue("selectedGender", target.value)
                          }
                          style={{ marginRight: "5px", accentColor: "#657E79" }}
                        />
                        Female
                      </label>
                    </div>
                  </div>
                )}

                <ButtonComponent
                  bmiResult={bmiResult}
                  handleSubmit={handleSubmit(onSubmit)}
                  customStyle={customStyle}
                />
              </div>
              <Chart
                bmiResult={bmiResult}
                healthyCategory={healthyCategory}
                xAxis={xAxis}
                healthyweight1={healthyweight1}
                healthyweight2={healthyweight2}
                isInches={watchUnit}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
