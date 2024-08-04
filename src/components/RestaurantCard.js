import React, { useEffect, useCallback, useRef } from "react";
import { Shimmer } from "./shimmer";
import { useNavigate } from "react-router-dom";

export const RestaurantCard = ({menu}) => {

  const navigate = useNavigate();


  if (menu.length === 0) {
    return (
      <div className="flex flex-wrap p-4 shrink-0 overflow-hidden">
        <div className="flex flex-wrap gap-4">
          {[...Array(20)].map((_, i) => (
            <div data-testid="shimmer"
              key={i}
              className="shadow-lg shadow-white p-4 hover:scale-105 hover:transition-transform"
            >
              <Shimmer />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-16 overflow-hidden mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-w-screen-lg">
        {menu.map((crd) => (
          <div
            key={crd.info.id}
            className="p-6 shadow-lg shadow-white hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate(`/restaurant/${crd.info.name}/${crd.info.id}`)}
          >
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${crd.info.cloudinaryImageId}`}
              alt={crd.info.name}
              className="h-[10rem] w-full rounded-md object-cover"
            />
            <h3 className="font-semibold mt-2">{crd.info.name}</h3>
            <div className="flex justify-between mt-1">
              <h4 className="font-semibold text-md">{crd.info.avgRating} Rating</h4>
              <h4 className="font-semibold text-md">{crd.info.sla.slaString}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
