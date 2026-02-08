import React, { useEffect, useState, useContext } from 'react';
import './MyOrder.css';
//import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { photo } from '../../assets/assets';
import { assets } from '../../../../Admin/src/assets/assets';
import { StoreContext } from '../../context/Storecontext';

const MyOrder = () => {
  const { token, url, doneAudio, submitAudio,  } = useContext(StoreContext);
  const [data, setData] = useState([]);
  //let submitAudio = new Audio('/Audios/submit2.mp3')
  //let errorAudio = new Audio('/Audios/error.mp3')

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    console.log(response.data.data);
  };



  /*const removeOrder = async (id) => {
  try {
    const res = await axios.post(`${url}/api/order/remove`, { id });

    if (res.data.success) {
      toast.success("Order removed");
      fetchOrders();
      
    } else {
      toast.error(res.data.message || "Failed to remove");
    }
  } catch (err) {
    console.log(err);
    toast.error("Server error");
    
    
  }
};

  const removeOrder = async (id) => {
    try {
      const res = await axios.post(`${url}/api/order/remove`, { id }, {
        headers: { token }
      });

      if (res.data.success) {
        // remove from UI immediately
        setData(prev => prev.filter(order => order._id !== id));
        doneAudio.play()
      } else {
        console.log(res.data.message || "Failed to remove");
        
      }
    } catch (err) {
      console.log(err);
    }
  };
*/
const removeOrder = async (id) => {
  try {
    const res = await axios.post(`${url}/api/order/remove`, { id }, {
      headers: { token }
    });

    if (res.data.success) {
      doneAudio.play()
      fetchOrders(); // ✅ refresh list & counts
    } else {
      console.log(res.data.message || "Failed to remove");
    }
  } catch (err) {
    console.log(err);
  }
};





  useEffect(() => {
    if (token) fetchOrders();

  }, [token]);

  return (
    <div className='myorders'>
      <h2>My Orders</h2>
      <div className="coin">
        {data.map((order, index) => (
          <div key={index} className='my-order'>
            <img src={photo.bocket} alt="" />

            <p className='name-quantity'> Item  -
              {order.items.map(i => `${i.name}${i.quantity}`).join(", ")}
            </p>

            <p>₹{order.amount}.00</p>

            <span className='store-data'>
              <p>City - {order.items.map(i => i.city).join(", ")}</p>
              <p>Address - {order.items.map(i => i.street).join(", ")}</p>
              <p>Phone - {order.items.map(i => i.phone).join(", ")}</p>
              <p>Name - {order.items.map(i => i.firstName).join(", ")}</p>
            </span>

            <p>{order.phone}</p>

            {/*  One map link per order 
            

            <p>
              {order.items[0]?.linkdata ? (
                
                <a
                  href={order.items[0].linkdata}
                  target="_blank"
                  rel="noopener noreferrer"
                ><img className='marker' src={assets.lmarker} alt="" />
                  View Map
                </a>
              ) : (
                "No Map"
              )}
            </p>  */}
            <p>
              {order.items?.some(item => item.linkdata) ? (
                order.items.map((item, index) =>
                  item.linkdata ? (
                    <a
                      key={index}
                      href={item.linkdata}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginRight: "10px" }}
                    >
                      <img className="marker" src={assets.lmarker} alt="" />
                      View Map {index + 1}
                    </a>
                  ) : null
                )
              ) : (
                "No Map"
              )}
            </p>


            <p id='item'>items: {order.items.length}</p>

            <p className='status'>
              <span>&#x25cf;</span>
              <b>{order.status}</b>
            </p>

            <button type='button' onClick={fetchOrders}>Track Order</button>
            
            <button  className="remove" onClick={() => removeOrder(order._id)}>Order Cancel</button>

          </div>



        ))}
      </div>
    </div>
  );
};

export default MyOrder;



