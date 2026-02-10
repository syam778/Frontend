import React, { useContext, useEffect, useState } from "react";
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
    <div className="my-orders">
      <h2>My Orders</h2>

      {/* 🔍 Email Input */}
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

      {/* 📦 Orders */}
      {orders.map((order, index) => {
        const timeInfo = getElapsedTime(
          order.createdAt,
          order.deliveredAt,
          order.status
        );

        const isDelivered = order.status === "delivered";

        return (
          <div className="order-card" key={index}>
            <h3>Order #{index + 1}</h3>

            {/* 🟢 STATUS */}
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

            {/* ⏱ TIMER */}
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
            </p>

            {/* 👤 User Info */}
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

            {/* 🍔 Items */}
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