import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IProduct } from "../models"

export function useProducts() {
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

    return { products, error, loading }
}