import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/Constants";
import { FaHome, FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { IoPersonOutline } from "react-icons/io5";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";

export const Headers = () => {
    const [open, setOpen] = useState(false);
    const totalItems = useSelector((state) => state.cart.items);
    

    const total = useMemo(() => {
        return totalItems.reduce((acc, curr) => acc + curr.quantity, 0);
    }, [totalItems]);

    return (
        <div className="flex h-20 shadow-lg p-1 z-50 w-full bg-white rounded-md justify-around items-center overflow-hidden">
            <div>
                <img src={LOGO_URL} alt="food logo" className="h-[5rem] w-[5rem]" />
            </div>
            <div>
                <ul className="flex space-x-4 text-lg font-semibold text-gray-800 hover:underline decoration-orange-500">
                    <div className="flex space-x-4">
                        <div>
                            <FaHome className="text-lg mt-1" />
                        </div>
                        <li><Link to="/">Home</Link></li>
                        <div>
                            <FcAbout className="text-lg mt-1.5" />
                        </div>
                        <li><Link to="/about">About</Link></li>
                        <div>
                            <FaPhoneAlt className="text-lg mt-1" />
                        </div>
                        <li><Link to="/contact">Contact</Link></li>
                        <div className="relative">
                            <FaShoppingCart className="text-lg mt-1" />
                            {total > 0 && (
                                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                    {total}
                                </div>
                            )}
                        </div>
                        <li className="relative"><Link to="/Cart">Cart</Link></li>
                        <CiSearch className="text-lg mt-1" />
                        <li><Link to="/search">Search</Link></li>
                    </div>
                    <div className="flex">
                        <IoPersonOutline className="text-lg mt-1 ml-2 cursor-pointer" />
                        <div onClick={() => setOpen(!open)} className="ml-2 cursor-pointer">
                            Login
                        </div>
                    </div>
                </ul>
                {open && (
                    <div className="absolute top-30 right-20 w-64 h-50 bg-white shadow-lg rounded-md z-40 p-4">
                        <button className="mt-8 p-2 bg-gray-800 w-full rounded-md">Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
};
