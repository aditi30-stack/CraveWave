import axios from 'axios';
import "@testing-library/dom"
import {RestaurantMenu} from "../RestaurantMenu"
import { BrowserRouter } from 'react-router-dom';
import {render, screen} from "@testing-library/react"


jest.mock('axios')

const ReturnedData = {
    data: {
        data:{
            cards: [
                {},
                {},
                {
                    card: {
                        card: {
                            info: {
                                name: 'Pizza Hut',
                                locality: 'City Centre',
                                totalRatingsString: '100+',
                                avgRatingString: '4.1',
                                costForTwoMessage: '₹350 for two',
                                cuisines: ['Italian', 'Chinese'],
                                sla: { slaString: '30-45 mins' },
                            }
                        }
                    }
                }, 
                {},
                {
                    groupedCard: {
                        cardGroupMap: {
                            REGULAR: {
                                cards: [
                                    {},
                                    {},
                                    {
                                        card: {
                                            card: {
                                                itemCards: [
                                                    {
                                                        card: {
                                                            info: {
                                                                id: '1',
                                                                name: 'Margherita Pizza',
                                                                description: 'Delicious cheese pizza',
                                                                price: 29900,
                                                                imageId: 'image123'
                                                            }
                                                        }
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        }
    }
}

describe("Restaurant Menu", ()=>{
    test("Render Shimmer", ()=>{
       const ReturnedDataLength =  axios.get.mockResolvedValueOnce({data: {
        data: {
            cards: []
        }
       }
       })
       render(
        <BrowserRouter>
        <RestaurantMenu/>
        </BrowserRouter>
       )
       const shimmerElement = screen.getByTestId('shimmer')
       expect(shimmerElement).toBeInTheDocument()
        
    })

    test("renders Kitchen Card and Menu Card when data is available", async()=>{
        axios.get.mockResolvedValueOnce(ReturnedData)

        render(
            <BrowserRouter>
            <RestaurantMenu/>
            </BrowserRouter>
        )
        await waitFor(() => {
            
            expect(screen.getByText(/Pizza .*/i)).toBeInTheDocument();
            expect(screen.getByText(/City Centre/i)).toBeInTheDocument();
            expect(screen.getByText(/₹350 for two/i)).toBeInTheDocument();
            expect(screen.getByText(/4.1/i)).toBeInTheDocument();
            expect(screen.getByText(/Italian, Chinese/i)).toBeInTheDocument();

            
            const menuCard = screen.getByTestId('menu-card-1');
            expect(menuCard).toBeInTheDocument();

            
            expect(screen.getByText(/Margherita Pizza/i)).toBeInTheDocument();
            expect(screen.getByText(/Delicious cheese pizza/i)).toBeInTheDocument();
            expect(screen.getByText(/₹299.00/i)).toBeInTheDocument();
            expect(screen.getByAltText(/Margherita Pizza/i)).toHaveAttribute('src', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/image123');
        });
    });
    })


