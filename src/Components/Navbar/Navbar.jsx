import React, { useState } from 'react'
import './Navbar.css'
import { food_list, photo } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';


const Navbar = ({ setShowLogin }) => {
    const [manu, setManu] = useState("Home");


    const { getTotalAmount, token, setToken, query,setQuery,cartItems} = useContext(StoreContext);
    /* const [query,setQuery] = useState("")
     const fillterName = food_list.filter((name)=>{
         name.toLowerCase().includes('milk')
     })
 
      onChange={(e)=>setQuery(e.target.value.toLocaleLowerCase())}
         
     fillterName()
const onChangeHandlers = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(setQuery=>({...data,[name]:value}))
  }
     */
    
    
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")


    }
    return (
        <div className='navbar'>
            

            <div className='logo'>
                <Link to='/'> <img src={photo.bike} alt="" /></Link>
            </div>
            <ul className='navbar-manu'>
                <Link to='/' onClick={() => setManu("home")} className={manu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setManu("explore-menu")} className={manu === "explore-menu" ? "active" : ""}>explore-menu</a>
                <a href='#appdownload' onClick={() => setManu("mobile-app")} className={manu === "mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setManu("contact-us")} className={manu === "contact-us" ? "active" : ""}>Contact-us</a>
            </ul>
            <div className="navbar-right">
                <div className="enter"><input onChange={(e)=>setQuery(e.target.value.toLowerCase())} value={query} type="text" className='inputplace' placeholder='Enter your product' />
                    <img src={photo.glass_icon} alt="" /></div>
                <div className="seartch-icon">
                    <Link to='/cart'><img src={photo.bocket} alt="" /></Link>
                    <div className={getTotalAmount()===0 ?"":"dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sing in</button>
                    : <div className='navbar-profile' >
                        <img src={photo.admin} alt="" />
                        <ul className='nav-profile-down'>
                            <li onClick={() => navigate("/myorders")}><img src={photo.bocket} alt="" /><p>Orders</p></li>
                            <hr className='more' />
                            <li onClick={logout} ><img src={photo.bike} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                }



            </div>
        </div>
    )
}

export default Navbar
//onClick={()=>navigate("/myorders")}
