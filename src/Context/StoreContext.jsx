/*import { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/assets";
//import { await } from "react-router-dom";
import axios from 'axios'


export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    
    //const url = "https://backend2-5-2t0w.onrender.com" //last


    const url = "http://localhost:3000"
    //const url ="https://backend2-3-vwf9.onrender.com"




    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])
    const [query, setQuery] = useState('')
    let wonAudio = new Audio('/Audios/done.mp3');
    let doneAudio = new Audio('/Audios/error.mp3');
    let submitAudio = new Audio('/Audios/submit2.mp3');
    const upiId = "beherasyam28-2@oksbi";
    let addAudio = new Audio('/Audios/add.mp3');
    let timeAudio = new Audio('/Audios/ontime.mp3');

    


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
            addAudio.play()
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
            addAudio.play()
            
        }
        if (token) {
            await axios.post(url + "/api/card/add", { itemId }, { headers: { token } })
            addAudio.play()

        }
    }
    const likeToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
            addAudio.play()
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
            addAudio.play()
            
        }
        if (token) {
            await axios.post(url + "/api/card/like", { itemId }, { headers: { token } })
            addAudio.play()

        }
    }
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        doneAudio.play();
        if (token) {
            await axios.post(url + "/api/card/remove", { itemId }, { headers: { token } })
            doneAudio.play();
        }
    }

    const getTotalAmount = () => {
    let totalAmount = 0;

    for (const [itemId, quantity] of Object.entries(cartItems)) {
        if (quantity > 0) {
            const itemInfo = food_list.find((product) => product._id.toString() === itemId);
            if (itemInfo) {
                totalAmount += itemInfo.price * quantity;
            }
        }
    }

    return totalAmount;
}

        
        
    

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }
    const loadCardData = async (token) => {
        const response = await axios.post(url + "/api/card/get", {}, { headers: { token } })
        setCartItems(response.data.cardData)

    }
    
    
    



    useEffect(() => {

        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCardData(localStorage.getItem("token"))
            }

        }
        loadData();
        
    }, [])


    const contextValue = {
        food_list,upiId,cartItems, setCartItems, addToCart,likeToCart, removeFromCart, getTotalAmount, url, token, setToken, query, setQuery,doneAudio,submitAudio,wonAudio,addAudio,timeAudio,

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider  //old im code
*/

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  // ❤️ Like Items (Zomato Wishlist)
  const [likeItems, setLikeItems] = useState([]);

  //const url = "https://backend2-5-2t0w.onrender.com" //last
  //const url = "http://localhost:3000";
  const url = "https://syama-mniy.onrender.com";
  
  

  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [query, setQuery] = useState("");

  let wonAudio = new Audio("/Audios/done.mp3");
  let doneAudio = new Audio("/Audios/error.mp3");
  let submitAudio = new Audio("/Audios/submit2.mp3");
  let addAudio = new Audio("/Audios/add.mp3");
  let timeAudio = new Audio("/Audios/ontime.mp3");

  const upiId = "beherasyam28-2@oksbi";

  // ✅ CART ADD
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      addAudio.play();
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      addAudio.play();
    }

    if (token) {
      await axios.post(url + "/api/card/add", { itemId }, { headers: { token } });
    }
  };

  // ✅ CART REMOVE
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    doneAudio.play();

    if (token) {
      await axios.post(
        url + "/api/card/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // ❤️ LIKE TOGGLE (Zomato)
  const likeToCart = async (itemId) => {
    setLikeItems((prev) => {
      // already liked => unlike
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }
      // new like
      return [...prev, itemId];
    });

    addAudio.play();

    // if you want backend like save
    if (token) {
      await axios.post(
        url + "/api/card/like",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // ✅ TOTAL AMOUNT
  const getTotalAmount = () => {
    let totalAmount = 0;

    for (const [itemId, quantity] of Object.entries(cartItems)) {
      if (quantity > 0) {
        const itemInfo = food_list.find(
          (product) => product._id.toString() === itemId
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  // ✅ FOOD LIST
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  // ✅ LOAD CART DATA
  const loadCardData = async (token) => {
    const response = await axios.post(
      url + "/api/card/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cardData);
  };

  // ❤️ LOAD LIKE DATA (optional)
  const loadLikeData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/card/get-like",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setLikeItems(response.data.likeData || []);
      }
    } catch (err) {
      // if route not exist, ignore
    }
  };

  // ✅ Load from localStorage (for Like)
  useEffect(() => {
    const savedLikes = localStorage.getItem("likeItems");
    if (savedLikes) {
      setLikeItems(JSON.parse(savedLikes));
    }
  }, []);

  // ✅ Save Like to localStorage
  useEffect(() => {
    localStorage.setItem("likeItems", JSON.stringify(likeItems));
  }, [likeItems]);

  // ✅ MAIN LOAD
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      if (localStorage.getItem("token")) {
        const savedToken = localStorage.getItem("token");
        setToken(savedToken);

        await loadCardData(savedToken);

        // optional: load like from backend if you created API
        await loadLikeData(savedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    upiId,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    url,
    token,
    setToken,
    query,
    setQuery,

    // ❤️ like system
    likeItems,
    likeToCart,

    // 🔊 audios
    doneAudio,
    submitAudio,
    wonAudio,
    addAudio,
    timeAudio,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;



