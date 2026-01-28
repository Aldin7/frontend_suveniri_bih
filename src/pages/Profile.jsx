import React, { useState, useEffect } from 'react';
import MyOrdersPage from './MyOrdersPage';
import { useNavigate } from 'react-router-dom'; 

function Profile() {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const navigate = useNavigate();
    /*useEffect(() => {
        const fetchOrders = async () => {
            try {
                setTimeout(() => {
                    const mockOrders = [
                        {
                            _id: '1234',
                            createdAt: new Date(),
                            shippingAddress: { city: 'Paris', country: 'France' },
                            orderItems: [
                                { name: 'Robe été', image: 'https://picsum.photos/200/300?fashion=1' },
                                { name: 'Sandales', image: 'https://picsum.photos/200/300?shoes=1' }
                            ],
                            totalPrice: 149.99,
                            isPaid: true,
                            isDelivered: true
                        },
                        {
                            _id: '5678',
                            createdAt: new Date(Date.now() - 86400000),
                            shippingAddress: { city: 'Lyon', country: 'France' },
                            orderItems: [
                                { name: 'Veste en jean', image: 'https://picsum.photos/200/300?jacket=1' }
                            ],
                            totalPrice: 89.99,
                            isPaid: true,
                            isDelivered: false ,
                        }
                    ];
                    setOrders(mockOrders);
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);*/

    useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("userInfo"));
  if (storedUser && storedUser.user) {
    setUser(storedUser.user);
  } else {
    console.log("Nema korisničkih podataka u lokalnoj memoriji.");
    navigate("/login");
  }
}, [navigate]);
    //const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
  return <p>Učitavanje korisničkih podataka...</p>;
}
    return (
        
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Profil */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="relative">
                            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                                S
                            </div>
                            <span className="absolute bottom-0 right-0 h-5 w-5 bg-green-400 rounded-full border-2 border-white"></span>
                        </div>
                        
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                            <p className="text-gray-600">{user?.email}</p>
                            
                            <div className="mt-4 flex flex-wrap gap-4">
                                <div className="flex items-center text-sm">
                                    <svg className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {user?.phone}
                                </div>
                                
                                <div className="flex items-center text-sm">
                                    <svg className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {user?.address}
                                </div>
                            </div>
                        </div>
                        
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Navigation par onglets */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`${activeTab === 'orders' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            My Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('wishlist')}
                            className={`${activeTab === 'wishlist' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Wishlist
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`${activeTab === 'settings' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Account Settings
                        </button>
                    </nav>
                </div>

                {/* Contenu des onglets */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {activeTab === 'orders' && <MyOrdersPage orders={orders} loading={loading} />}
                    
                    {activeTab === 'wishlist' && (
                        <div className="p-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Your wishlist is empty</h3>
                            <p className="mt-1 text-sm text-gray-500">Save your favorite items here for easy access later.</p>
                        </div>
                    )}
                    
                    {activeTab === 'settings' && (
                        <div className="p-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Account Settings</h3>
                            <p className="mt-1 text-sm text-gray-500">Manage your account preferences and security settings.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;