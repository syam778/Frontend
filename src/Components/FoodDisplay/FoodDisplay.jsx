import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'


const FoodDisplay = ({category}) => {
    const { food_list, query, setQuery } = useContext(StoreContext)
    const foodFilter = food_list.filter((food_list) => food_list.name.toLowerCase().includes(''))
    console.log(foodFilter)

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Product near you</h2>
            <div className="food-display-list">



                {food_list.filter((food_list) => food_list.name.toLowerCase().includes(query)).map((item, index) => {

                    if (category==="All" || category===item.category) {//miss understand this code categore by name type check and find this debuge this problem (1:44:45 video time stamp)
                        return (
                            <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} rating_image={item.rating} maps={item.maps}  />
                        )

                    }


                })

                }
            </div>
        </div>
    )
}

export default FoodDisplay
