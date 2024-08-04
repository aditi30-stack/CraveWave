import "@testing-library/jest-dom"
import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import useRestaurantData from "../../Hooks/GetRestaurant"
import { RestaurantCard } from "../RestaurantCard"
import { BrowserRouter as Router, useNavigate } from "react-router-dom"



jest.mock("../../Hooks/GetRestaurant")

const mockNavigate = jest.fn()

jest.mock("react-router-dom", ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe('RestaurantCard', ()=>{
    test('shows shimmer effect when menu is empty', async()=>{
        useRestaurantData.mockReturnValue({menu: []})

        render (
            <Router>
                <RestaurantCard/>
                </Router>

        )

        await waitFor(()=>{
            const shimmerElements = screen.getAllByTestId('shimmer')
            expect(shimmerElements).toHaveLength(20)

        })
        
    }),

    test('display restaurant cards when menu has data', async()=>{
        const mockData = [
            {
                info: {
                    id: "1",
                    name: "Restaurant 1",
                    cloudinaryImageId: 'image1',
                    avgRating: '4.5',
                    sla: { slaString: '30 min'}
                }
            }
        ]
        useRestaurantData.mockReturnValue({menu: mockData})
        render(
            <Router>
                <RestaurantCard/>
                </Router>

        )
        await waitFor(()=>{
            expect(screen.getByText('Restaurant 1')).toBeInTheDocument();
            expect(screen.getByText('4.5 Rating')).toBeInTheDocument();
            expect(screen.getByText('30 min')).toBeInTheDocument();

        })
    }),

    test("navigates to correct route on card click", async ()=>{
        const mockData = [
            {
                info: {
                    id: "1",
                    name: "Restaurant",
                    cloudinaryImageId: 'image1',
                    avgRating: '4.5',
                    sla: { slaString: '30 min'}
                }
            }
        ]
        
        useRestaurantData.mockReturnValue({menu:mockData})

        render(
            <Router>
            <RestaurantCard/>
            </Router>

        )
        await waitFor(()=>{
            const cardElement = screen.getByText('Restaurant')
            expect(cardElement).toBeInTheDocument()

            fireEvent.click(cardElement)
            expect(mockNavigate).toHaveBeenCalledWith('/restaurant/Restaurant/1')

        })

        
    })

})