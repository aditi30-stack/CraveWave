import { renderHook, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import axios from "axios";
import useRestaurantData from "../../Hooks/GetRestaurant";



jest.mock('axios');

describe("useRestaurantData", ()=>{
    afterEach(()=>{
        jest.clearAllMocks();

    })

    test("should fetch and set menu data on initial render", async()=>{
        const mockData = {
            data: {
                data: {
                    cards: [
                        {},
                        {
                            card: {
                                card: {
                                    gridElements: {
                                        infoWithStyle: {
                                            restaurants: [
                                                {
                                                    analytics: {},
                                                    cta: {
                                                        link: 'https://www.swiggy.com/restaurants/pizza-hut-city-centre-mahalgaon-gwalior-755033',
                                                        type: 'WEBLINK'
                                                    },
                                                    info: {
                                                        aggregatedDiscountInfoV3: { header: '50% OFF', subHeader: 'UPTO ₹80' },
                                                        areaName: "Mahalgaon",
                                                        availability: { nextCloseTime: '2024-08-02 04:00:00', opened: true },
                                                        avgRating: 4.1,
                                                        avgRatingString: "4.1",
                                                        badges: { imageBadges: [] },
                                                        badgesV2: { entityBadges: {} },
                                                        cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2024/7/18/27016792-24fb-426d-a815-3d76df8af1ac_755033.jpg",
                                                        costForTwo: "₹350 for two",
                                                        cuisines: ['Pizzas'],
                                                        differentiatedUi: { displayType: 'ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT', differentiatedUiMediaDetails: {} },
                                                        displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
                                                        externalRatings: { aggregatedRating: {} },
                                                        id: "755033",
                                                        isOpen: true,
                                                        locality: "City Centre",
                                                        name: "Pizza Hut",
                                                        parentId: "721",
                                                        ratingsDisplayPreference: "RATINGS_DISPLAY_PREFERENCE_SHOW_SWIGGY",
                                                        restaurantOfferPresentationInfo: {},
                                                        reviewsSummary: {},
                                                        sla: { deliveryTime: 25, lastMileTravel: 3, serviceability: 'SERVICEABLE', slaString: '20-25 mins', lastMileTravelString: '3.0 km' },
                                                        totalRatingsString: "100+",
                                                        type: "F"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        };
        //mock axios get method
        axios.get.mockResolvedValueOnce(mockData);

        const {result} = renderHook(()=> useRestaurantData())

        await waitFor(()=> result.current.menu.length > 0)

        expect(result.current.menu).toEqual(mockData.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)

        
    })

    test("should handle errors gracefully", async()=>{
        axios.get.mockRejectedValueOnce(new Error('Network Error'));


        const {result} = renderHook(()=> useRestaurantData())

        await waitFor(()=> result.current.error !== null)

        expect(result.current.error).not.toBeNull();
        expect(result.current.menu).toEqual([]);
        expect(result.current.error.message).toEqual("Network Error");
    })

})



