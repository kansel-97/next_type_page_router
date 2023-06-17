import Link from "next/link";
import { useContext } from "react";
import { useCart } from "@/context/cartContext";

const Header = () => {
  const { state } = useCart();

  const countSelectedItems = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="bg-gray-200 w-full">
      <div className="w-full md:w-8/12 mx-auto py-5">
        <h1 className="font-bolder px-4 font-bold">NEXT-TEST</h1>

        <div className="mt-3 p-4">
          <Link href="/" className="mr-3 hover:underline text-blue-500">Home</Link>
          <Link href="/cart" className="mr-3 hover:underline text-blue-500">
            Cart {countSelectedItems()}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;