/*import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Mydata.css";
import { StoreContext } from "../../Context/StoreContext";
//import { StoreContext } from "../../context/Storecontext";

const Mydata = () => {
  const { url } = useContext(StoreContext);

  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  // 🔁 global tick for running timers
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date()); // update every second
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ⏱ Correct timer logic (STOPS when delivered)
  const getElapsedTime = (createdAt, deliveredAt, status) => {
    const start = new Date(createdAt);

    // 🟢 IF DELIVERED → FIXED END TIME (STOP TIMER)
    if (status === "delivered" && deliveredAt) {
      const end = new Date(deliveredAt);
      const diffMs = end - start;

      const diffMin = Math.floor(diffMs / 60000);
      const diffSec = Math.floor((diffMs % 60000) / 1000);

      return {
        text: `Delivered in ${diffMin} min ${diffSec} sec`,
        running: false,
      };
    }

    // 🔴 IF NOT DELIVERED → RUNNING TIMER
    const end = new Date(); // current time
    const diffMs = end - start;

    const diffMin = Math.floor(diffMs / 60000);
    const diffSec = Math.floor((diffMs % 60000) / 1000);

    return {
      text: `Preparing... ${diffMin} min ${diffSec} sec`,
      running: true,
    };
  };

  // 📦 Fetch orders by email
  const fetchMyOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/my-order", {
        email: email,
      });

      if (response.data.success) {
        setOrders(response.data.data);
        setError("");
      } else {
        setOrders([]);
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="my-orderss">
      <h2>My Orders</h2>

      
      <div className="email-box">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={fetchMyOrders}>View Orders</button>
      </div>

      {error && <p className="error">{error}</p>}

      
      {orders.map((order, index) => {
        const timeInfo = getElapsedTime(
          order.createdAt,
          order.deliveredAt,
          order.status
        );

        const isDelivered = order.status === "delivered";

        return (
          <div className="order-cards" key={index}>
            <h3>Order #{index + 1}</h3>

            
            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color: isDelivered ? "green" : "orange",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </span>
            </p>

            {/* ⏱ TIMER 
            <p>
              <b>Time:</b>{" "}
              <span
                style={{
                  color: timeInfo.running ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {timeInfo.text}
              </span>
            </p>*

           
            <div className="user-info">
              <p>
                <b>Name:</b> {order.address.firstName}{" "}
                {order.address.lastName}
              </p>
              <p>
                <b>Email:</b> {order.address.email}
              </p>
              <p>
                <b>Phone:</b> {order.address.phone}
              </p>
              <p>
                <b>City:</b> {order.address.city}
              </p>
              <p>
                <b>Address:</b> {order.address.address}
              </p>
            </div>

         
            <div className="order-items">
              <h4>Items</h4>
              {order.items.map((item, i) => (
                <div className="item" key={i}>
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>
              ))}


              



            </div>

            <h4 className="total">Total: ₹{order.amount}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Mydata;
*/
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Mydata.css";
import { StoreContext } from "../../Context/StoreContext";

const Mydata = () => {
  const { url } = useContext(StoreContext);

  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 refresh timer every 1 second (for tracking display)
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ⏱ Timer text (optional)
  const getElapsedTime = (createdAt, deliveredAt, status) => {
    const start = new Date(createdAt);

    // delivered -> stop timer
    if (status === "delivered" && deliveredAt) {
      const end = new Date(deliveredAt);
      const diffMs = end - start;

      const diffMin = Math.floor(diffMs / 60000);
      const diffSec = Math.floor((diffMs % 60000) / 1000);

      return `Delivered in ${diffMin} min ${diffSec} sec`;
    }

    // running timer
    const end = new Date();
    const diffMs = end - start;

    const diffMin = Math.floor(diffMs / 60000);
    const diffSec = Math.floor((diffMs % 60000) / 1000);

    return `Preparing... ${diffMin} min ${diffSec} sec`;
  };

  // 📦 Fetch orders by email
  const fetchMyOrders = async () => {
    try {
      if (!email) {
        setError("Please enter email");
        return;
      }

      setLoading(true);

      const response = await axios.post(url + "/api/order/my-fullorder", {
        email: email,
      });

      if (response.data.success) {
        setOrders(response.data.data);
        setError("");
      } else {
        setOrders([]);
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Status label
  const getStatusLabel = (status) => {
    if (status === "pending") return "Order Placed";
    if (status === "assigned") return "Delivery Partner Assigned";
    if (status === "pickup") return "Picked Up";
    if (status === "out_for_delivery") return "Out for Delivery";
    if (status === "delivered") return "Delivered";
    return status;
  };

  return (
    <div className="my-orderss">
      <h2>My Orders</h2>

      {/* 🔍 Email Input */}
      <div className="email-box">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={fetchMyOrders} disabled={loading}>
          {loading ? "Loading..." : "View Orders"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* 📦 Orders */}
      {orders.map((order, index) => {
        const isDelivered = order.status === "delivered";

        return (
          <div className="order-cards" key={order._id || index}>
            {/* Header */}
            <div className="order-top">
              <div>
                <h3>Order #{index + 1}</h3>

              </div>

              <div className={`status-pill ${order.status}`}>
                {getStatusLabel(order.status)}
              </div>
            </div>

            {/* ⏱ Time */}
            

            {/* 🏪 Store Info */}
            {order.storeData ? (
              <div className="box store-box">
                <h4>🏪 Store Details</h4>
                <p>
                  <b>Name:</b> {order.storeData.name || "N/A"}
                </p>
                <p>
                  <b>Phone:</b> {order.storeData.phone || "N/A"}
                </p>
                <p>
                  <b>Address:</b>{" "}
                  {order.storeData.address ||
                    order.storeData.city ||
                    "N/A"}
                </p>
              </div>
            ) : (
              <div className="box store-box">
                <h4>🏪 Store Details</h4>
                <p className="gray">Store info not found</p>
              </div>
            )}

            {/* 🚴 Delivery Boy Info */}
            {order.assignedTo ? (
              <div className="box delboy-box">
                <h4>🚴 Delivery Partner</h4>
                <p>
                  <b>Name:</b> {order.assignedTo.name}
                </p>

                {order?.assignedTo?.number && (
                  <a href={`tel:${order?.assignedTo?.number}`} className="call-btn">
                    📞 Call Customer
                  </a>
                )}

              </div>
            ) : (
              <div className="box delboy-box">
                <h4>🚴 Delivery Partner</h4>
                <p className="gray">Delivery boy not assigned yet...</p>
              </div>
            )}

            {/* 👤 User Info */}
            <div className="box user-box">
              <h4>👤 Delivery Address</h4>
              <p>
                <b>Name:</b> {order.address?.firstName}{" "}
                {order.address?.lastName}
              </p>
              <p>
                <b>Email:</b> {order.address?.email}
              </p>
              <p>
                <b>Phone:</b> {order.address?.phone}
              </p>
              <p>
                <b>City:</b> {order.address?.city}
              </p>
              <p>
                <b>Address:</b> {order.address?.address || order.address?.street}
              </p>
            </div>

            {/* 🍔 Items */}
            <div className="box items-box">
              <h4>🍔 Items</h4>

              {order.items?.map((item, i) => (
                <div className="item-row" key={i}>
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="small gray">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>

                  <p className="item-total">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* 💰 Total */}
            <div className="total-row">
              <h4>Total:</h4>
              <h4 className="total-amt">₹{order.amount}</h4>
            </div>

            {/* Delivered Message */}
            {isDelivered && (
              <p className="delivered-msg">
                ✅ Your order has been delivered. Thank you!
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Mydata;
