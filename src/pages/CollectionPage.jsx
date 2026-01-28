import { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
function CollectionPage() {
    const [products, setProducts] = useState([]);
    const SidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (SidebarRef.current && !SidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        // clean event listner 
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const fetchProducts = [
                {
                    _id: 1,
                    name: 'Collection Product 1',
                    price: 100,
                    images: [{ url: "https://picsum.photos/200?random=1", altText: "Product 1" }]
                },
                {
                    _id: 2,
                    name: 'Collection Product 2',
                    price: 150,
                    images: [{ url: "https://picsum.photos/200?random=2", altText: "Product 2" }]
                },
                {
                    _id: 3,
                    name: 'Collection Product 3',
                    price: 200,
                    images: [{ url: "https://picsum.photos/200?random=3", altText: "Product 3" }]
                },
                {
                    _id: 4,
                    name: 'Collection Product 4',
                    price: 250,
                    images: [{ url: "https://picsum.photos/200?random=4", altText: "Product 4" }]
                }
            ];setProducts(fetchProducts);
        }, 800);
    }, []);



  return (
      <div className='flex flex-col lg:flex-row'>
          {/* Mobile Filter button */}
          <button
              onClick={toggleSidebar}
              className="lg:hidden border p-2 flex justify-center items-center">
              <FaFilter className="mr-2" />Filters
          </button>
          {/* Filter Sidebar  */}
          <div ref={SidebarRef} className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 z-50 lleft-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
              <FilterSidebar />
          </div>
          <div className='flex-grow-0 p-4 ' >
              <h2 className="text-2xl uppercase mb-4">All Collection</h2>
              {/* Sort Option  */}
              <SortOptions />

              {/* Products Grid */}
              <ProductGrid products={products} />
          </div>
    </div>
  )
}

export default CollectionPage