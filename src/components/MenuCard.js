import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { FaCartPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export const MenuCard = ({ name, price, description, image }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const items = useSelector((state) => state.cart.items);
    const item = items.find((item) => item.name === name)
    
    
    const totalQuantity = items.reduce((acc, currItem) => acc + currItem.quantity, 0);
    
    
    const handleAddItem = (name, price, image) => {
        console.log("Adding item")
        dispatch(addItem({ name, price, image }));
    };

    const handleRemoveItem = (name) => {
        console.log("removing item")
        dispatch(removeItem({ name }));
    };


    

    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="max-w-2xl p-8 w-full mt-10 border-b border-gray-400 flex justify-between items-center">
                    <div>
                        <div className="font-bold">{name}</div>
                        <div>{price}</div>
                        <div className="text-gray-400 text-lg mt-2">
                            {description.length > 100 ? description.slice(0, 90) + '...more' : description}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-48 h-48 overflow-hidden">
                            <img src={image} alt="Food" className="w-full h-full object-cover shrink-0 grow-0" />
                        </div>

                        <div className="absolute bottom-5 border-2 rounded-lg bg-gray-800 font-bold w-full">
                            {item ? (
                                <div className="px-2 py-1 text-center flex items-center justify-center space-x-2">
                                    <button className="text-xl" onClick={() => handleAddItem(name, price, image)}>
                                        +{item.quantity}
                                    </button>
                                    <button className="text-xl" onClick={() => handleRemoveItem(name)}>
                                        -
                                    </button>
                                </div>
                            ) : (
                                <div className="px-2 py-1 text-center flex items-center justify-center space-x-2">
                                    <button className="text-lg" onClick={() => handleAddItem(name, price, image)}>
                                        Add
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {totalQuantity > 0 && location.pathname !== '/Cart' ? (
                        <div className="fixed bottom-0 left-0 w-full bg-green-500 text-white p-6 text-center font-bold z-50 flex justify-around items-center">
                            <div className="mt-4 text-lg">
                                {totalQuantity} items added
                            </div>
                            <div className="flex mt-1 space-x-4 text-lg cursor-pointer">
                                <div onClick={() => navigate('/cart')}>View Cart</div>
                                <FaCartPlus onClick={() => navigate('/cart')} className="mt-2 ml-4" />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
