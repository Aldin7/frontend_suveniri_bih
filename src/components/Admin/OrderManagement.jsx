import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';


function OrderManagement(){
  const [statusFilter, setStatusFilter] = useState("All");
  const [orders, setOrders] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));


  useEffect(() => {
    const fetchOrders = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      try{
      const res = await axios.get("http://localhost:3000/api/orders/all", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      setOrders(res.data);
      console.log("Fetched orders:", res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
    };
    fetchOrders();
  }, []);


    /*const handleStatusChange = (orderId, status) => {
        // Handle status update logic here
        console.log(`Updating order ${orderId} status to ${status}`);*/

    const handleStatusChange = async (orderId, status) => {
    //const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
      await axios.put(
        `http://localhost:3000/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          }
        }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }

    console.log("User info:", userInfo);

  };
    
    
  return (
      <div className='max-w-7xl mx-auto p-6'>
          <h2 className="text-2xl font-bold mb-6">
              Order Management 
          </h2>
          <div className="overflow-x-auto shadow-md sm:rounded-lg ">
              <table className="min-w-full text-left text-gray-500">
                  <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                      <tr>
                          <th className="py-3 px-4">Order ID</th>
                          <th className="py-3 px-4">Customer</th>
                          <th className="py-3 px-4">Total Price</th>
                          <th className="py-3 px-4">Status</th>
                          {userInfo?.user?.isAdmin && (
                          <th className="py-3 px-4">Actions</th>
                          )}
                      </tr>
                  </thead>
                  <tbody>
                      {orders.length > 0 ? (
                          orders.map((order) => (
                              <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                                      #{order._id}
                                  </td>
                                  <td className="py-4">{order.user}</td>
                                  <td className="py-4">{order.totalPrice}</td>
                                  <td className="py-4">
                                    {userInfo?.user?.isAdmin ? (
                                      <select
                                          value={order.status}
                                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                      >
                                          <option value="Processing">Processing</option>
                                          <option value="Shipped">Shipped</option>
                                          <option value="Shipped">Delivered</option>
                                          <option value="Cancelled">Cancelled</option>
                                          
                                        </select>
                                    ):(
                                        <span>{order.status}</span>
                                    )}
                                  </td>
                                  <td className="py-4">
                                      <button
                                          onClick={() => handleStatusChange(order._id, "Delivered")}
                                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-graan-600"
                                      >
                                          Mark as Delivered
                                        </button> 
                                  </td>
                              </tr>
                          ))
                      ) : (
                          <tr>
                                  <td colSpan="5" className='p-4 text-center text-gray-500'>
                                      No orders found. 
                                  </td>
                          </tr>
                      )
                      }
                  </tbody>
              </table>
          </div>
    </div>
  )
};

export default OrderManagement