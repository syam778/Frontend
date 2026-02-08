import React, { useContext, useState } from 'react'
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
import Mydata from './Components/Mydata/Mydata'
import Myprofile from './Components/Myprofile/Myprofile'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const userId = localStorage.getItem("userId");
  //const { url } = useContext(StoreContext);
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
          <Route path='/my-order' element={<Mydata  />} />
          <Route path='/my-data' element={<Myprofile  />} />          
        </Routes>
      </div>
      <Footer />
      
    </>
  )
}

export default App
