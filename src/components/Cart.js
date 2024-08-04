import { useSelector } from "react-redux";
import { MenuCard } from "./MenuCard";
import { RiH1 } from "react-icons/ri";

export const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const totalPrice = cartItems.reduce((total, item) => {
        const cleanedPrice = item.price.replace(/[^0-9.-]+/g, '');
        const itemPrice = parseFloat(cleanedPrice);
        const itemQuantity = parseInt(item.quantity, 10);

        return total + (!isNaN(itemPrice) && !isNaN(itemQuantity) ? itemQuantity * itemPrice : 0);
    }, 0);

    

    return (
        <div className="flex justify-center items-center text-xl">
            <div className="rounded-md p-8 justify-center items-center">
                <h1 className="font-bold text-2xl text-center underline decoration-orange-500">Cart</h1>
                {cartItems && cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((item, idx) => (
                            <div key={idx} className="flex justify-center items-center p-2 space-x-2">
                                <MenuCard
                                    name={item.name}
                                    price={`₹ ${item.price}`}
                                    image={item.image}
                                    quantity={item.quantity}
                                    description=""
                                />
                            </div>
                        ))}
                        <div className="ml-4 border-2 border-white w-[400px] px-2 py-1 bg-orange-500 rounded-md border-hidden mt-2 cursor-pointer text-center">
                            <div>
                                Checkout
                            </div>
                        </div>
                        <div className="text-center text-xl font-semibold mt-4">
                            Total Price: ₹ {totalPrice.toFixed(2)}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <div className="p-4">
                            <img
                                src="https://t3.ftcdn.net/jpg/06/47/98/46/360_F_647984617_20NcWOfvlkctAKp9uHUk870m6iGMS6h2.jpg"
                                className="h-60 w-60 object-cover rounded-full overflow-hidden"
                                alt="Empty Cart"
                            />
                            <div className="text-center text-xl font-semibold mt-4">
                                Your Cart is Empty
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
