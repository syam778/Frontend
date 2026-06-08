import React from 'react'
import './Card.css'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Card = () => {
  const {cartItems,food_list,getTotalAmount,url,removeFromCart,doneAudio,submitAudio,wonAudio,addAudio,timeAudio} = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className='line' />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return(
              <div>
              <div className="cart-title cart-items-item" >
                {/*<img src={url+"/images/"+item.image} alt="" />*/}<img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{item.price*cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
              </div>
              <hr className='line' />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div>
        <div className="cart-total">
          <h2>Cart Total</h2>
          <hr className='line2' />
        <div className="cart-total-det">
          <p>Subtotal</p>
          <p>₹{getTotalAmount()}</p>
        </div>
        <hr className='line2' />
        <div className="cart-total-det">
          <p>Delivery</p>
          <p>₹{getTotalAmount()===0?0:5}</p>
        </div>
        <hr className='line2' />
        <div className="cart-total-det">
          <p>Total</p>
          <p>₹{getTotalAmount()===0?0:getTotalAmount()+5}</p>
        </div>
        <button onClick={()=>navigate('/order')||wonAudio.play()}> CHECK OUT</button>
        </div>
        </div>
        
      
      <div className="promocode">
        <div>
          <p>If You Have Promo Code , Enter Here</p>
          <div className="promocode-input">
            <input type="text"  placeholder=' Your Promo Code'/>
            <button>Submit</button>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default Card