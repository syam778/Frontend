import React, { useContext } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const { url,cartItems } = useContext(StoreContext)
    const navigate = useNavigate();
    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId })
        if (response.data.success) {
            navigate("/myorders");
            
        }
        if(verifyPayment===success){
            navigate("/myorders")
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