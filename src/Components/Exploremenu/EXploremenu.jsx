import React from 'react'
import './EXploremenu.css'
import { menu_list } from '../../assets/assets'

const EXploremenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Select All Category Food Avhelebul Here Check And By Now</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}  key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name? "active":""}  src={item.menu_image} alt="" />
                        <p className='text'>{item.menu_name}</p>
                       
                    </div>
                    
                    
                )
            })

            }
        </div>
        <hr />

    </div>
  )
}

export default EXploremenu
