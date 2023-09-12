import { useEffect, useState } from 'react';
import { Product } from './components/Product'
import { IProduct } from './models';
import axios, { AxiosError } from 'axios';

function App() {

  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchProducts() {
    setLoading(true)
    try {
      setError('')
      const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products?limit=20')
      setProducts(response.data)
    } catch(e) {
      const error = e as AxiosError
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className='container mx-auto max-w-2xl pt-5'>
      {loading && <p className='text-center'>Loading...</p>}
      {error && <p className='text-center text-red-600'>{ error }</p>}
      { products.map(product => <Product product={product} key={product.id}></Product>) }
    </div>
  )
}

export default App;