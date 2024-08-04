import { RestaurantCard } from "./RestaurantCard";
import { Filter } from "./Filter";
import useRestaurantData from "../Hooks/GetRestaurant";
import { useCallback, useEffect, useState } from "react";

export const Body = () => {
  const { menu } = useRestaurantData();
  const [filteredMenu, setFilteredMenu] = useState(menu);

  
  const extractRupee = (item) => {
    const costString = item.info.costForTwo || "0";
    const cost = Number(costString.split(" ")[0].trim().replace(/[^0-9]/g, ""));
    return cost;
  };

  const handleFilter = useCallback((filter) => {
    let FilteredData = menu;

    switch (filter) {
      case "all":
        FilteredData = menu;
        break;
      
      case "rating":
        FilteredData = menu.filter(item => item.info.avgRating >= 4.0);
        break;
      
      case "rupee":
        FilteredData = menu.filter(item => extractRupee(item) === 300);
        break;
      
      case "bigRupee":
        FilteredData = menu.filter(item => extractRupee(item) >= 600);
        break;
      
      case "lessRupee":
        FilteredData = menu.filter(item => extractRupee(item) >= 300);
        break;

      default:
        FilteredData = menu;
        break;
    }
    setFilteredMenu(FilteredData);

  }, [menu])

  useEffect(() => {
    setFilteredMenu(menu);
  }, [menu]);

  return (
    <div className="w-full h-screen bg-gray-800">
      <div className="fixed top-0 left-0 w-full bg-gray-800 z-20">
        <Filter handleFilter={handleFilter} />
      </div>

      <div className="w-full flex justify-center items-start overflow-y-auto bg-gray-800">
        <div className="flex flex-col items-center space-x-10 space-y-10 mt-10 mb-10">
          <RestaurantCard menu={filteredMenu} />
        </div>
      </div>
    </div>
  );
};
