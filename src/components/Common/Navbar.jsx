import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {CartContext} from '../Layout/CartContext';
import { useContext } from "react";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = React.useState(false);
  const { t } = useTranslation();
  //const [cartCount, setCartCount] = React.useState(0);
  const navigate = useNavigate();

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const {cartCount}=useContext(CartContext);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        const products = res.data.products || [];
        const count = products.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(count);
      })
      .catch(err => console.error("Greška kod dohvaćanja korpe:", err));
  }, []);

  return (
    <>
      <div className='border-b border-gray-200' style={{ backgroundColor: "#6a6f90ff" }}>
        <nav className='border-b border-gray-200 bg-white container mx-auto flex items-center justify-between py-4 px-6'>
          <div>
            <Link to='/' className='text-2xl font-medium'>
              <b>{t('sales')}</b>
            </Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            <Link to="/suveniri" className='block bg-black px-2 rounded text-sm text-white'>Suveniri</Link>
            <Link to="/login" className='block bg-black px-2 rounded text-sm text-white'>{t('login')}</Link>
            <Link to="/register" className='block bg-black px-2 rounded text-sm text-white'>{t('register')}</Link>
            <Link to="/profile" className='hover:text-black'>
              <HiOutlineUser className='h-6 w-6 text-gray-700' />
            </Link>

            {/* Cart icon */}
            <button onClick={toggleCartDrawer} className='relative hover:text-black'>
              <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
              {cartCount > 0 && (
                <span className='absolute -top-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs rounded-full px-2 py-0.5'>
                  {cartCount}
                </span>
              )}
            </button>

            <div className='overflow-hidden'>
              <SearchBar />
            </div>

            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
            </button>

            {localStorage.getItem("userInfo") && (
              <button
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  navigate("/login");
                }}
                className='block bg-red-600 px-2 rounded text-sm text-white'
              >
                Log Out
              </button>
            )}
           {(() => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.user?.name ? `Pozdrav ${userInfo.user.name}` : "";
  } catch {
    return "";
  }
})()}

          </div>

          <div>
            <button onClick={() => i18n.changeLanguage('bs')} className='relative hover:text-black'>Bosanski</button>
            <span> / </span>
            <button onClick={() => i18n.changeLanguage('en')} className='relative hover:text-black'>English</button>
          </div>
        </nav>
      </div>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
    </>
  );
}

export default Navbar;