import React from 'react'
import './AppDownload.css'
import { photo } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='appdownload' id='appdownload'>
        <p className='down'>For Better Experience Download <p>Speed-Del App</p> </p>
        <div className="appdownload-platfrom">
            <img src={photo.app} alt="" />
             <img src={photo.playstore} alt="" />
        </div>
    </div>
  )
}

export default AppDownload