import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCart } from "@/context/cartContext";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const { state, dispatch } = useCart();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        console.log('data:',data)

      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    fetchProduct();

  }, [id]);

  const addToCart = (product) => {
    // Check if the product already exists in the cart
    const existingItem = state.cart.find((item) => item.id === product.id);

    if (existingItem) {
      // If the product already exists, update its quantity
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: product.id, quantity: existingItem.quantity + 1 } });
    } else {
      // If the product doesn't exist, add it to the cart
      const newItem = { ...product, quantity: 1 };
      dispatch({ type: 'ADD_TO_CART', payload: newItem });
    }
  };

  return (
    <>
      <div className="w-full md:w-8/12 mx-2 md:mx-auto mt-5">
        <h1 className="bg-gray-200 font-bold p-3 mt-2 w-full">Product Details</h1>
        <div className="mt-3 py-2 grid gap-2 md:gap-5 grid-cols-1 md:grid-cols-2 w-full">
          <div className="">
            <img src={product.image} className="w-[300px] h-[300px]" />
          </div>

          <div className="">
            <b>Name:</b> <span className="text-gray-600"> {product.title} </span><br />
            <b>Category:</b> <span className="text-gray-600"> {product.category} </span><br />
            <b>Desc:</b>  <span className="text-gray-600"> {product.description}</span> <br />
            <b>Price:</b>   <span className="text-gray-600">$ {product.price}</span> <br />

            <div className="py-2">
              <button type="button" onClick={() => addToCart(product)} className="bg-red-800 hover:bg-red-700 p-2 rounded text-gray-100 focus:outline-none focus:ring-5 focus:ring-blue-700">Add to cart</button>
              <Link href="/" passHref>
                <button type="button" className="bg-blue-800 hover:bg-blue-700 p-2 rounded text-gray-100 ml-3">Back to Shop</button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
