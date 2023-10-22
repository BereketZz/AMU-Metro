'use client';
import { motion } from "framer-motion";
import styles from "../styles"
import {slideIn, staggerContainer, textVariant} from '../utils/motion'
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Hero = () => {
  
  const{currentUser, isDarkMode, toggleTheme}= useContext(AuthContext)
  
  return(
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>

   
   <motion.div
   variants={staggerContainer}
   initial="hidden"
   whileInView="show"
   viewport={{once:false, amount:0.25}}
   className={`${styles.innerWidth} mx-auto flex flex-col`}
   >
 <div className="flex justify-center items-center flex-col relative z-10">
   <motion.h1 variants={textVariant(1.1)} className={`${styles.heroHeading} ${isDarkMode?"text-white":"text-gray-700"}`}>
    A.M.U.D.M
   </motion.h1>
   <motion.div variants={textVariant(1.2)} className="flex flex-row items-center justify-center">
   <h1 className={`${styles.heroHeading}  ${isDarkMode?"text-white":"text-gray-700"}`}>Data-</h1>
   {/* <div className={`${styles.heroDText}`}></div> */} 
   <h1 className={`${styles.heroHeading} ${isDarkMode?"text-white":"text-gray-700"}`}>FArm</h1>
   </motion.div>

 </div>
 <motion.div
 variants={slideIn('right', 'tween', 0.2,1)}
 className="relative w-full md:-mt-[20px] -mt-[12px]"
 >
  <div className="absolute  w-full h-[300px] blackish-gradient-02 rounded-tl-[140px]  z-[0] -top-[30px]" />
  <img src="/grass.jpg" alt="cover" className="w-full sm:h-[500px] h-[350px] object-fit rounded-tl-[140px] z-10 relative" />
  <a href="#explore" >
    <div className="w-full flex justify-end sm:-mt-[70px] -mt-[50px] pr-[40px] relative z-10 ">
      <img src="/removed.png" className="sm:w-[155px] w-[100px] sm:h-[155px] h-[100px] object-contain" />
    </div>
  </a>
 

 </motion.div>

 </motion.div>

   
  </section>
)};

export default Hero;
//https://c4.wallpaperflare.com/wallpaper/382/44/939/motorcycle-racer-doing-motorcycle-stunt-wallpaper-preview.jpg
// import pandas as pd
// import sklearn as sk
// import numpy as np
// from sklearn.linear_model import LinearRegression
// import matplotlib.pyplot as plt
// from sklearn.model_selection import train_test_split
// from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
// import joblib

// pd.set_option('display.max_columns', None)
// data= pd.read_csv("AMU.csv")
// data=data.drop(0)
// data.replace('---', np.nan, inplace=True)
// # data = data.replace('---', np.nan, inplace=True)
// data['Unnamed: 1'] = pd.to_datetime(data['Unnamed: 1'], format='%I:%M %p')
// data['Hour'] = data['Unnamed: 1'].dt.hour
// data['AM_PM'] = data['Unnamed: 1'].dt.strftime('%p')
// data['AM_PM'] = data['AM_PM'].apply(lambda x: 0 if x == 'AM' else 1)
// data['Time_Feature'] = data['Hour'] + data['AM_PM']
// data= data.fillna(method="bfill")
// X = data[['Temp','Solar','In','Time_Feature']]
// y = data['Soil ']
// X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

// model= LinearRegression()
// model.fit(X_train, y_train)
// y_pred= model.predict(X_test)

// mae = mean_absolute_error(y_test, y_pred)
// mse = mean_squared_error(y_test, y_pred)
// r2 = r2_score(y_test, y_pred)

// print(f"Mean Absolute Error (MAE): {mae}")
// print(f"Mean Squared Error (MSE): {mse}")
// print(f"R-squared (R2): {r2}")

// filename = 'amu_linear_regression_model.pkl'

// # Save the model to the specified file
// joblib.dump(model, filename)
// data.head()