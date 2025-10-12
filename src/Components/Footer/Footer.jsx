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