/*import React, { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/Storecontext";
import "./Myprofile.css";

const Myprofile = () => {
  const { url } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchMyData = async () => {
    try {
      const response = await axios.post(url + "/api/order/my-data", {
        email,
      });

      if (response.data.success && response.data.data.length > 0) {
        setOrders(response.data.data);
        setError("");
      } else {
        setOrders([]);
        setError("No user data found");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const user = orders[0]?.address;

  return (
    <div className="my-orders">
      <h2>My Profile</h2>

      {/* Email Input */
/*<div className="email-box">
  <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <button onClick={fetchMyData}>View Profile</button>
</div>

{error && <p className="error">{error}</p>}

{/* User Data Only */
/*{user && (
  <div className="order-card">
    <p><b>Name:</b> {user.firstName} {user.lastName}</p>
    <p><b>Email:</b> {user.email}</p>
    <p><b>Phone:</b> {user.phone}</p>
    <p><b>Age:</b> {user.age}</p>
    <p><b>Gender:</b> {user.gender}</p>
    <p>
      <b>Address:</b> {user.street}, {user.city}, {user.state},
      {user.zipcode}, {user.country}
    </p>
  </div>
)}
</div>
);
};

export default Myprofile;



.my-orders {
max-width: 600px;
margin: 40px auto;
padding: 20px;
font-family: Arial, sans-serif;
}

.my-orders h2 {
text-align: center;
margin-bottom: 20px;
color: #333;
}


.email-box {
display: flex;
gap: 10px;
margin-bottom: 20px;
}

.email-box input {
flex: 1;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
font-size: 14px;
}

.email-box button {
padding: 10px 18px;
background-color: #ff6347;
color: #fff;
border: none;
border-radius: 5px;
font-size: 14px;
cursor: pointer;
transition: 0.3s;
}

.email-box button:hover {
background-color: #e5533d;
}


.error {
color: red;
text-align: center;
margin-bottom: 15px;
}


.order-card {
background: #fff;
border: 1px solid #eee;
border-radius: 8px;
padding: 20px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.order-card p {
margin: 8px 0;
font-size: 14px;
color: #444;
}

.order-card b {
color: #222;
}
.profile-img-box {
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 20px;
}

.profile-img-box img {
width: 110px;
height: 110px;
border-radius: 50%;
object-fit: cover;
border: 3px solid #ff6347;
margin-bottom: 8px;
}

.upload-btn {
font-size: 13px;
color: #ff6347;
cursor: pointer;
}

.upload-btn input {
display: none;
}


@media (max-width: 480px) {
.email-box {
flex-direction: column;
}

.email-box button {
width: 100%;
}
}



.my-orders {
max-width: 600px;
margin: 40px auto;
height: min-content;
padding: 25px;
font-family: "Poppins", Arial, sans-serif;
background: linear-gradient(135deg, #ffecd2, #fcb69f);
border-radius: 12px;
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
.my-orders .customer{
height: min-content;
width: max-content;
z-index: 3;
}

.my-orders h2 {
text-align: center;
margin-bottom: 25px;
color: #ff4e50;
font-weight: 600;
}


.email-box {
display: flex;
gap: 12px;
margin-bottom: 20px;
}

.email-box input {
flex: 1;
padding: 12px;
border: 2px solid #ff9a9e;
border-radius: 8px;
font-size: 14px;
outline: none;
transition: 0.3s;
}

.email-box input:focus {
border-color: #ff4e50;
box-shadow: 0 0 6px rgba(255, 78, 80, 0.5);
}

.email-box button {
padding: 12px 22px;
background: linear-gradient(135deg, #ff4e50, #f9d423);
color: #fff;
border-radius: 12px;
font-size: 14px;
font-weight: 600;
cursor: pointer;
border: 1px solid brown;
transition: 0.3s;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.email-box button:hover {
transform: translateY(-2px);
box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}


.error {
color: #ff1744;
text-align: center;
margin-bottom: 15px;
font-weight: 500;
}


.order-card {
background: linear-gradient(135deg, #ffffff, #f7f7ff);
border-radius: 12px;
padding: 20px;
box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
border-left: 6px solid #ff4e50;
}

.order-card p {
margin: 10px 0;
 
color:#555;
}

.order-card b {
color: #333;
 
}


.profile-img-box {
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 20px;
}

.profile-img-box img {
width: 110px;
height: 110px;
border-radius: 50%;
object-fit: cover;
border: 4px solid transparent;
background: linear-gradient(#fff, #fff) padding-box,
        linear-gradient(135deg, #ff4e50, #f9d423) border-box;
margin-bottom: 10px;
box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
}

.upload-btn {
font-size: 13px;
font-weight: 600;
color: #ff4e50;
cursor: pointer;
background: #fff3e0;
padding: 6px 14px;
border-radius: 20px;
transition: 0.3s;
}

.upload-btn:hover {
background: #ff4e50;
color: #fff;
}

.upload-btn input {
display: none;
}


@media (max-width: 480px) {
.email-box {
flex-direction: column;
}

.email-box button {
width: 100%;
}
}
*/
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import "./Myprofile.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Myprofile = () => {
    const { url } = useContext(StoreContext);
    const [email, setEmail] = useState("");
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [profileImg, setProfileImg] = useState(null);
    const navigate = useNavigate()

    // Load image from localStorage
    useEffect(() => {
        const savedImg = localStorage.getItem("profileImg");
        if (savedImg) setProfileImg(savedImg);
    }, []);

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImg(reader.result);
            localStorage.setItem("profileImg", reader.result);
        };
        reader.readAsDataURL(file);
    };

    const fetchMyData = async () => {
        try {
            const response = await axios.post(url + "/api/order/my-data", { email });

            if (response.data.success && response.data.data.length > 0) {
                setOrders(response.data.data);
                setError("");
            } else {
                setOrders([]);
                setError("No user data found");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    const user = orders[0]?.address;

    return (
        <div className="my-orders">
            <h2>My Profile</h2>

            {/* Profile Image */}
            <div className="profile-img-box">

                <img
                    src={
                        profileImg ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="Profile"
                />
                <label className="upload-btn">
                    Change Photo
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
            </div>

            {/* Email Input */}
            <div className="email-box">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={fetchMyData}>View Profile</button>
            </div>

            {error && <p className="error">{error}</p>}

            {/* User Data */}
            {user && (
                <div className="order-card">
                    <p><b>Name:</b> {user.firstName} {user.lastName}</p>
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Phone:</b> {user.phone}</p>
                    <p><b>Age:</b> {user.age}</p>
                    <p><b>Gender:</b> {user.gender}</p>
                    <p><b>Address:</b> {user.state}</p>
                    <p><b>zipcode:</b> {user.zipcode}</p>
                    <p><b>city:</b> {user.city}</p>
                    <p><b>street:</b> {user.street}</p>




                </div>

            )}
            <div className="customer">
                <p style={{ color: "red", textAlign: "center" }}>Customer Support</p>
                <p style={{ color: "red", textAlign: "center" }}>
                    Your Order Related Query
                    <b style={{ color: "black", textAlign: "center" }}>Order Payment Issue</b>
                    <b style={{ color: "black", textAlign: "center" }}>Order Cancel</b>
                </p>
                <button onClick={() => navigate("/myorders")} type="button">Support</button>
            </div>
        </div>
    );
};

export default Myprofile;