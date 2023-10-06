import { useEffect } from 'react'

export default function App() {
	useEffect(() => { console.log(' f') }, [])

	return <>Home</>
}