import { useState } from 'react';
import { CreateProduct } from './components/CreateProduct';
import { ErrorMessage } from './components/ErrorMessage';
import { Loader } from './components/Loader';
import { Modal } from './components/Modal';
import { Product } from './components/Product'
import { useProducts } from './hooks/products';
import { IProduct } from './models';

function App() {

  const { products, error, loading, addProduct } = useProducts()
  const [ modal, setModal ] = useState(false)

  const createProductHandler = (createdProduct: IProduct) => {
    setModal(false)
    addProduct(createdProduct)
  }

  return (
    <div className='container mx-auto max-w-2xl pt-5'>
      { loading && <Loader/> }

      { error && <ErrorMessage error={ error }/> }

      { products.map(product => <Product product={product} key={product.id}></Product>) }

      { modal && 
        <Modal title='Create Product' onClose={ () => setModal(false) }>
          <CreateProduct onCreate={ createProductHandler } />
        </Modal> 
      }

      <button
        className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2'
        onClick={ () => setModal(true ) }
      >+</button>

    </div> 
  )
}

export default App;