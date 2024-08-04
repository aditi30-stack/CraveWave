import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom"
import { KitchenCard } from "../Kitchen";



describe("KitchenCard Component", ()=>{
    

    const props = {
    name: "The Great Kitchen",
    locality: "Country Roads",
    totalRatingsString: "1500+ Ratings",
    avgRatingString: "4.5",
    costForTwoMessage: "₹500 for two",
    cuisines: ["burger", "pizza"],
    sla: {slaString: "25-30 MINS"}

    }

    describe("KitchenCard Component", () => {
        const props = {
            name: "The Great Kitchen",
            locality: "Country Roads",
            totalRatingsString: "1500+ Ratings",
            avgRatingString: "4.5",
            costForTwoMessage: "₹500 for two",
            cuisines: ["burger", "pizza"],
            sla: { slaString: "25-30 MINS" }
        };
    
        test("it should render KitchenCard with correct data", () => {
            render(<KitchenCard {...props} />);
    
            expect(screen.getByText(props.name)).toBeInTheDocument();
            expect(screen.getByText((content, element) => 
                content.startsWith(`${props.avgRatingString} (${props.totalRatingsString}) - ${props.costForTwoMessage}`)
            )).toBeInTheDocument();
            expect(screen.getByText(props.cuisines.join(", "))).toBeInTheDocument();
            expect(screen.getByText(props.sla.slaString)).toBeInTheDocument();
        });
    
        test("it should render star icon", () => {
            render(<KitchenCard {...props} />);
    
            
            expect(screen.getByTestId('star-icon')).toBeInTheDocument();
        });
    });
})