import React from 'react'
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';


function Navbar() {

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = React.useState(false);
    const navigate = useNavigate();
    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    }

    /**
     * Toggle the open state of the cart drawer
     */
    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    const [cartCount, setCartCount] = React.useState(0);
    React.useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || { products: [] };
        const count = cart.products.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(count);
    }, []);

    return (
        <>
            <div className='border-b border-gray-200' style={{ backgroundColor: "#6a6f90ff" }}>
                <nav className=' border-b border-gray-200 bg-white container mx-auto flex items-center justify-between py-4 px-6' style={{ backgroundImage: "url(https://scontent.fsjj2-1.fna.fbcdn.net/v/t39.30808-6/477789652_1159741149191174_7840764988393435241_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=qc3d8rRU5rQQ7kNvwGl2Qv0&_nc_oc=AdkNVwBcQMjpph-CsxPSGYWL3QihKeoF2IqCwVbirDd8fzx-hZ8cWDADQXWDu2gC1FhLm40euOf5eMwmYgH5d8sv&_nc_zt=23&_nc_ht=scontent.fsjj2-1.fna&_nc_gid=SbXN8WFWFBWx6ZzUeon9ng&oh=00_AfhkFUh9VmbLD-g6FpUtv1Ts7CSB88JtJlymbPFtWeMQxw&oe=691F8CAF)", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div>
                        <Link to='/' className='text-2xl font-medium'>
                            <b>Souvenir sales</b>
                            {/* <img src={logo} alt="hh" className='w-18 h-18' /> */}
                        </Link>
                    </div>                    

                    {/* Right icons */}
                    <div className="flex items-center space-x-4">
                        <Link to="/suveniri" className='block bg-black px-2 rounded text-sm text-white'>
                            Suveniri
                        </Link>
                        <Link to="/login" className='block bg-black px-2 rounded text-sm text-white'>
                            Log in
                        </Link>
                        <Link to="/register" className='block bg-black px-2 rounded text-sm text-white'>
                            Register
                        </Link>
                        {/*<Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>
                            Admin
                        </Link>*/}
                        <Link to="/profile" className='hover:text-black'>
                            <HiOutlineUser className='h-6 w-6 text-gray-700' />
                        </Link>
                        {/* shopping bang icon */}
                        <button onClick={toggleCartDrawer} className=' relative hover:text-black'>
                            <HiOutlineShoppingBag className=' h-6 w-6 text-gray-700' />
                            <span className='absolute -top-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs rounded-full px-2 py-0.5'>{cartCount}</span>
                        </button>

                        {/* Saerch */}
                        <div className='overflow-hidden'>
                            <SearchBar />
                        </div>

                        <button onClick={toggleNavDrawer} className="md:hidden">
                            <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
                        </button>
                        {localStorage.getItem("userInfo") ? <button onClick={() => { localStorage.removeItem("userInfo"); navigate("/login"); }} className='block bg-red-600 px-2 rounded text-sm text-white' >
                            Log Out 
                        </button> : null}
                        {localStorage.getItem("userInfo") ? " Pozdrav " + JSON.parse(localStorage.getItem("userInfo")).user.name : ""}
                    </div>
                    <div>
                        <button onClick={() => i18n.changeLanguage('bs')} className=' relative hover:text-black'> Bosanski </button>
                        <span> / </span>
                        <button onClick={() => i18n.changeLanguage('en')} className=' relative hover:text-black'> English </button>
                    </div>

                </nav>
            </div>
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

            {/* Mobile Navigation */}
            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transistion-transform duration-300 z-50 ${navDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flew justify-end p-4">
                    <button onClick={toggleNavDrawer}>
                        <IoMdClose className='h-6 w-6 text-gray-600'></IoMdClose>
                    </button>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4"></h2>

                    <nav className="space-y-4">
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Men</Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Women</Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Top Wear</Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Bottom Wear</Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar