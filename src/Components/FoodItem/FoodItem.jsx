/*import React, { useState } from 'react'
import './FoodItem.css'
import { photo } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'



const FoodItem = ({ rating_image, name, price, image, description, id, maps }) => {
  //const [itemCount,setItemCount] = useState(0)
  const { cartItems, addToCart, removeFromCart,likeToCart, url, doneAudio, submitAudio, wonAudio, addAudio, timeAudio } = useContext(StoreContext)

  return (
    <div className='food-item ' id='food-item'>
      <div className="food-item-img-container">
        <img className='food-image' src={url + "/images/" + image} alt="" />
        
        {!cartItems[id]
          ? <img className='add-icon' onClick={() => addToCart(id)} src={photo.add_icon} alt="" />
          : <div className='add'>
            <img className='red' src={photo.add_icon} onClick={() => removeFromCart(id)} style={{
              padding: "5px 5px",
              backgroundColor: "red",
              border: "1px solid black",
              borderRadius: "50px",
              cursor: "pointer"
            }} alt="" />
            <p>{cartItems[id]}</p>
            <img className='green' src={photo.add_icon} onClick={() => addToCart(id) || wonAudio.play()} style={{
              padding: "5px 5px",
              backgroundColor: "green",
              border: "1px solid black",
              borderRadius: "50px",
              cursor: "pointer"
            }} alt="" />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-reting">
          <p>Name : {name}</p>
          <img src={photo.reting} alt="" />
        </div>

        <p className='food-item-des'>Description :{description}</p>
        <p className='food-item-price'>Price :₹{price}</p>
        <p className='food-item-price'>{maps}</p>
      </div>



    </div>

  )
}

export default FoodItem
*/
import React, { useContext } from "react";
import "./FoodItem.css";
import { photo } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ rating_image, name, price, image, description, id, maps }) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    likeToCart,
    likeItems,
    url,
    wonAudio,
  } = useContext(StoreContext);

  // ❤️ check liked or not
  const isLiked = likeItems?.includes(id);

  return (
    <div className="food-item" id="food-item">
      <div className="food-item-img-container">
        {/* ✅ Food Image 
        <img
          className="food-image"
          src={`${url}/images/${encodeURIComponent(image)}`}
          alt={name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />*/}
        <img src={image} alt={name} className="food-image"/>

        {/* ❤️ Like button (Zomato style) */}
        <div
          className={`like ${isLiked ? "liked" : ""}`}
          onClick={() => likeToCart(id)}
        >
          <img
            src={isLiked ? photo.bike : photo.bike}
            alt="like"
          />
        </div>

        {/* ✅ Add / Remove cart */}
        {!cartItems[id] ? (
          <img
            className="add-icon"
            onClick={() => addToCart(id)}
            src={photo.add_icon}
            alt="add"
          />
        ) : (
          <div className="add">
            <img
              className="red"
              src={photo.add_icon}
              onClick={() => removeFromCart(id)}
              style={{
                padding: "5px 5px",
                backgroundColor: "red",
                border: "1px solid black",
                borderRadius: "50px",
                cursor: "pointer",
              }}
              alt="remove"
            />

            <p>{cartItems[id]}</p>

            <img
              className="green"
              src={photo.add_icon}
              onClick={() => {
                addToCart(id);
                wonAudio.play();
              }}
              style={{
                padding: "5px 5px",
                backgroundColor: "green",
                border: "1px solid black",
                borderRadius: "50px",
                cursor: "pointer",
              }}
              alt="add"
            />
          </div>
        )}
      </div>

      {/* ✅ Info */}
      <div className="food-item-info">
        <div className="food-item-name-reting">
          <p>Name : {name}</p>
          <img src={photo.reting} alt="" />
        </div>

        <p className="food-item-des">Description : {description}</p>
        <p className="food-item-price">Price : ₹{price}</p>
        <p className="food-item-price">{maps}</p>
      </div>
    </div>
  );
};

export default FoodItem;
