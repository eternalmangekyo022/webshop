import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Products() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		async function onLoad(): Promise<void> {
			const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products', { headers: { 'Content-Type': 'application/json' } })
			setProducts(data);
		}
		onLoad();
	}, [])
	return <div className='relative left-1/2 top-10 -translate-x-1/2 w-[90%] h-[80%] bg-white rounded-xl flex gap-6 flex-wrap items-center justify-evenly overflow-y-scroll'>
		{products.map(({ category, description, id, image, price, rating, title }) => 
			<div className='w-[30rem] h-72 rounded-md mt-10' key={id}>
				<div className='w-full h-[70%] flex justify-center items-center'>
					<img src={image} width='120' alt="" />
				</div>
				<div className='w-full h-[30%] flex flex-col items-start'>
					<span className='font-bold'>{title}</span>
					<span>{category}</span>
					<span className='flex justify-center items-center'>
						{rating.rate} 
						<img className='inline ml-2' src="https://www.svgrepo.com/show/513354/star.svg" width='20' alt="" />
						/ {rating.count}
					</span>
				</div>
			</div>
		)}
	</div>
}