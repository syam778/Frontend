import React from 'react'
import { photo } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="left">
                <img className='bike' src={photo.bike} alt="" />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicingm corporis et quae repellendus dignissimos itaque doloremque.</p>
                <div className="social-icon">
                    <img src={photo.git} alt="" />
                    <img src={photo.fb} alt="" />
                    <img src={photo.insta} alt="" />
                    <img src={photo.youtube} alt="" />
                    <img src={photo.x} alt="" />
                    <img src={photo.lin} alt="" />
                    
                </div>


            </div>
            <div className="center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div className="right">
                <h2>GET IN TOUCH</h2>
                <ul>
                <li>Contact-7227963777</li>
                <li>Gmail-syamasundar@gmail.com</li>
                </ul>

            </div>
        </div>
        <hr />
        <p className='copy'>Copyright 2025 @ Speed-del -All Right REserved</p>
    </div>
  )
}

export default Footer
/*
.footer{
    background-color: slategray;
    margin: 20px auto;
    width: 80%;
    border-radius: 20px;
    box-shadow: 0px 0px 8px rgb(52, 193, 54);
}
.footer-content{
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 80px;
}
.social-icon img{
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50px;
}

.bike{
    width: 140px;
    height: 140px;
}
.left,.center,.right{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    color: antiquewhite;
    margin-left: 20px;

    
}
.left li,.center li,.right li{
    list-style: none;
    margin-bottom: 10px;
    color: wheat;
    cursor: pointer;
    
}
.center,.right{
    margin-top: 40px;
    cursor: pointer;
}
.center h2,.right h2{
    margin-left: -30px;
    margin-bottom: 20px;
    gap: 20px;
    color: white;
}
.left{
    gap: 20px;
}
.center{
    gap: 10px;
}
 hr{
    margin: 20px 0px;
    height: 2px;
    background-color: wheat;
    width: 70%;
    margin-left: 160px;
   
}
.copy{
    display: flex;
    justify-content: center;
    color: wheat;
    font-size: 16px;
    font-weight: 500;
    height: 8vh;
    

}
@media (max-width:375px){
    .footer{
    background-color: slategray;
    margin: 10px auto;
    width: 90%;
    border-radius: 20px;
    box-shadow: 0px 0px 8px rgb(52, 193, 54);
   
}

.social-icon img{
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-radius: 50px;
}

.bike{
    width: 120px;
    height: 120px;
}

.footer-content{
    display: flex;
    flex-direction: column;
    
}
 hr{
    margin: 20px 0px;
    height: 1px;
    background-color: black;
    width: 80%;
    margin-left: 35px;
   
}
.copy{
    display: flex;
    justify-content: center;
    color: wheat;
    font-size: 12px;
    font-weight: 500;
    height: 6vh;
    
}
.left,.center,.right{
    color: antiquewhite;
    margin-left: 20px;
    margin-top: -20px;

    
}
.left li,.center li,.right li{
    list-style: none;
    color: wheat;
    cursor: pointer;
    
}
.center,.right{
    cursor: pointer;
    
   
}
.center h2,.right h2{
    margin-left: 30px;
    color: white;
    font-size: 20px;
    margin-top: -40px;
    margin-left: -10px;
    
}

}
*/