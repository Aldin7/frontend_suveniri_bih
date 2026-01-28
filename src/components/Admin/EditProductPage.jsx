import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: [],
    material: [],
    gender: "",
    images: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await res.json();

        // Fallbacks to ensure arrays
        setProductData({
          ...data,
          sizes: Array.isArray(data.sizes) ? data.sizes : [],
          colors: Array.isArray(data.colors) ? data.colors : [],
          collections: Array.isArray(data.collections) ? data.collections : [],
          material: Array.isArray(data.material) ? data.material : [],
          images: Array.isArray(data.images) ? data.images : [],
        });
      } catch (error) {
        console.error("Greška kod dohvaćanja proizvoda:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validImages = productData.images.filter(img => img.url.trim() !== "");
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({ ...productData, images: validImages }),
    });
    if (res.ok) navigate("/admin/products");
  };

  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <Input label="Product Name" name="name" value={productData.name} onChange={handleChange} required />
        {/* Description */}
        <Textarea label="Description" name="description" value={productData.description} onChange={handleChange} required />
        {/* Price */}
        <Input label="Price" name="price" type="number" value={productData.price} onChange={handleChange} />
        {/* Discount Price */}
        <Input label="Discount Price" name="discountPrice" type="number" value={productData.discountPrice} onChange={handleChange} />
        {/* Count In Stock */}
        <Input label="Count in Stock" name="countInStock" type="number" value={productData.countInStock} onChange={handleChange} required />
        {/* SKU */}
        <Input label="SKU" name="sku" value={productData.sku} onChange={handleChange} required />
        {/* Category */}
        <Input label="Category" name="category" value={productData.category} onChange={handleChange} required />
        {/* Sizes */}
        <Input label="Sizes (comma-separated)" name="sizes" value={productData.sizes.join(", ")} onChange={(e) => setProductData({ ...productData, sizes: e.target.value.split(",").map(s => s.trim()) })} />
        {/* Colors */}
        <Input label="Colors (comma-separated)" name="colors" value={productData.colors.join(", ")} onChange={(e) => setProductData({ ...productData, colors: e.target.value.split(",").map(c => c.trim()) })} />
        {/* Image URLs */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Image URLs</label>
          {productData.images.map((image, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <input
                type="text"
                value={image.url}
                onChange={(e) => {
                  const updatedImages = [...productData.images];
                  updatedImages[index].url = e.target.value;
                  setProductData({ ...productData, images: updatedImages });
                }}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder={`Image ${index + 1} URL`}
              />
              <img src={image.url} alt={`Image ${index + 1}`} className="w-16 h-16 object-cover rounded-md shadow-md" />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setProductData({ ...productData, images: [...productData.images, { url: "" }] })}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            + Add another image
          </button>
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">
          Update Product
        </button>
      </form>
    </div>
  );
}

// Reusable input component
const Input = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div className="mb-6">
    <label className="block font-semibold mb-2">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md p-2"
      required={required}
    />
  </div>
);

// Reusable textarea component
const Textarea = ({ label, name, value, onChange, required = false }) => (
  <div className="mb-6">
    <label className="block font-semibold mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md p-2"
      rows={4}
      required={required}
    />
  </div>
);

export default EditProductPage;
