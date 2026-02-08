import { useNavigate } from "react-router-dom";
import "./Check.css";

const Terms = () => {
  const navigate = useNavigate();

  const handleAgree = () => {
    localStorage.setItem("termsAccepted", "true");
    navigate("/dashboard"); // or wherever after agree
  };

  return (
    <div className="terms">
      <h2>Terms & Conditions</h2>
      <div className="terms-box">
        <p>
          Welcome to our application. By using this app, you agree that:
        </p>
        <ul>
          <li>You will not misuse the service.</li>
          <li>Your data may be stored securely.</li>
          <li>You accept our privacy policy.</li>
          <li>All payments/orders are final.</li>
        </ul>
        <p>
          Please read carefully before continuing.
        </p>
      </div>

      <button onClick={handleAgree} className="agree-btn">
        I Agree
      </button>
    </div>
  );
};

export default Terms;
