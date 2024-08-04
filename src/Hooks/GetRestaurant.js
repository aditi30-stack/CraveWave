import { useEffect, useState } from "react";
import axios from "axios";
import { INITIAL_URL } from "../utils/Constants";

const useRestaurantData = () => {
    const [menu, setMenu] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchData();
        
    }, []);

    const fetchData = async () => {
        try {

            const response = await axios.get(INITIAL_URL);
            console.log("Response Data:", response.data);

            const newData = response?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            console.log(newData)

            setMenu(newData)
            
        } catch (error) {
            console.error("Error fetching data:", error.response ? error.response.data : error.message);
            setError(error)
           
        }
    };

    return {
        menu,
        error
    };
};

export default useRestaurantData;
