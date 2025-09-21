
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages'
import AboutPage from './pages/About'
import ProductsPage from './pages/Products'
import ProductPage from './pages/Product'
import LoginPage from './pages/LoginPage'
import AppLayout from './layout/AppLayout'
import CookiesService from './services/CookiesService'


const App= () => {
const token = CookiesService.getCookie('jwt')

  return (
    <>
      <Routes>
      <Route path="/" element={<AppLayout />} >
      <Route index element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path='/products/:id' element={<ProductPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage  isAuthenticated={token}/>}  />
      </Route>
      </Routes>
    </>
  )
}

export default App
