
import React, { useState, useContext } from "react";
import axios from "axios";
import "./Placeorder.css";
import { useNavigate } from "react-router-dom";
import { photo } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const Placeorder = () => {
  const navigate = useNavigate();

  const {
    getTotalAmount,
    cartItems,
    setCartItems,
    food_list,
    upiId,
    token,
    url,
    doneAudio,
    wonAudio,
    timeAudio,
  } = useContext(StoreContext);

  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({});
  const [paymentImg, setPaymentImg] = useState(null);
  const [createdOrderId, setCreatedOrderId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    street: "",
    zipcode: "",
    linkdata: "",
    phone: "",
    age: "",
    gender: "",
  });

  // ---------------------------
  // STOP ALL AUDIO
  // ---------------------------
  const stopAllAudio = () => {
    [wonAudio, doneAudio, timeAudio].forEach((a) => {
      if (!a) return;
      a.pause();
      a.currentTime = 0;
    });
  };

  // ---------------------------
  // INPUT CHANGE
  // ---------------------------
  const handleChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  // ---------------------------
  // GET CART ITEMS LIST (WITH storeId inside items)
  // ---------------------------
  /*const getCartItemsList = () => {
    return food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: cartItems[item._id],

        // ✅ storeId in items (REQUIRED)
        storeId:
          typeof item.storeId === "string"
            ? item.storeId
            : item.storeId?._id ||
              item.storeIdRef ||
              item.storeRef ||
              item.store,
      }));
  };*/
  const getCartItemsList = () => {
  return food_list
    .filter((item) => cartItems[item._id] > 0)
    .map((item) => ({
      // ✅ Required for order
      _id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: cartItems[item._id],

      // ✅ Extra fields from foodModel
      category: item.category,
      description: item.description,

      firstName: item.firstName,
      phone: item.phone,
      street: item.street,
      city: item.city,
      linkdata: item.linkdata,

      createdBy: item.createdBy,

      // ✅ Store reference (store items only)
      //storeId: item.storeIdRef?._id || item.storeIdRef || null,    //testing
      storeId:
          typeof item.storeId === "string"
            ? item.storeId
            : item.storeId?._id ||
              item.storeIdRef ||
              item.storeRef ||
              item.store,

    }));
};

  


  // ---------------------------
  // STEP 1 -> PROCEED
  // ---------------------------
  const handleMakePayment = () => {
    const items = getCartItemsList();

    if (!items.length) return alert("Cart is empty ❌");

    const data = {
      ...deliveryInfo,
      items,
      amount: getTotalAmount() + 5,
    };

    setOrderData(data);

    stopAllAudio();
    wonAudio?.play();

    setStep(2);
  };

  // ---------------------------
  // COD ORDER
  // ---------------------------
  const handleCashOnDelivery = async () => {
    const items = getCartItemsList();
    if (!items.length) return alert("Cart is empty ❌");

    setLoading(true);

    try {
      const res = await axios.post(
        `${url}/api/order/place-cod`,
        {
          ...deliveryInfo,
          items,
          amount: getTotalAmount() + 5,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setCreatedOrderId(res.data.order._id);

        setCartItems({});
        localStorage.removeItem("cartItems");

        stopAllAudio();
        wonAudio?.play();

        setStep(5);
      } else {
        alert(res.data.message || "COD order failed ❌");
        stopAllAudio();
        doneAudio?.play();
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "COD order failed ❌");
      stopAllAudio();
      doneAudio?.play();
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // STEP 2 -> SHOW QR
  // ---------------------------
  const handleShowQR = () => {
    stopAllAudio();
    wonAudio?.play();
    setStep(3);
  };

  // ---------------------------
  // UPLOAD SCREENSHOT
  // ---------------------------
  const handleUploadPayment = async () => {
    if (!paymentImg) return alert("Please upload screenshot first ❌");

    setLoading(true);

    const formData = new FormData();
    formData.append("paymentScreenshot", paymentImg);
    formData.append("orderData", JSON.stringify(orderData));

    stopAllAudio();
    timeAudio?.play();

    try {
      const res = await axios.post(
        `${url}/api/order/payment-pending`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        const orderId = res.data.order?._id;

        setCreatedOrderId(orderId);
        setPaymentStatus("PENDING");
        setStep(6);

        setTimeout(() => {
          refreshPaymentStatus(orderId);
        }, 120000);
      } else {
        alert(res.data.message || "Payment upload failed ❌");
        stopAllAudio();
        doneAudio?.play();
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(
        err.response?.data?.message || "Server error while uploading payment ❌"
      );
      stopAllAudio();
      doneAudio?.play();
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // CHECK PAYMENT STATUS
  // ---------------------------
  const refreshPaymentStatus = async (orderIdParam) => {
    const orderId = orderIdParam || createdOrderId;
    if (!orderId) return;

    setLoading(true);

    try {
      const res = await axios.get(`${url}/api/order/payment-status/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const status = res.data.paymentStatus;
        setPaymentStatus(status);

        if (status === "SUCCESS") {
          setCartItems({});
          localStorage.removeItem("cartItems");

          stopAllAudio();
          wonAudio?.play();

          navigate("/my-order");
        }

        if (status === "FAILED") {
          stopAllAudio();
          doneAudio?.play();
          setStep(7);
        }
      }
    } catch (err) {
      console.log("Payment status check error:", err.message);
      alert("Server error while checking payment status ❌");
      stopAllAudio();
      doneAudio?.play();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="placeorder-container">
      {/* STEP 1 */}
      {step === 1 && (
        <div className="step step1">
          <h2>Delivery Information</h2>

          {Object.keys(deliveryInfo).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={deliveryInfo[key]}
              onChange={handleChange}
              required
            />
          ))}

          <button onClick={handleMakePayment}>Proceed to Payment</button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="step step2">
          <h2>Total Amount: ₹{orderData.amount}</h2>

          <button onClick={handleCashOnDelivery} disabled={loading}>
            {loading ? "Placing..." : "💵 Cash on Delivery"}
          </button>

          <button onClick={handleShowQR} disabled={loading}>
            Pay via UPI QR
          </button>

          <button onClick={() => setStep(1)} disabled={loading}>
            Back
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="step step3">
          <h2>Scan QR to Pay</h2>

          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=${upiId}&pn=${deliveryInfo.firstName}&tn=FoodOrder&am=${orderData.amount}&cu=INR`}
            alt="UPI QR"
            width={250}
          />

          <button onClick={() => setStep(4)}>Upload Payment Screenshot</button>
          <button onClick={() => setStep(2)}>Back</button>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="step step4">
          <h2>Upload Payment Screenshot</h2>

          <label htmlFor="paymentScreenshot" style={{ cursor: "pointer" }}>
            <img
              src={paymentImg ? URL.createObjectURL(paymentImg) : photo.download}
              alt="upload"
              style={{
                width: "160px",
                borderRadius: "12px",
                border: "2px dashed gray",
                padding: "10px",
              }}
            />
          </label>

          <input
            type="file"
            id="paymentScreenshot"
            accept="image/*"
            hidden
            onChange={(e) => setPaymentImg(e.target.files[0])}
          />

          {!paymentImg && (
            <p style={{ color: "red" }}>❌ Please select screenshot</p>
          )}

          <button
            onClick={handleUploadPayment}
            disabled={loading || !paymentImg}
          >
            {loading ? "Uploading..." : "Upload & Confirm"}
          </button>

          <button onClick={() => setStep(3)} disabled={loading}>
            Back
          </button>
        </div>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <div className="step step5">
          <h2>✅ Order Placed Successfully</h2>

          <p style={{ fontSize: "18px" }}>
            Hello <b>{deliveryInfo.firstName}</b> 👋
          </p>

          <p>
            <b>Order ID:</b> {createdOrderId}
          </p>

          <p>
            <b>Payment Method:</b> COD (Cash on Delivery)
          </p>

          <p>
            <b>Payment Status:</b> PENDING
          </p>

          <p>
            <b>Total Amount:</b> ₹{getTotalAmount() + 5}
          </p>

          <button onClick={() => navigate("/my-order")}>✅ Success Order</button>
        </div>
      )}

      {/* STEP 6 */}
      {step === 6 && (
        <div className="step step6">
          <h2>⏳ Payment Pending...</h2>

          <p style={{ fontSize: "18px" }}>
            <b>{deliveryInfo.firstName}</b> your payment is pending...
          </p>

          <p>
            Current Status: <b>{paymentStatus}</b>
          </p>

          <button onClick={() => refreshPaymentStatus()} disabled={loading}>
            {loading ? "Checking..." : "✅ Check Payment Status"}
          </button>

          <p style={{ marginTop: "10px", fontSize: "13px", color: "gray" }}>
            Auto checking after 2 minutes also...
          </p>
        </div>
      )}

      {/* STEP 7 */}
      {step === 7 && (
        <div className="step step7">
          <h2>❌ Payment Failed</h2>

          <p>
            Sorry <b>{deliveryInfo.firstName}</b> 😢 <br />
            Admin rejected your payment screenshot.
          </p>

          <button onClick={() => setStep(4)}>Upload Again</button>
        </div>
      )}
    </div>
  );
};

export default Placeorder;

