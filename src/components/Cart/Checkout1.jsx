import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import axios from "axios"; 
import { toast } from "sonner";

 /*const cart = {
        products: [s
            {
                name: "Stylish Jacket",
                size: "M",
                color: "Black",
                price: 59.99,
                image: "https://picsum.photos/200?random=1",
            },
            {
                name: "Running Shoes",
                size: "10",
                color: "Blue",
                price: 89.99,
                image: "https://picsum.photos/200?random=2",
            },
        ],
        totalPrice: 149.98,
}*/

const [cart, setCart] = useState({ products: [], totalPrice: 0 });

useEffect(() => {
  axios.get("http://localhost:3000/api/cart", { withCredentials: true })
    .then(res => setCart({
      products: res.data.items.map(item => ({
        name: item.product.name,
        size: item.size,
        color: item.color,
        price: item.product.price,
        image: item.product.images[0]?.url,
        quantity: item.quantity,
      })),
      totalPrice: res.data.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    }))
    .catch(err => console.error(err));
}, []);


function Checkout() {
    
    const navigate = useNavigate();
    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });


    const handleCreateCheckout = (e) => {
        e.preventDefault();
        setCheckoutId(123);
    }

    const handlePaymentSuccess = (details) => {
        console.log("Payment Successful", details);

        navigate('/order-confirmation');
    }

  return (
      <div className="grid grid-col-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tight">
          {/* Left Section  */}
{/* Left Section - Formulaire de paiement */}
<div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
        CHECKOUT
    </h2>
    
    <form onSubmit={handleCreateCheckout} className="space-y-6">
        {/* Contact Details */}
        <div className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <span className="mr-2">📧</span> Contact Details
            </h3>
            <div className="relative">
                <input
                    type="email"
                    id="email"
                    value={shippingAddress.email}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                    className="w-full px-5 py-4 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-gray-50 rounded-t-lg transition-all duration-300"
                    disabled
                    placeholder=" "
                />
                <label 
                    htmlFor="email" 
                    className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none"
                >
                    Email Address
                </label>
            </div>
        </div>

        {/* Delivery Information */}
        <div className="space-y-5 pt-2">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <span className="mr-2">🚚</span> Delivery Information
            </h3>
            
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                    <input
                        value={shippingAddress.firstName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                        type="text"
                        className="w-full px-5 py-4 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-gray-50 rounded-t-lg transition-all duration-300"
                        required
                        placeholder=" "
                    />
                    <label className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none">
                        First Name
                    </label>
                </div>
                <div className="relative">
                    <input
                        value={shippingAddress.lastName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                        type="text"
                        className="w-full px-5 py-4 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-gray-50 rounded-t-lg transition-all duration-300"
                        required
                        placeholder=" "
                    />
                    <label className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none">
                        Last Name
                    </label>
                </div>
            </div>

            {/* Address */}
            <div className="relative">
                <input
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    type="text"
                    className="w-full px-5 py-4 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-gray-50 rounded-t-lg transition-all duration-300"
                    required
                    placeholder=" "
                />
                <label className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none">
                    Street Address
                </label>
            </div>

            {/* City & Postal Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                    <input
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        type="text"
                        className="w-full px-5 py-4 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-gray-50 rounded-t-lg transition-all duration-300"
                        required
                        placeholder=" "
                    />
                    <label className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none">
                        City
                    </label>
                </div>
                <div className="relative">
                    <input
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                        type="text"
                        className="w-full px-5 py-4 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-gray-50 rounded-t-lg transition-all duration-300"
                        required
                        placeholder=" "
                    />
                    <label className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none">
                        Postal Code
                    </label>
                </div>
            </div>

            {/* Country & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                    <input
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        type="text"
                        className="w-full px-5 py-4 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-gray-50 rounded-t-lg transition-all duration-300"
                        required
                        placeholder=" "
                    />
                    <label className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none">
                        Country
                    </label>
                </div>
                <div className="relative">
                    <input
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        type="text"
                        className="w-full px-5 py-4 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-gray-50 rounded-t-lg transition-all duration-300"
                        required
                        placeholder=" "
                    />
                    <label className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none">
                        Phone Number
                    </label>
                </div>
            </div>
        </div>

        {/* Payment Button */}
        <div className="pt-6">
            {!checkoutId ? (
                <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-500 transform hover:-translate-y-1 font-medium text-lg"
                >
                    Continue to Payment →
                </button>
            ) : (
                <div className="space-y-5 animate-fade-in">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                        <span className="mr-2">💳</span> Payment Method
                    </h3>
                    <div className="border border-gray-200 rounded-xl p-5 shadow-inner bg-gradient-to-br from-gray-50 to-white">
                        <PayPalButton
                            amount={100}
                            onSuccess={handlePaymentSuccess}
                            onError={(err) => alert("Payment failed, Try again")} 
                        />
                    </div>
                </div>
            )}
        </div>
    </form>
</div>
          {/* Right Section  */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg b-4">Order Summary</h3>
              <div className="border-t py-4 mb-4">
                  {cart.products.map((product, index) => (
                      <div key={index} className="flex items-start justify-between py-2 border-b">
                          <div className="flex items-start">
                              <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-20 h-20 object-cover mr-4" />
                              <div>
                                  <h3 className="text-md font-semibold">{product.name}</h3>
                                  <p className="text-sm text-gray-500">Size: {product.size}</p>
                                  <p className="text-sm text-gray-500">Color: {product.color}</p>
                              </div>
                          </div>
                        <p className="text-xl">${product.price?.toLocaleString()}</p>
                      </div>
                  ))}
              </div>
              <div className="flex justify-between items-center text-lg mb-4">
                <p>Subtotal</p>
                <p >${cart.total?.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center text-lg">
                  <p>Shipping</p>
                  <p>Free</p>
              </div>
              <div className="flex justify-between items-center text-lg mb-4 border-t pt-4">
                  <p>Total</p>
                  <p className="text-xl font-semibold">${cart.totalPrice?.toLocaleString()}</p>
              </div>
          </div>
    </div>
  )
}

export default Checkout