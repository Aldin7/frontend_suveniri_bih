import React, { useEffect, useState } from 'react';
import { RiDeleteBin3Line } from "react-icons/ri";
import axios from 'axios';

function CartContents() {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");
        console.log("Token u CartContents:", token);

        if (!token) { console.warn("Korisnik nije logiran — token je null."); return; }

        axios.get("http://localhost:3000/api/cart", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            console.log("Cart items:", res.data);
            setCartItems(res.data.items)
        })
          .catch(err => console.error(err));
    }, []);


    const handleRemove = async (item) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/api/cart/${item.productId}`, { headers: {
                Authorization: `Bearer ${token}`,
            } }); // filtriraj iz state-a
            setCartItems(prev => prev.filter(item => item.productId !== item.productId));
        } catch (error) { console.error("Greška kod brisanja artikla:", error); }
    };

    return (
        <div>
            {cartItems.map((item, index) => (
                <div key={index} className='flex items-start justify-between py-4 border-b'>
                    <div className='flex items-center'>
                        <img src={item.productId?.images[0]?.url} alt={item.productId?.name} className='w-20 h-24 object-cover mr-4 rounded' />
                        <div>
                            <h3>{item.productId?.name}</h3>
                            <p className='text-sm text-gray-500'>
                                size: {item.size} | color: {item.color}
                            </p>
                            <div className='flex items-center mt-2'>
                                <button className="border rounded px-2 py-1 text-xl font-medium">-</button>
                                <span className='mx-2'>{item.quantity}</span>
                                <button className="border rounded px-2 py-1 text-xl font-medium">+</button>

                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='font-medium'>$ {item.productId?.price.toLocaleString()}</p>
                        <button onClick={() => handleRemove(item.productId._id)} className='flex flex-col items-center mt-2'>
                            <RiDeleteBin3Line className='h-6 w-6 text-red-500' />
                            <p className="text-red-500 text-sm">Remove</p>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartContents