import { useState ,useEffect} from 'react';
import { useCart } from '@/context/cartContext';
import Image from 'next/image';
import Link from "next/link";

export default function Home() {
    const [products, setProducts] = useState([]);
    const { state, dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const countSelectedItems = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const addToCart = (product) => {
    // Check if the product already exists in the cart
    const existingItem = state.cart.find(item => item.id === product.id);

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
    <main>
      <div className="container w-full md:w-8/12 mx-2 md:mx-auto mt-5">
        <div className="mt-3 grid gap-2 md:gap-12 grid-cols-2 md:grid-cols-3 w-full mb-5">
          {products.map((product, index) => (
            <div key={index} className="p-2 bg-gray-100 shadow-lg w-[180px] h-auto md:w-[230px] md:h-auto ">

              <Link href={`/product/${product.id}`} >
                   <img src={product.image} className="w-full h-[250px] " />
              </Link>

              <p className="w-full p-2">
                {product.title}
              </p>

              <b className="p-2">
                ${product.price.toLocaleString("en-US")} 
              </b>

              <div className="p-2">
                <button type="button" onClick={()=>addToCart(product)} className="bg-red-800 hover:bg-red-700 p-2 rounded text-gray-100 focus:outline-none focus:ring-5 focus:ring-blue-700">Add to cart</button>
                <Link href={`/product/${product.id}`} type="button" className="hidden md:inline-block bg-blue-800 hover:bg-blue-700 p-2 rounded text-gray-100 ml-3">View</Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
