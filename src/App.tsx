
import { Route, Routes } from 'react-router-dom'
import Home from './pages'
import AboutPage from './pages/About'
import ProductsPage from './pages/Products'
import ProductPage from './pages/Product'
import Navbar from './layout/Navbar'


const App= () => {

  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path='/products/:id' element={<ProductPage />} />
      <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  )
}

export default App
