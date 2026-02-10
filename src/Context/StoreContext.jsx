


import { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/assets";
//import { await } from "react-router-dom";
import axios from 'axios'


export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    //const url = "https://back-q3wv.onrender.com "

    const url = "http://localhost:3000"
    //const url = "https://back-q3wv.onrender.com"
    //const url = "https://back-ylnd.onrender.com" 
    //const url = "https://backend3-nt7k.onrender.com"
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
        food_list,upiId,cartItems, setCartItems, addToCart, removeFromCart, getTotalAmount, url, token, setToken, query, setQuery,doneAudio,submitAudio,wonAudio,addAudio,timeAudio,

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider

/*
const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id.toString() === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }


    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];

            }

        }
        return totalAmount;
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


className={getTotalAmount() === 0 ? "" : "dot"}

const [query,setQuery] = useState('')
    
    const foodFilter = food_list.filter((name)=>item.name.toLowerCase().includus('milk'))

*/