//<button onClick={() => removeOrder(order._id)}>Remove</button>
/*


.myorders h2{
    font-size: 25px;
    font-weight: 600;
    color: tomato;
    display: flex;
    justify-content: center;margin-bottom: 20px;
}
.my-order .coin{
    display: grid;
    flex-direction: column;
    gap: 30px;
    margin-top: 30px;
}

.my-order{
    display: grid;
    width: 100%;
    grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
    box-shadow: 0px 0px 5px blue;
    align-items: center;
    gap: 30px;
    font-size: 18px;
    padding: 10px 20px;
    color: brown;
    border: 1.7px solid gray;
    border-radius: 16px;
    margin-top: 10px;
    margin-bottom: 20px;

}
.store-data{
    width: 150%;
    height: 95%;
    box-shadow: 0px 0px 5px rgb(161, 161, 224);
    padding: 10px 10px;
    color: brown;
    border: 1.7px solid rgb(236, 124, 124);
    border-radius: 16px;
}
.my-order img{
    width:100px;
    height: 100px;
    
}
.marker{
    width:100px;
    height: 100px;
    border: 1px solid blue;
    border-radius: 10px;
    box-shadow: 0px 0px 10px darkblue;
    
}
.marker:hover{
    width:100px;
    height: 100px;
    border: 2px solid red;
    border-radius: 10px;
    box-shadow: 0px 0px 10px brown;
}
.my-order button{
    padding: 5px 24px;
    border: 1.5px solid blue;
    box-shadow: 0px 0px 6px black;
    border-radius: 16px ;
    background-color: green;
    color: wheat;
    cursor: pointer;
    transition: all 1s ease-out;
    transform: translateY(25deg);
    font-size: 12px;
}
.my-order button:hover{
    background-color: wheat;
    color: black;
    padding: 8px 16px;
    border: 1.5px solid gold;
    border-radius: 8px ; 
    font-size: 10px;
    

}


.my-order p:nth-child(1){
    font-size: 15px;
    font-weight: 600;
    color: mediumvioletred;
    gap: 6px;
    

}
.my-order p:nth-child(2){
    font-size: 16px;
    font-weight: 500;
    color: black;
    margin-top: 10px;
    margin-bottom: 10px;
    
    
}

.my-order p:nth-child(3){
    font-size: 15px;
    font-weight: 500;
    color: blue;
    gap: 6px;
    margin-bottom: 10px;
    
}
.my-order p span{
    color: green;
}
.my-order p:nth-child(4){
    color: tomato;
    font-size: 16px;
    font-weight: 500;
}
#item{
    color: red;
    font-size: 22px;
    font-weight: 500;
    width: 200%;

}

.status{
    margin-left: 30px;
}
.remove{
    color: red;
    font-size: 22px;
    font-weight: 500;

}








import React, { useEffect, useState } from 'react'
import './MyOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { photo } from '../../assets/assets'
const MyOrder = () => {
    const { getTotalAmount, token, food_list, cartItems, url } = useContext(StoreContext)

    const [data, setData] = useState([])
    const fetchOrders = async () => {

        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        setData(response.data.data)
        console.log(response.data.data)
    }
    useEffect(() => {
        if (token) {
            fetchOrders();

        }
    }, [token])

    return (
        <div className='myorders'>
            <h2>My Orders</h2>
            <div className="coin">
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-order'>
                            <img src={photo.bocket} alt="" />
                            <p className='name-quantity'>{order.items.map((item, index) => {
                                if (index === order.items.length) {
                                    return item.name + item.quantity
                                }
                                else {
                                    return item.name + item.quantity + ","

                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <span className='store-data'>
                                <p>{order.items.map((item, index) => {
                                    if (index === order.items.length) {
                                        return item.city
                                    }
                                    else {
                                        return item.city
                                    }

                                })}</p>
                                <p>{order.items.map((item, index) => {
                                    if (index === order.items.length) {
                                        return item.street
                                    }
                                    else {
                                        return item.street
                                    }

                                })}</p>
                                <p>{order.items.map((item, index) => {
                                    if (index === order.items.length) {
                                        return item.phone
                                    }
                                    else {
                                        return item.phone
                                    }

                                })}</p>
                                <p>{order.items.map((item, index) => {
                                    if (index === order.items.length) {
                                        return item.firstName
                                    }
                                    else {
                                        return item.firstName
                                    }

                                })}</p>

                            </span>
                            <p>{order.phone}</p>
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length) {
                                    return <a
                                        href={item.linkdata}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Map
                                    </a>
                                }
                                else {
                                    return <a
                                        href={item.linkdata}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Map
                                    </a>
                                }

                            })}</p>




                            <p>items:{order.items.length}</p>
                            <p className='status'><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default MyOrder
*/