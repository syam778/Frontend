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
/*
.explore-menu{
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.explore-menu-list-item img{
    height: 80px;
    width: 80px;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 50%;
    border: 1px solid gray;
}

.explore-menu h1{
    color: grey;
    font-weight: 600;
    font-size: 26px;
    margin-left: 40px;
}
.explore-menu-text{
    margin-left: 40px;
    font-weight: 500;
    font-size: 22px;
    color: grey;

}
.explore-menu p{
    font-weight: 500;
    font-size: 18px;
    color: grey;
    

}
.explore-menu-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    text-align: center;
    margin: 20px 0px;
    overflow-x: scroll;

}
.explore-menu-list::-webkit-scrollbar{
    display: none;
}
hr{
    
    margin-top: 10px;
    height: 2px;
    background-color: grey;
    border: none;
}
.explore-menu-list .active{
    border: 4px solid tomato;
    padding: 2px ;
}
@media (max-width:375px){
    .explore-menu{
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.explore-menu-list-item img{
    height: 50px;
    width: 50px;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 50%;
    border: 1px solid gray;
}

.explore-menu h1{
    color: black;
    font-weight: 600;
    font-size: 18px;
    margin-left: 0px;
}

.explore-menu-text {
    margin-left: 0px;
    font-weight: 500;
    font-size: 12px;
    color: grey;

}
.explore-menu p{
    font-weight: 500;
    font-size: 12px;
    margin-top: 6px;
    color: grey;
    

}
.explore-menu-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    text-align: center;
    overflow-x: scroll;

}
.explore-menu-list::-webkit-scrollbar{
    display: none;
}
.explore-menu hr{
    height: 1.5px;
    background-color: grey;
    border: none;
    margin: 10px auto;
    width: 90%;
    margin-top: -10px;
}
.explore-menu-list .active{
    border: 2px solid tomato;
    padding: 2px ;
}

}
*/