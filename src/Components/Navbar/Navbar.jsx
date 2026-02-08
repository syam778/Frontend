import React, { useState } from 'react'
import './Navbar.css'
import { food_list, photo } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';



const Navbar = ({ setShowLogin }) => {
    const [manu, setManu] = useState("Home");


    const { getTotalAmount, token, setToken, query, setQuery, cartItems, onLogin } = useContext(StoreContext);
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
                <Link to='/' onClick={() => setManu("home")} className={manu === "home" ? "active" : ""}><a href='#header' onClick={() => setManu("header")} className={manu === "header" ? "active" : ""}></a>Home</Link>
                <a href='#explore-menu' onClick={() => setManu("explore-menu")} className={manu === "explore-menu" ? "active" : ""}>explore-menu</a>
                <a href='#appdownload' onClick={() => setManu("mobile-app")} className={manu === "mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setManu("footer")} className={manu === "footer" ? "active" : ""}>Contact-us</a>
            </ul>
            <div className="navbar-right">
                <div className="enter"><input onChange={(e) => setQuery(e.target.value.toLowerCase())} value={query} type="text" className='inputplace' placeholder='Enter your product' />
                    <img src={photo.glass_icon} alt="" /></div>
                <div className="seartch-icon">
                    <Link to='/cart'><img src={photo.bocket} alt="" /></Link>
                    <div className={getTotalAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sing in</button>
                    : <div className='navbar-profile' >
                        <img src={photo.admin} alt="" />
                        <ul className='nav-profile-down'>
                            <li onClick={() => navigate("/my-order")}><img src={photo.bocket} alt="" /><p>Orders</p></li>
                            <hr className='more' />
                            <li onClick={logout} ><img src={photo.bike} alt="" /><p>Logout</p></li>

                            <li onClick={() => navigate("/my-data")} >
                                <img src={photo.admin} alt="" />
                                <p>Profile</p>
                            </li>

                            <hr className='more' />

                        </ul>
                    </div>
                }



            </div>
        </div>
        
    )
}

export default Navbar
//onClick={()=>navigate("/myorders")}
/*

.navbar{
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.navbar .logo{
    width: 70px;

}
.navbar img{
    width: 150px;
}
.navbar-manu{
    display: flex;
    list-style: none;
    gap: 20px;
    color: gray;
    font-size: 18px;
    margin-left: 30px;
    
}
.navbar-right{
    display: flex;
    align-items: center;
    gap: 40px;
    cursor: pointer;
    margin-left: -30px;
    
}
.navbar-right img{
    width: 50px;
    height: 50px;
}
.navbar button{
    background: transparent;
    font-size: 16px;
    color: black;
    border: 1px solid black;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0px 0px 10px tomato;
    background-color: red;
}
.navbar button:hover{
    background-color: bisque;
    color: brown;
}
.navbar-manu .active{
    padding-bottom: 2px;
    border-bottom: 2px solid blue;
}
.navbar li{
    cursor: pointer;
}
.seartch-icon{
    position: relative;
}
.dot{
    position: absolute;
    min-height: 13px;
    min-width: 13px;
    background-color: red;
    border-radius: 10px;
    top: -8px;
    right: -7px;
}
.enter{
    display: flex;
    justify-content: center;
    padding: 8px 4px;
    color: gray;
    border: 1px solid gray;
    box-shadow: 0px 0px 10px gray;
    border-radius: 20px;
}
.enter img{
    width: 30px;
    height: 30px;
    margin-left: -30px;
}
.inputplace{
    border: none;
    border-style: none;
    outline: none;


}
.navbar-profile{
    position: relative;
}
.nav-profile-down{
    position: absolute;
    display: none;
    right: 0;
    z-index: 1;
}

.navbar-profile:hover .nav-profile-down{
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: wheat;
    padding: 12px 25px;
    border: 1px solid black;
    border-radius: 12px;
    outline: 1px solid ghostwhite;
    list-style: none;
}
.more{
    height: 1.5px;
    background-color: grey;
    border: none;
    margin: 10px auto;
    width: 90%;
    margin-top: 10px;
    
}
.nav-profile-down li{
    display:  flex;
    align-items: center;
    cursor: pointer;
    gap: 10px;
}
.nav-profile-down img{
    width: 50px;
    height: 50px;
    border: 1.2px solid grey;
    padding: 2px;
    background-color: white;
    border-radius: 6px;
}
.nav-profile-down li:hover{
    color: red;
    
}
.nav-profile-down img:hover{
    width: 50px;
    height: 50px;
    border: 1.6px solid red;
    padding: 2px;
    background-color: tan;
    border-radius: 6px;

}
@media (max-width:375px){
    .navbar{
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo img{
    width: 50px;
    height: 50px;
    margin-left: -40px;
}
.navbar-manu{
    display: flex;
    list-style: none;
    gap: 10px;
    color: gray;
    font-size: 10px;
    margin-left: 10px;
    
}
.navbar-right{
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    margin-left: 8px;
    
}
.navbar-right img{
    width: 14px;
    height: 14px;
}
.navbar button{
    background: transparent;
    font-size: 5px;
    color: black;
    border: 1px solid black;
    padding: 4px 6px;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0px 0px 5px tomato;
    background-color: aqua;
    
}
.navbar button:hover{
    background-color: bisque;
    color: brown;
}
.navbar-manu .active{
    padding-bottom: 2px;
    border-bottom: 2px solid blue;
}
.navbar li{
    cursor: pointer;
}
.seartch-icon{
    position: relative;
}
.dot{
    position: absolute;
    min-height: 8px;
    min-width: 8px;
    background-color: tomato;
    border-radius: 5px;
    top: -8px;
    right: -6px;
}
.enter{
    display: flex;
    justify-content: center;
    padding: 2px 1.5px;
    color: gray;
    border: 1px solid gray;
    box-shadow: 0px 0px 10px gray;
    border-radius: 20px;
    
   
    
}
.enter img{
    width: 12px;
    height: 12px;
    margin-left: 0px;
}
.inputplace{
    border: none;
    border-style: none;
    font-size: 5px;
    margin-left: 5px;
     outline: none;

}

}

*/