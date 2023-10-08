import { useEffect, useState } from 'react'
import axios from 'axios'

interface Props {
	addToCart: (product: Product) => void;
}

export default function Products({ addToCart }: Props) {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		async function onLoad(): Promise<void> {
			const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products', { headers: { 'Content-Type': 'application/json' } })
			setProducts(data);
		}
		onLoad();
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
					<span className='flex justify-between items-center relative w-full'>
						<span>
							{rating.rate} 
							<img className='inline ml-2' src="https://www.svgrepo.com/show/513354/star.svg" width='20' alt="" />
							/ {rating.count}
						</span>
						<button onClick={() => addToCart(products[idx])} className='w-fit h-10 select-none border-2 rounded-xl border-lime-600 transition-[.2s] hover:bg-lime-50'><span className='p-4'>${price}</span></button>
					</span>
				</div>
			</div>
		)}
		<div className='w-full h-44'></div>
	</div>
}