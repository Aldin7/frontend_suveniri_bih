// components/SuveniriList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const SuveniriList = () => {
  const [suveniri, setSuveniri] = useState([]);

  useEffect(() => {
    axios.get("/api/products")
      .then((res) => setSuveniri(res.data))
      .catch((err) => console.error("Greška:", err));
  }, []);

  return (
    <div className="flex-grow-0 p-4">
      <h2 className="text-2xl uppercase mb-4 text-center">Suveniri</h2>
      <br></br>
      <div className="grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" Style="display:flex; margin-right:10%;">
        {suveniri.map((item) => (
          <a className="block m-2" href={`/product/${item._id}`} key={item._id}>
            <div key={item._id} className="bg-white p-4 rounded-lg card">
              <div className="w-full h-96 mb-4">
                <img className="w-full h-full object-cover rounded-lg" height="20%" width="20%" src={item.images[0]?.url} alt={item.images[0]?.altText || item.name} />
              </div>
              <h3 className="text-sm mb-2">{item.name}</h3>
              <p className="text-gray-500 font-medium text-sm tracking-tighter">{item.price} KM</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SuveniriList;