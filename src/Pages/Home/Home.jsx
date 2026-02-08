import React, { useState } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import EXploremenu from '../../Components/Exploremenu/EXploremenu'
import ExploreItem from '../../Components/FoodItem/FoodItem'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import FoodItem from '../../Components/FoodItem/FoodItem'
import AppDownload from '../../Components/AppDownload/AppDownload'
import MapPage from '../../Mapss/Mapss'

const Home = () => {
  const [category,setCategory] = useState("All")
  return (
    <div>
        <Header/>
        <EXploremenu category={category} setCategory ={setCategory}/>
        <FoodDisplay category={category} setCategory ={setCategory} />
        <AppDownload/>
        
       
        
        
    </div>
  )
}

export default Home