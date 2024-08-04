import { CiStar } from "react-icons/ci";
import { MenuCard } from "./MenuCard";

export const KitchenCard = ({
    name,
    locality,
    totalRatingsString,
    avgRatingString,
    costForTwoMessage,
    cuisines,
    sla
}) => {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-2xl px-4 py-6 shadow-lg border-b-2 border-r-2 border-blue-200 border-l-2 shadow-slate-800 rounded-md">
                <h1 className="text-2xl font-bold mb-4 mt-4 text-center">{name}</h1>
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                        <CiStar data-testid="star-icon" className=" text-xl mr-1" />
                        <div className="font-semibold">{avgRatingString} ({totalRatingsString}) - {costForTwoMessage}</div>
                    </div>
                    <div className="font-bold text-orange-500 underline">
                        {cuisines.join(", ")}
                    </div>
                    <div className="space-y-2">
                        <div className="font-bold"> Outlet </div>
                        <div className=" font-semibold">
                            {locality}
                        </div>
                        <div className="font-semibold">
                            {sla.slaString}
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
