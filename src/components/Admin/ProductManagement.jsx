import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import AddProductPage from './AddProductPage';

function ProductManagement() {

    const [products, setProducts] = useState([]);
    
    const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    setProducts(data);
  };

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json"
      }
    };

    await fetch(`http://localhost:3000/api/products/${productId}`, config);
    fetchProducts(); // refresh list
  }
        console.log(`Deleting product with ID: ${productId}`);
    };
    
    useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
      <div className='max-w-7xl mx-auto p-6'>
          <h2 className="text-2xl font-bold mb-6">
              Product Management
          </h2>
          <AddProductPage/>
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <table className="min-w-full text-left text-gray-500">
                  <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                      <tr>
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Price</th>
                          <th className="py-3 px-4">SKU</th>
                          <th className="py-3 px-4">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {products.length > 0 ? (
                          products.map((product) => (
                              
                              <tr key={product._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
                                  <td className="p-4">${product.price}</td>
                                  <td className="p-4">{product.sku}</td>
                                  <td className="p-4">
                                      <Link
                                          to={`/admin/products/${product._id}/edit`}
                                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2">
                                          Edit
                                      </Link>

                                      <Link
                                          onClick={() => handleDelete(product._id)}
                                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                                          Delete
                                      </Link>
                                  </td>
                              </tr>
                          ))
                      ) : (
                              <tr>
                                  <td colSpan="4" className="p-4 text-center text-gray-500">
                                      No products found.
                                  </td>
                          </tr>
                  
                      )
                    }
                  </tbody>
              </table>
          </div>
          
    </div>
  )
}

export default ProductManagement