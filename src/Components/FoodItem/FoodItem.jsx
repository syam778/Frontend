import React, { useState } from 'react'
import './FoodItem.css'
import { photo } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'



const FoodItem = ({ rating_image, name, price, image, description, id, maps }) => {
  //const [itemCount,setItemCount] = useState(0)
  const { cartItems, addToCart, removeFromCart, url, doneAudio, submitAudio, wonAudio, addAudio, timeAudio } = useContext(StoreContext)

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






        .food-item{
    width: 100%;
    margin: auto;
    border-radius: 20px;
    box-shadow: 0px 0px 10px black;
    transition: 0.3s;
    animation: fadeIn 1s;
}
.food-image{
    width: 100%;
    border-radius: 15px 5px;
    border: 1.5px solid gray;
    border-radius: 20px;
    box-shadow: 0px 0px 10px black;
    
    
}
.food-item-info{
    padding: 20px;
}
.food-item-name-reting{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1px;
    margin-top: -10px;
}
.food-item-name-reting img{
    width: 100px;
    height: 100px;
}
.food-item-name-reting p{
    color: blue;
    font-size: 23px;
    font-weight: 500;
}
.food-item-des{
    margin-top: -15px;
    color: grey;
    font-size: 15px;
}
.food-item-price{
    color: green;
    font-size: 22px;
    font-weight: 600;
    margin-top: 15px;
}
.add-icon {
    width: 30px;
    height: 30px;
    margin-top: -60px;
    display: flex;
    margin-left: 270px;
    position: absolute;
    background-color: skyblue;
    border-radius: 50px;
}
.add{
    width: min-content;
    padding: 5px;
    border-radius: 50px;
    background-color: white;
    margin-top: -60px;
    display: flex;
    margin-left: 200px;
    gap: 10px;
    color: blue;
    position: absolute;
    
    
}
.add p{
    font-size: 22px;
    font-weight: 600;
}
.red{
    width: 30px;
    height: 30px;
    background-color: red;
    border: 1px solid red;
    border-radius: 50%;
}
.green{
    width: 30px;
    height: 30px;
    background-color: green;
    border: 1px solid green;
     border-radius: 50%;
}
@media (max-width:375px){
    .food-item{
    width: 90%;
    margin: auto;
    border-radius: 20px;
    box-shadow: 0px 0px 10px black;
    transition: 0.3s;
    animation: fadeIn 1s;    
}
.food-image{
    width: 100%;
    border-radius: 15px 5px;
    border: 1.5px solid gray;
    border-radius: 20px;
    box-shadow: 0px 0px 10px black;
    
    
}
.food-item-info{
    padding: 0px;
}
.food-item-name-reting{
    display: flex;
    flex-direction: column;
}
.food-item-name-reting img{
    width: 70px;
    height: 70px;
    margin-top: -20px;

}
.food-item-name-reting p{
    color: blue;
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
}
.food-item-des{
    margin-top: -15px;
    color: grey;
    font-size: 13px;
    margin-left: 15px;
}
.food-item-price{
    color: green;
    font-size: 19px;
    font-weight: 600;
    margin-top: 5px;
    margin-left: 40px;
}
.add-icon {
    width: 18px;
    height: 18px;
    margin-top: -30px;
    display: flex;
    margin-left: 90px;
    position: absolute;
    background-color: skyblue;
    border-radius: 50px;
}
.add{
    width: min-content;
    padding: 3px;
    border-radius: 50px;
    background-color: white;
    margin-top: -40px;
    display: flex;
    margin-left: 60px;
    gap: 5px;
    color: blue;
    position: absolute;
    
    
}
.add p{
    font-size: 16px;
    font-weight: 600;
}
.red{
    width: 18px;
    height: 18px;
    background-color: red;
    border: 1px solid red;
    border-radius: 50%;
}
.green{
    width: 18px;
    height: 18px;
    background-color: green;
    border: 1px solid green;
     border-radius: 50%;
}

}
@media (max-width:1700px){
    .food-item{
    width: 100%;
    margin: auto;
    border-radius: 20px;
    box-shadow: 0px 0px 10px black;
    transition: 0.3s;
    animation: fadeIn 1s;
}
.food-image{
    width: 100%;
    border-radius: 15px 5px;
    border: 1.5px solid gray;
    border-radius: 20px;
    box-shadow: 0px 0px 10px black;
    
    
    
}
.food-item-info{
    padding: 20px;
}
.food-item-name-reting{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1px;
    margin-top: -10px;
}
.food-item-name-reting img{
    width: 100px;
    height: 100px;
}
.food-item-name-reting p{
    color: blue;
    font-size: 23px;
    font-weight: 500;
}
.food-item-des{
    margin-top: -15px;
    color: grey;
    font-size: 15px;
}
.food-item-price{
    color: green;
    font-size: 22px;
    font-weight: 600;
    margin-top: 15px;
}
.add-icon {
    width: 30px;
    height: 30px;
    margin-top: -60px;
    display: flex;
    margin-left: 186px;
    position: absolute;
    background-color: skyblue;
    border-radius: 50px;
}
.add{
    width: min-content;
    padding: 5px;
    border-radius: 50px;
    background-color: white;
    margin-top: -60px;
    display: flex;
    margin-left: 200px;
    gap: 10px;
    color: blue;
    position: absolute;
    
    
}
.add p{
    font-size: 22px;
    font-weight: 600;
}
.red{
    width: 30px;
    height: 30px;
    background-color: red;
    border: 1px solid red;
    border-radius: 50%;
}
.green{
    width: 30px;
    height: 30px;
    background-color: green;
    border: 1px solid green;
     border-radius: 50%;
}

}

*/