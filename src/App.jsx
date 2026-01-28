import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Register from './pages/Register';
import CollectionPage from './pages/CollectionPage';
import Profile from './pages/Profile';
import ProductDetails from './components/Products/ProductDetails';
import Checkout from './components/Cart/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/Admin/UserManagement';
import ProductManagement from './components/Admin/ProductManagement';
import EditProductPage from './components/Admin/EditProductPage';
import OrderManagement from './components/Admin/OrderManagement';
import SuveniriList from './components/SuveniriList';
import SearchBar from './components/Common/SearchBar';
import { Provider } from 'react-redux';
import store from './redux/store';
import ContactForm from './components/Common/ContactForm';
import ProductGrid from './components/Products/ProductGrid';
import '../i18n';
import CartProvider from './components/Layout/CartContext';


function App() {
  return (
    <CartProvider>
    <Provider store={store}>
    <BrowserRouter>
    <Toaster position='top-right' />
      <Routes>
        <Route path="/" element={<UserLayout />} >
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='collections/:collection' element={<CollectionPage />} />
          <Route path='product/:id' element={<ProductDetails />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='order-confirmation' element={<OrderConfirmationPage />} />
          <Route path='order/:id' element={<OrderDetailsPage />} />
          <Route path='my-orders' element={<MyOrdersPage />} />
          <Route  path='suveniri' element={<SuveniriList />} />
          <Route  path='search' element={<SearchBar/>} />
          <Route path='contact' element={<ContactForm />} />
          <Route path='similarproducts' element={<ProductGrid />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
        
      </Routes>
      </BrowserRouter>
      </Provider>
      </CartProvider>
  );
}

export default App;