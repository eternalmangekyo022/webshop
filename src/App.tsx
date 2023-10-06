import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './assets/Cart.svg'

// https://fakestoreapi.com/products
// https://fakestoreapi.com/products/:id
// https://fakestoreapi.com/products?limit=8

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [active, setActive] = useState(false);
  const [price, setPrice] = useState(0);
  const pages = [Home(), Products()];

  
  useEffect(() => {
    const getPrice = () => {
      let final = 0;
      cart.forEach(i => final += i.price)
      return final;
    }

    setPrice(getPrice())
  }, [cart])


  return <div className='w-screen h-screen relative bg-gray-400'>
    <header className='w-full h-20 bg-gray-600 flex items-center justify-evenly'>
      <button onClick={() => setIndex(0)} className='text-white text-xl tracking-widest'>Home</button>
      <button onClick={() => setIndex(1)} className='text-white text-xl tracking-widest'>Products</button>
      <div className='group relative w-30 h-30 cursor-pointer' onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
        <img src={Cart} width='50' height='50' alt="" />
        <span className='absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 bg-green-400 opacity-50 rounded-md text-center px-2 transition-[.2s] group-hover:opacity-0 select-none'>{price}$</span>
        <div className='opacity-0 transition-[.3s] ease-in group-hover:opacity-100 absolute w-44 h-72 bg-white rounded-md'></div>
      </div>
    </header>
    {pages[index]}
  </div>
}