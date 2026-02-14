/*import React from "react";
import "./CustomerService.css";
import { photo } from "../../assets/assets";

const CustomerService = () => {
     const email = "syamasundarb071@gmail.com";
     const myphone = 7227963777 ;
  return (
    <div className="cs-page">
      <h2>📞 Customer Service</h2>
      <p className="cs-sub">
        Need help? Contact us anytime. We are here for you ❤️
      </p>

      <div className="cs-grid">
       
        <div className="cs-card">
          <h3>📞 Call Support</h3>
          <p>Talk to our support team directly.</p>
          <a href="tel:7227963777" className="cs-btn">
            Call Now
          </a>
        </div>

        <div className="cs-card">
          <h3>💬 WhatsApp</h3>
          <p>Chat with us on WhatsApp for fast support.</p>
          <a
            href="https://wa.me/7227963777"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-btn green"
          >
            WhatsApp
          </a>
        </div>

        
        <div className="cs-card">
          <h3>📧 Email Support</h3>
          <p>Send your issue with details.</p>
          <a href="mailto:syamasundarb071@gmail.com" className="cs-btn blue">
            Email Us
          </a>
        </div>

      
        <div className="cs-card">
          <h3>❓ FAQ</h3>
          <p>Find answers to common questions.</p>
          <button
            className="cs-btn pink"
            onClick={() => alert("FAQ Coming Soon 😄")}
          >
            View FAQ
          </button>
        </div>
        <div className="cs-card">
          <h3> Order Cancel ❓</h3>
          <p>Find answers to common questions.</p>
          <button
            className="cs-btn red"
            onClick={() => alert("FAQ Coming Soon 😄")}
          >
            Order Cancel
          </button>
        </div>
        <div className="cs-card">
          <h3> Refund ❓</h3>
          <p>Find answers to common questions.</p>
          <button
            className="cs-btn yellow"
            onClick={() => alert("FAQ Coming Soon 😄")}
          >
            Refund
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
*/
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./CustomerService.css";
import { StoreContext } from "../../Context/StoreContext";


const CustomerService = () => {
  const { url } = useContext(StoreContext);

  const [support, setSupport] = useState({
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchSupport = async () => {
      try {
        const res = await axios.get(url + "/api/support");
        if (res.data.success) {
          setSupport({
            phone: res.data.phone,
            email: res.data.email,
          });
        }
      } catch (err) {
        console.log("Support fetch error:", err);
      }
    };

    fetchSupport();
  }, [url]);

  return (
    <div className="cs-page">
      <h2>📞 Customer Service</h2>
      <p className="cs-sub">
        Need help? Contact us anytime. We are here for you ❤️
      </p>

      <div className="cs-grid">
        {/* Call */}
        <div className="cs-card">
          <h3>📞 Call Support</h3>
          <p>Talk to our support team directly.</p>
          <a href={`tel:${support.phone}`} className="cs-btn">
            Call Now
          </a>
        </div>

        {/* WhatsApp */}
        <div className="cs-card">
          <h3>💬 WhatsApp</h3>
          <p>Chat with us on WhatsApp for fast support.</p>
          <a
            href={`https://wa.me/${support.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cs-btn green"
          >
            WhatsApp
          </a>
        </div>

        {/* Email */}
        <div className="cs-card">
          <h3>📧 Email Support</h3>
          <p>Send your issue with details.</p>
          <a href={`mailto:${support.email}`} className="cs-btn blue">
            Email Us
          </a>
        </div>

        {/* FAQ */}
        <div className="cs-card">
          <h3>❓ FAQ</h3>
          <p>Find answers to common questions.</p>
          <button
            className="cs-btn pink"
            onClick={() => alert("FAQ Coming Soon 😄")}
          >
            View FAQ
          </button>
        </div>

        <div className="cs-card">
          <h3> Order Cancel ❓</h3>
          <p>Find answers to common questions.</p>
          <button className="cs-btn red" onClick={() => alert("Coming Soon 😄")}>
            Order Cancel
          </button>
        </div>

        <div className="cs-card">
          <h3> Refund ❓</h3>
          <p>Find answers to common questions.</p>
          <button
            className="cs-btn yellow"
            onClick={() => alert("Coming Soon 😄")}
          >
            Refund
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
