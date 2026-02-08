/*import React, { useContext } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const { url,cartItems,submitAudio } = useContext(StoreContext)
    const navigate = useNavigate();
    
    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId })
        if (response.data.success) {
            navigate("/myorders");
            submitAudio.play()
            
        }
        if(verifyPayment===success){
            navigate("/myorders")
            submitAudio.play()
        }
        else {
            navigate("/")
        }

    }
    useEffect(() => {
        verifyPayment();
         if (cartItems[item._id]<0){
            return console.log("item already add")
         }
        

    }, [])
    return (
        <div className='verify'>
            <div className="spin">syama</div>
        </div>
    )
}

export default Verify
*/
import React, { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/Storecontext";

const Verify = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const success = params.get("success");
  const orderId = params.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
      const res = await axios.post(url + "/api/order/verify", null, {
        params: { success, orderId },
      });

      if (res.data.success) {
        navigate("/my-order");
      } else {
        navigate("/cart");
      }
    };

    verifyPayment();
  }, []);

  return <h2>Verifying Payment...</h2>;
};

export default Verify;
