import React, { useState } from 'react'
import './FoodItem.css'
import { photo } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'



const FoodItem = ({rating_image,name,price,image,description,id,}) => {
   //const [itemCount,setItemCount] = useState(0)
   const {cartItems,addToCart,removeFromCart,url,} =useContext(StoreContext)

  return (
    <div className='food-item ' id='food-item'>
      <div className="food-item-img-container">
        <img className='food-image' src={url+"/images/"+image}  alt="" />
        {!cartItems[id]
           ?<img className='add-icon' onClick={()=>addToCart(id)} src={photo.add_icon} alt="" />
           : <div className='add'>
            <img className='red' src={photo.add_icon} onClick={()=>removeFromCart(id)} alt="" />
            <p>{cartItems[id]}</p>
            <img className='green' src={photo.add_icon} onClick={()=>addToCart(id)} alt="" />
           </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-reting">
          <p>{name}</p>
          <img src={photo.reting} alt="" />
        </div>
        <p className='food-item-des'>{description}</p>
        <p className='food-item-price'>₹{price}</p>
      </div>
      </div>
    
  )
}

export default FoodItem
/*
{!itemCount
           ?<img className='add-icon' onClick={()=>setItemCount(prev=>prev+1)} src={photo.add_icon} alt="" />
           : <div className='add'>
            <img className='red' src={photo.add_icon} onClick={()=>setItemCount (prev=>prev-1)} alt="" />
            <p>{itemCount}</p>
            <img className='green' src={photo.add_icon} onClick={()=>setItemCount (prev=>prev+1)} alt="" />
           </div>
        }

        {!cartItems[id]
           ?<img className='add-icon' onClick={()=>addToCart(id)} src={photo.add_icon} alt="" />
           : <div className='add'>
            <img className='red' src={photo.add_icon} onClick={()=>removeFromCartaddToCart(id)} alt="" />
            <p>{cartItems[id]}</p>
            <img className='green' src={photo.add_icon} onClick={()=>addToCart(id)} alt="" />
           </div>
        }

        src={url+"/images/"+image}
        src={url+"/images/"+img}
*/