import React, { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import "../../../i18n";
import ProductGrid from "../Products/ProductGrid";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/search/${searchTerm}`
      );
      if (!response.ok) {
        throw new Error(`Greška: ${response.status}`);
      }

      const data = await response.json();
      setResults(data); // backend vraća niz proizvoda
    } catch (error) {
      console.error("Greška pri pretrazi:", error);
      setResults([]);
    }
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen
          ? "absolute top-0 left-0 w-full bg-white h-24 z-50"
          : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder={t("searchProducts")}
              value={searchTerm}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* search icon */}
            <button
              type="submit"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          {/* close button */}
          <button
            onClick={handleSearchToggle}
            type="button"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}

      {/* prikaz rezultata */}
      {results.length > 0 && (
        <div className="absolute top-24 left-0 w-full bg-white p-4 shadow-lg z-40">
          <h2 className="text-xl font-semibold mb-4">Rezultati pretrage</h2>
          <ProductGrid products={results} />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
