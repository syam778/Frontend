
/*
import React, { useContext } from "react"; 
import "./Like.css";
import { StoreContext } from "../../Context/StoreContext";
import { photo } from "../../assets/assets";


const Like = () => {
  const { food_list, likeItems, url, likeToCart, cartItems,
    addToCart,
    removeFromCart,
    wonAudio, } = useContext(StoreContext);

  // ❤️ Filter liked foods
  const likedFoods = food_list.filter((item) => likeItems.includes(item._id));

  return (
    <div className="liked-page">
      <h2>❤️ My Liked Items</h2>

      {likedFoods.length === 0 ? (
        <p className="empty">No liked items yet 😢</p>
      ) : (
        <div className="liked-grid">
          {likedFoods.map((item, index) => (
            <div key={item._id} className="liked-card">
              
              <img
                className="liked-img"
                src={`${url}/images/${encodeURIComponent(item.image || "")}`}
                alt={item.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              
              <h3>Name : {item.name}</h3>

              
              <p>Category : {item.category}</p>
              <p className="price">Price : ₹{item.price}</p>

              
              <span className="stor">
                <p className="city">City - {item.city}</p>

                <p className="street">Adress : {item.street}</p>
                <p className="brand">S Name : {item.firstName}</p>
                

                {item.phone && (
                  <a href={`tel:${item.phone}`} className="call-btnn">
                    📞 Call
                  </a>
                )}
              </span>

             
              <p style={{ marginTop: "10px" }}>
                {item.linkdata ? (
                  <a
                    href={item.linkdata}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    <img className="marker1" src={photo.map} alt="" />
                    View Map
                  </a>
                ) : (
                  "No Map"
                )}
              </p>

              
              <button
                className="cursor remove-like"
                onClick={() => likeToCart(item._id)}
              >
                ❌ Remove Like
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Like;
*/
import React, { useContext } from "react";
import "./Like.css";
import { StoreContext } from "../../Context/StoreContext";
import { photo } from "../../assets/assets";

const Like = () => {
  const {
    food_list,
    likeItems,
    url,
    likeToCart,
    cartItems,
    addToCart,
    removeFromCart,
    wonAudio,
  } = useContext(StoreContext);

  // ❤️ Filter liked foods
  const likedFoods = food_list.filter((item) => likeItems.includes(item._id));

  return (
    <div className="liked-page">
      <h2>❤️ My Liked Items</h2>

      {likedFoods.length === 0 ? (
        <p className="empty">No liked items yet 😢</p>
      ) : (
        <div className="liked-grid">
          {likedFoods.map((item) => (
            <div key={item._id} className="liked-card">
              {/* IMAGE */}
              <img
                className="liked-img"
                src={`${url}/images/${encodeURIComponent(item.image || "")}`}
                alt={item.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />

              {/* ✅ Add / Remove cart */}
              {!cartItems[item._id] ? (
                <img
                  className="add-icons"
                  onClick={() => addToCart(item._id)}
                  src={photo.add_icon}
                  alt="add"
                />
              ) : (
                <div className="adds">
                  <img
                    className="reds"
                    src={photo.add_icon}
                    onClick={() => removeFromCart(item._id)}
                    
                    alt="remove"
                  />

                  <p>{cartItems[item._id]}</p>

                  <img
                    className="greens"
                    src={photo.add_icon}
                    onClick={() => {
                      addToCart(item._id);
                      wonAudio.play();
                    }}
                    
                    alt="add"
                  />
                </div>
              )}

              {/* NAME */}
              <h3>Name : {item.name}</h3>

              {/* CATEGORY + PRICE */}
              <p>Category : {item.category}</p>
              <p className="price">Price : ₹{item.price}</p>

              {/* STORE DETAILS */}
              <span className="stor">
                <p className="city">City - {item.city}</p>
                <p className="street">Adress : {item.street}</p>
                <p className="brand">S Name : {item.firstName}</p>

                {item.phone && (
                  <a href={`tel:${item.phone}`} className="call-btnn">
                    📞 Call
                  </a>
                )}
              </span>

              {/* MAP */}
              <p style={{ marginTop: "10px" }}>
                {item.linkdata ? (
                  <a
                    href={item.linkdata}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    <img className="marker1" src={photo.map} alt="" />
                    View Map
                  </a>
                ) : (
                  "No Map"
                )}
              </p>

              {/* REMOVE LIKE */}
              <button
                className="cursor remove-like"
                onClick={() => likeToCart(item._id)}
              >
                ❌ Remove Like
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Like;
