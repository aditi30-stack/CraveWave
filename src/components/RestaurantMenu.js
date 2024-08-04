import axios from "axios"
import { useEffect, useState } from "react"
import { Shimmer } from "./shimmer";
import { useParams } from "react-router-dom";
import { KitchenCard } from "./Kitchen";
import { MenuCard } from "./MenuCard";
export const RestaurantMenu = () =>{

    const [resInfo, setResInfo] = useState(null);
    const [kitchenCard, setKitchenCard] = useState(null);
    const { restId } = useParams();

    useEffect(()=>{
        fetchData();

    }, [])

    const fetchData = async() =>{
        const response = await axios.get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.226851&lng=78.208059&restaurantId=${restId}&catalog_qa=undefined&submitAction=ENTER`)
        const kitchenItems = response?.data?.data?.cards[2]?.card?.card?.info
        const MenuItems = response?.data?.data?.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards
        setResInfo(MenuItems)
        setKitchenCard(kitchenItems)
    

    }

    if (kitchenCard === null) {
        return <Shimmer data-testid="shimmer"/>
    }

    const {name, locality, totalRatingsString, avgRatingString, costForTwoMessage, cuisines, sla} = kitchenCard


    return (
        <div>
            <KitchenCard name={name} locality={locality} totalRatingsString={totalRatingsString} avgRatingString={avgRatingString} costForTwoMessage={costForTwoMessage} cuisines={cuisines} sla={sla}></KitchenCard>
            {console.log(resInfo)}
            
            {resInfo && resInfo.map((elem) => {
                const item = elem?.card?.info;
                const priceInCents = item?.price || item?.defaultPrice || 0;
                const cleanedPrice = priceInCents.toString().replace(/[^0-9.-]+/g, '');
                const itemPrice = parseFloat(cleanedPrice) / 100;

                
                const totalPrice = !isNaN(itemPrice) ? `₹${itemPrice.toFixed(2)}` : '₹0.00';

                const imageUrl = item?.imageId ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${item.imageId}` : "default_image_url";

                return (
                    <MenuCard
                        key={item?.id}
                        name={item?.name || "name"}
                        description={item?.description || "description"}
                        price={totalPrice}
                        image={imageUrl}
                    />
                );
            })}

        </div>
    )
}