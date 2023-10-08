import { useEffect, useState } from 'react'
//import axios from 'axios'
import Cart from '../assets/CartBuy.svg'
import sample from '../../sample.json'

interface Props {
	addToCart: (product: Product) => void;
	animateTo: (x: number, y: number) => void
}

export default function Products({ addToCart, animateTo }: Props) {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		/**async function onLoad(): Promise<void> {
			const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products', { headers: { 'Content-Type': 'application/json' } })
			setProducts(data);
		} */
		//onLoad();
		setProducts(sample)
	}, [])
	return <div className='relative left-1/2 -translate-x-1/2 w-[90%] h-full bg-white rounded-xl flex gap-6 flex-wrap items-center justify-evenly overflow-y-scroll'>
		{products.map(({ category, id, image, price, rating, title }: Product, idx: number) => 
			<div className='w-[30rem] h-72 rounded-md mt-10' key={id}>
				<div className='w-full h-[70%] flex justify-center items-center'>
					<img src={image} width='120' alt="Image for" className='hover:w-[140px] transition-[.2s] cursor-pointer' />
				</div>
				<div className='w-full h-[30%] flex flex-col items-start'>
					<span className='font-bold'>{title}</span>
					<span>{category}</span>
					<span className='flex justify-between items-center relative w-full h-10'>
						<span>
							{rating.rate} 
							<img className='inline ml-2' src="https://www.svgrepo.com/show/513354/star.svg" width='20' alt="" />
							/ {rating.count}
						</span>
						<button onClick={({ pageX: x, pageY: y }) => {
							addToCart(products[idx])
							animateTo(x, y)
						}} className='w-fit h-10 select-none border-2 rounded-xl border-lime-600 transition-[.2s] hover:bg-lime-300 hover:h-14 overflow-x-none group relative'>
							<span className='relative p-4 transition-[.2s] group-hover:opacity-0'>${price}</span>
							<img className='flex justify-center items-center font-bold text-3xl opacity-0 group-hover:opacity-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' src={Cart} width='30' alt='Cart' />
						</button>
					</span>
				</div>
			</div>
		)}
		<div className='w-full h-44'></div>
	</div>
}