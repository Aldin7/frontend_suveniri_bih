import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Checkout() {

    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Paypal");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const shippingInfo=JSON.parse(localStorage.getItem("shippingInfo")) || [];
        
         console.log(cartItems);
         console.log(shippingInfo);
        

        if(!token) {
            toast.error("You must be logged in to place an order");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:3000/api/orders",
                {
                    cartItems, // array iz korpe 
                    shippingInfo: {
                        fullName, address, city, postalCode, country, phone
                    }, // ime, adresa, telefon 
                    paymentMethod, // npr. "Cash on delivery"
                   
                },
                { headers: { Authorization: `Bearer ${token}` } } // localStorage token is used for auth
            );

            toast.success("Order placed successfully!");
            navigate(`/order-confirmation/${res.data._id}`);
        } catch (error) {
            toast.error("Order failed");
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="Paypal">Paypal</option>
                    <option value="CreditCard">Credit Card</option>
                    <option value="Cash On Delivery">Cash on Delivery</option>
                </select>

                <button
                    type="submit"
                    className="bg-black text-white py-2 px-6 rounded hover:bg-gray-900"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
}

export default Checkout;
