import { CiSearch } from "react-icons/ci";
import useRestaurantData from "../Hooks/GetRestaurant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const Search = () =>{
    const { menu } = useRestaurantData();
    const [input, setInput] = useState('')
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();

    

    useEffect(()=>{
        if (input) {
            const newFilteredData = menu.filter((m)=>
            m.info.name.toLowerCase().includes(input.toLowerCase())
        )
        setFilteredData(newFilteredData)
        } else {
            setFilteredData([])
        }

    }, [input, menu])

    const handleInput = (e) =>{
        setInput(e.target.value)
    }


    return (
        <div>
            <div className="max-w-xl flex justify-center p-8 mx-auto">
                <div className="w-full flex relative">
                <input type="text" placeholder="Search for restaurant" className="w-full bg-gray-800 p-2 border-2 rounded-md focus:outline-none"
                onChange={(e)=>{
                    handleInput(e)
                }}></input>
                <CiSearch data-testid="search" className="text-xl absolute top-3 bottom-6 right-5 cursor-pointer" />
                </div>


            </div>

            {input && filteredData.length > 0 && (
                <div className="max-w-lg mx-auto mt-4">
                    {filteredData.map((m) =>(
                        <div data-testid="filter" onClick={()=>{
                            navigate(`/restaurant/${m.info.name}/${m.info.id}`)
                        }} key={m.info.id} className="flex max-w-lg space-x-4 w-20 h-20 p-4 space-y-4 cursor-pointer">
                            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${m.info.cloudinaryImageId}`} alt="photo" className="mt-2 w-full h-full rounded-full"></img>
                            <ul className="bg-gray-800 p-2 mb-2 max-w-md">
                            <li>{(m.info.name).substring(0,20)}</li>
                            </ul>

                        </div>
                        
                    ))}
                </div>
            )}


            
        </div>
    )
}