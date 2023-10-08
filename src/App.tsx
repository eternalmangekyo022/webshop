import { useState, useEffect, useRef } from 'react'
import Products from './pages/Products'
import Cart from './assets/Cart.svg'
import Trash from './assets/Trash.svg'
// import samples from '../sample.json'

// https://fakestoreapi.com/products
// https://fakestoreapi.com/products/:id
// https://fakestoreapi.com/products?limit=8

export default function App() {
  const [cart, setCart] = useState<{ product: Product, amount: number }[]>([]);
  const [price, setPrice] = useState('0');
  const [dollar, setDollar] = useState<{ x: number, y: number } | null>(null);
  const timeout = useRef<number | null>(null);

  function formatTitle(original: string): string {
    const MAX = 25
    return original.length > MAX ? original.slice(0, MAX).trim() + '...': original
  }
  
  useEffect(() => {
    const getPrice = () => {
      let final = 0;
      cart.forEach(({ product: { price }, amount }) => final += price * amount)
      return final.toFixed(2);
    }

    setPrice(getPrice())
  }, [cart])


  return <div className='w-screen h-screen relative bg-gray-400 overflow-hidden'>
    {dollar && <div className='dollar absolute z-10 select-none text-green-500 font-bold text-4xl' style={{ left: dollar.x + 'px', top: dollar.y + 'px' }}>$</div> }
    <header className='w-full h-20 bg-gray-600 flex items-center justify-evenly'>
      <div className='group relative w-30 h-30 cursor-pointer'>
        <img src={Cart} width='50' height='50' alt="" />
        <span style={{ backgroundColor: cart.length ? 'rgb(74, 222, 128)': '#FFCC70' }} className='absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 opacity-50 rounded-md text-center px-2 transition-[.2s] group-hover:opacity-0 select-none'>{cart.length ? '$' + price: 'Empty'}</span>
        <div className='cursor-default overflow-y-auto opacity-0 transition-[.3s] ease-in group-hover:opacity-100 absolute w-[25rem] h-0 group-hover:h-72 bg-white rounded-md border-2 border-black z-10 max-h-72 -left-40'>
          {/**ide jon minden cart item */}
          {cart.length < 1 ? <span className='text-gray-500 font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-75 select-none'>No items yet!</span>: <>{cart.map(({ product: { price: _price, title }, amount }, idx) => 
            <div className='w-full h-20 border-b-2 flex justify-center items-center relative select-none'>
              <div className='absolute h-6 w-32 border-2 left-1/2 top-[65%] -translate-x-1/2 flex justify-center items-center'>
                <button className='w-1/3' disabled={amount === 1} onClick={() => setCart(prev => prev.map((i, index) => index === idx ? {...i, amount: amount - 1}: i))}>-</button>
                <span className='w-1/3 text-center'>{amount}</span>
                <button className='w-1/3' onClick={() => setCart(prev => prev.map((i, index) => index === idx ? {...i, amount: amount + 1}: i))}>+</button>
              </div>
              <span className='absolute left-3 font-bold text-green-700'>{(_price * amount).toFixed(2)}$</span>
              <span>{formatTitle(title)}</span>
              <img className='absolute right-10 cursor-pointer' onClick={() => setCart((prev) => prev.filter((_, _idx) => _idx !== idx))} src={Trash} width='30' alt="" />
            </div>
          )}</>}
        </div>
      </div>
    </header>
    <Products animateTo={(x, y) => {
      if(dollar) {setDollar(null); clearTimeout(timeout.current!)}
      setDollar({ x, y })
      timeout.current = setTimeout(() => setDollar(null), 1000)
    }} addToCart={(product: Product) => setCart(prev => prev.map(i => i.product.id).includes(product.id) ? prev.map(i => i.product.id === product.id ? { ...i, amount: i.amount + 1 }: i): [...prev, { product, amount: 1 }])}/>
  </div>
}