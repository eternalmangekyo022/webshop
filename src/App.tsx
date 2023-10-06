import { useState, useEffect } from 'react'
import Home from './pages/Home'
import axios from 'axios'

// https://fakestoreapi.com/products
// https://fakestoreapi.com/products/:id
// https://fakestoreapi.com/products?limit=8

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [index, setIndex] = useState<number>(0);
  const pages = [Home()];

  useEffect(() => {
    async function onLoad(): Promise<void> {
      const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products', { headers: { 'Content-Type': 'application/json' } })
      setProducts(data);
    }
    onLoad();
  }, [])

  return <div className='w-screen h-screen relative bg-gray-400'>
    <header className='w-full h-20 bg-gray-600'>
      
    </header>
    {pages[index]}
  </div>
}