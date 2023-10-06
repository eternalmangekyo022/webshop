import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './assets/Cart.svg'
import Trash from './assets/Trash.svg'
// import samples from '../sample.json'

// https://fakestoreapi.com/products
// https://fakestoreapi.com/products/:id
// https://fakestoreapi.com/products?limit=8

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [index, setIndex] = useState<number>(1);
  //const [active, setActive] = useState(false);
  const [price, setPrice] = useState('0');
  const pages = [Home(), Products()];

  function formatTitle(original: string): string {
    const MAX = 25
    return original.length > MAX ? original.slice(0, MAX).trim() + '...': original
  }
  
  useEffect(() => {
    const getPrice = () => {
      let final = 0;
      cart.forEach(i => final += i.price)
      return final.toFixed(3);
    }

    setPrice(getPrice())
  }, [cart])


  return <div className='w-screen h-screen relative bg-gray-400 overflow-hidden'>
    <header className='w-full h-20 bg-gray-600 flex items-center justify-evenly'>
      <button onClick={() => setIndex(0)} className='text-white text-xl tracking-widest'>Home</button>
      <button onClick={() => setIndex(1)} className='text-white text-xl tracking-widest'>Products</button>
      <div className='group relative w-30 h-30 cursor-pointer' /* onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} */>
        <img src={Cart} width='50' height='50' alt="" />
        <span style={{ backgroundColor: cart.length ? 'rgb(74, 222, 128)': '#FFCC70' }} className='absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 opacity-50 rounded-md text-center px-2 transition-[.2s] group-hover:opacity-0 select-none'>{cart.length ? price + '$': 'Empty'}</span>
        <div className='overflow-y-auto opacity-0 transition-[.3s] ease-in group-hover:opacity-100 absolute w-[25rem] h-0 group-hover:h-72 bg-white rounded-md border-2 border-black z-10 max-h-72 -left-40'>
          {/**ide jon minden cart item */}
          {cart.length < 1 ? <span className='text-gray-500 font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-75 select-none'>No items yet!</span>: <>{cart.map(({ id, image, price: _price, category, title }) => 
            <div className='w-full h-20 border-b-2 flex justify-center items-center relative select-none'>
              <span className='absolute left-3 font-bold text-green-700'>{_price}$</span>
              <span>{formatTitle(title)}</span>
              <img className='absolute right-10' onClick={() => setCart(prev => prev.filter(i => i.id !== id))} src={Trash} width='30' alt="" />
            </div>
          )}</>}
        </div>
      </div>
    </header>
    {pages[index]}
  </div>
}