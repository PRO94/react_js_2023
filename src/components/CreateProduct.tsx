import React, { useState } from "react"
import { IProduct } from "../models"
import axios from "axios"
import { ErrorMessage } from "./ErrorMessage"

const productData : IProduct = {
    title: '',
    price: 33.3,
    description: 'Just added product',
    image: 'https://i.pravatar.cc',
    category: 'some category',
    rating: {
        rate: 5,
        count: 100
    }
}

export function CreateProduct() {

    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()  // prevent auto-refreshing a page when the form is submitted
        setError('')
        
        if (value.trim().length === 0) {
            setError('Please enter valid product title')
            return
        }

        productData.title = value
        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <form onSubmit={ submitHandler }>
            <input
                type="text"
                className="border py-2 px-4 mb-2 w-full outline-0" 
                placeholder="Enter product name..."
                value={ value }
                onChange={ changeHandler }
            />

            {error && <ErrorMessage error={ error } /> }

            <button
                type="submit"
                className="py-2 px-4 border bg-yellow-400 hover:text-white"
            >
                Create
            </button>
        </form>
    )
}