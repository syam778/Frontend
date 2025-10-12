import React, { useEffect, useState } from 'react'
import './Placeorder.css'
import { Form, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const Placeorder = () => {
  const {getTotalAmount,token,food_list,cartItems,url} =useContext(StoreContext)

  //const [data,setData] = useState()
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    city:"",
    state:"",
    zipcode:"",
    address:"",
    phone:"",
    age:"",
    gender:""
  })
  
  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  /*useEffect(()=>{
    console.log(data);
  },[data])
*/
const placeOrder = async (event)=>{
  event.preventDefault();
  let orderItems = [];
  food_list.map((item)=>{
    if (cartItems[item._id]>0){
      let itemInfo = item;
      itemInfo["quantity"] = cartItems[item._id];
      orderItems.push(itemInfo);

    }
  })
  let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalAmount()+5,
  }
  let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
  if (response.data.success){
    const {session_url} = response.data;
    window.location.replace(session_url);
  }
  else{
    alert("Error");
  }
}
//const navigate = useNavigate();
const navigate = useNavigate();
useEffect(()=>{
  if (!token){
    navigate("/cart")

  }
  else if(getTotalAmount()===0){

    navigate("/cart")

  }

},[token])

  
  
  return (

  <form onSubmit={placeOrder} className='placeorder'>
    <div className="placeorder-left">
      <p className='titel'>Delivery Information</p>
      <div className="data">
        <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'  /><input name='lastName' onChange={onChangeHandler}  value={data.lastName} type="text" placeholder='Last Name' required/>
      </div>
      <div className="data">
      <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' /><input required name='address' onChange={onChangeHandler}  value={data.address} type="text" placeholder='Address' />
      </div>
      <div className="data">
        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' /><input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
      </div>
      <div className="data">
        <input required name='age' onChange={onChangeHandler} value={data.age} type="text" placeholder='Age' /><input required name='gender' onChange={onChangeHandler}  value={data.gender} type="text" placeholder='gender' />
      </div>
      <div className="data">
        <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="number" placeholder='Pin Code' /><input required name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder='Mobile NUmber'  />

      </div>
    </div>
    <div className="cart-total1">
          <h2>Cart Total</h2>
          <hr className='line3' />
        <div className="cart-total-det1">
          <p>Subtotal</p>
          <p>₹{getTotalAmount()}</p>
        </div>
        <hr className='line3' />
        <div className="cart-total-det">
          
          <p>Delivery</p>
          <h5 className='data2'>₹{getTotalAmount()===0?0:5}</h5>
          
        </div>
        <hr className='line3' />
        <div className="cart-total-det">
          
          <p>Total</p>
          <h5 className='data2' >₹{getTotalAmount()===0?0:getTotalAmount()+5}</h5>
          
        </div>
        <button type='submit' onClick={()=>navigate("/myorders")} > CHECK OUT</button>
        </div>
  </form>
  )
}

export default Placeorder

//http://localhost:5173/

/*
onClick={()=>navigate('/myorders')}
let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
  if (response.data.success){
    const {session_url} = response.data;
    window.location.replace(session_url);
  }

  else{
    alert("Error");
  }
const onChangeHandler = (event) =>{
    const name =event.target.name;
    const value =event.target.value;
    setData(data=>({...data,[name]:value}))
  }

<input type="text" placeholder='First Name' required /><input  type="text" placeholder='Last Name' required/>
      </div>
      <div className="data">
      <input  type="email" placeholder='Email Address' /><input  type="text" placeholder='Location'required />
      </div>
      <div className="data">
        <input type="text" placeholder='City' /><input  type="text" placeholder='State' />
      </div>
      <div className="data">
        <input  type="text" placeholder='Age' /><input  type="text" placeholder='gender' />
      </div>
      <div className="data">
        <input  type="number" placeholder='Pin Code' /><input  type="number" placeholder='Mobile NUmber' required />

      </div>


  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    city:"",
    state:"",
    zipcode:"",
    location:"",
    phone:"",
    age:"",
    gender:""
  })
  
  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  useEffect(()=>{
    console.log(data);
  },[data])


  <div className="data">
        <input type="text" placeholder='First Name' required /><input name='lastName'  value={data.lastName} type="text" placeholder='Last Name' required/>
      </div>
      <div className="data">
      <input name='email'  value={data.email} type="email" placeholder='Email Address' /><input name='location'  value={data.location} type="text" placeholder='Location'required />
      </div>
      <div className="data">
        <input name='city'  value={data.city} type="text" placeholder='City' /><input name='state'  value={data.state} type="text" placeholder='State' />
      </div>
      <div className="data">
        <input name='age'  value={data.age} type="text" placeholder='Age' /><input name='gender'  value={data.gender} type="text" placeholder='gender' />
      </div>
      <div className="data">
        <input name='zipcode'  value={data.zipcode} type="number" placeholder='Pin Code' /><input name='phone'  value={data.phone} type="number" placeholder='Mobile NUmber' required />

      </div>


      const placeOrder = async(event) =>{
    event.preventDefault();
    let orderItems =[];
    food_list.map((item)=>{
    if (cartItems[item._id]>0){
      let itemInfo = item;
      itemInfo["quantity"] = cartItems[item._id];
      orderItems.push(itemInfo);
    }
  })
  let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCardAmount()+5,
  }
  let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
  if (response.data.success){
    const {session_url} = response.data;
    window.location.replace(session_url);
  }

  else{
    alert("Error");
  }
  }
  //const navigate = useNavigate();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate("/card")

    }
    else if(getTotalCardAmount()===0){
      navigate("/card")
    }

  },[token])

  <button type='submit' onClick={()=>navigate('/order')}> CHECK OUT</button>
    */