import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Home from './Pages/Home/Home'
import Card from './Pages/Card/Card'
import Footer from './Components/Footer/Footer'
import Login from './Components/Login/Login'
import Placeorder from './Pages/PlaceOrder/PlaceOrder'
import Verify from './Pages/Verify/Verify'

import MyOrder from './Pages/MyOrder/MyOrder'


const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Card />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
/*
<Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Card' element={<Card/>}/>
        <Route path='/Order' element={<PlaceOrder/>}/>
      </Routes>
      */


/*import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
//import { StoreContext } from '../../Context/StoreContext';
//import { StoreContext } from '../../context/Storecontext';
import { StoreContext } from '../../Context/StoreContext';

import axios from 'axios';

const Verify = () => {
const [searchParams,setSearchParams] = useSearchParams();
const success = searchParams.get("success")
const orderId = searchParams.get("orderId")
const {url} = useContext(StoreContext);
const navigate = useNavigate();
const verifyPayment = async() =>{
const response = await axios.post(url+"/api/order/verify",{success,orderId})
if (response.data.success){
navigate("/myorders")
}
else{
navigate("/")
}
}
useEffect(()=>{verifyPayment

},[])

//console.log(success,orderId);
return (
<div className='verify'>
<div className="spin">hi</div>
</div>
)
}

export default Verify


.verify{
min-height: 50vh;
display: grid;
}
.spin{
width: 90px;
height: 90px;
place-self: center;
border: 4px solid red;
border-top-color: aqua;
border-radius: 50%;
animation: rotate 1s infinite;
}
@keyframes rotate {
100%{
  transform: rotate(360deg);
}
}
*/