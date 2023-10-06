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
	return <>
	</>
}