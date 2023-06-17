import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "@/context/cartContext";

const Cart = () => {
  const { state, dispatch } = useCart();
  const cartItems = state.cart;

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
     
     if(quantity==0){
          quantity=1;
     }

    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const countSelectedItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const total = () =>{
    const total = state.cart.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);  

    return total;
  }

  return (
    <>
      <div className="mx-2 md:mx-auto md:w-8/12 my-5">
        <div className="md:flex justify-between">
          <div className="w-full md:w-7/12">
            <h1 className="p-3 bg-gray-100 font-bold">Cart Items</h1>
            <div className="mt-2 flex-col mx-auto">
              {cartItems.length > 0 ? (
                cartItems.map((product) => (
                  <div
                    className="bg-gray-100 mx-auto mt-3 px-3 py-2 flex justify-between"
                    key={product.id}
                  >
                    <div className="flex">
                      <img
                        src={product.image}
                        className="w-[50px] h-[50px]"
                        alt="Product"
                      />
                      <p className="px-2 text-gray-600">
                        {product.title.substring(0, 20)}... <br />
                        <b>$ {(product.price * product.quantity).toLocaleString("en-US")} </b>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex">
                        <button
                          onClick={() => updateQuantity(product.id, product.quantity - 1)}
                          className="bg-gray-300 hover:bg-gray-200 h-[25px] rounded px-3 mr-1"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={product.quantity}
                          className="w-[35px] h-[25px] bg-gray-100 focus:outline-none"
                          readOnly
                        />
                        <button
                          onClick={() => updateQuantity(product.id, product.quantity + 1)}
                          className="bg-gray-300 hover:bg-gray-200 h-[25px] rounded px-3 ml-1"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="bg-red-600 hover:bg-red-500 text-white py-1 px-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-100 mt-3 px-3 py-2">
                  <p className="">Cart is Empty</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 md:mt-0 w-full md:w-4/12">
            <h1 className="p-3  bg-gray-100 font-bold">Cart Summary</h1>
            <div className=" bg-gray-100 mt-2 p-3">
              <b>Total Items:</b> <span className="text-gray-600"> {countSelectedItems()} </span><br />
              <b>Total Amount:</b> <span className="text-gray-600"> $ {total()} </span><br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;