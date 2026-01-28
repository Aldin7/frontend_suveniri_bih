
import Hero from '../components/Layout/Hero'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import React, { useState } from "react";
import SearchBar from "../components/Common/SearchBar";

function Home() {
 const [results, setResults] = useState([]);

  return (
      <div className="p-6">
         <SearchBar onResults={setResults} />

      <div className="mt-6">
        {results.length === 0 ? (
          <p className="text-gray-500">Nema rezultata za pretragu.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map((product) => (
              <li key={product._id} className="border p-4 rounded shadow">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p>Cijena: €{product.price}</p>
                <p>Kategorija: {product.category}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

          <Hero />
          {/*<GenderCollectionSection />*/}
        
      {/* Best sellers */}
      {/*<h2 className='text-3xl text-center font-bold mb-4'>Best Selers</h2>
      <ProductDetails />*/}
      {/*<div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top souvenir products
        </h2>
        <ProductGrid products={placeholderProducts} />*
      </div>*/}
      <FeaturedCollection />
      {/*<FeaturesSection />*/}
    </div>
  )
}

export default Home