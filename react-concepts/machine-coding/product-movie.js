import React, { useEffect, useState } from "react";

function ProductMovie() {
  const [productList, setProductList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [sortingOption, setSoringOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const fetchProductList = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      const unique = ["All", ...new Set(data.map((item) => item.category))];
      setCategories(unique);
      setProductList(data);
      setFiltered(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      let result = [...productList];

      if (selectedCategory !== "All") {
        result = result.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      if (search.trim() !== "") {
        const term = search.toLowerCase();
        result = result.filter(
          (p) =>
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
      }
      if (sortingOption === "priceLowHigh") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortingOption === "priceHighToLow") {
        result.sort((b, a) => b.price - a.price);
      } else if (sortingOption === "ratingHighLow") {
        result.sort((a, b) => b.rating.rate - a.rating.rate);
      }

      setFiltered(result);
    }, 300);

    return () => clearTimeout(delay);
  }, [search, selectedCategory, productList, sortingOption]);
  const totalPage = Math.ceil(filtered.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentProduct = filtered.slice(startIndex, startIndex + itemPerPage);
  const goToFirst = () => setCurrentPage(1);
  const goToLast = () => setCurrentPage(totalPage);
  const gotToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const gotToNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPage));

  if (loading) return <h1>Loading...</h1>;
  if (error)
    return (
      <>
        <h1>Error: {error}</h1>
        <button onClick={fetchProductList}>Retry</button>
      </>
    );

  return (
    <div>
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search by name or description"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={sortingOption}
        onChange={(e) => setSoringOption(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="priceLowHigh">Price:Low-High</option>
        <option value="priceHighLow">Price:High-Low</option>
        <option value="ratingHighLow"> Rating:High-Low</option>
      </select>
      {currentProduct.length === 0 ? (
        <p>No product found</p>
      ) : (
        <ul style={{ listStyle: "none" }}>
          {currentProduct.map((item) => (
            <li key={item.id} style={{ marginBottom: "20px" }}>
              <img src={item.image} alt={item.title} width="100" />
              <div>
                <h4>{item.title}</h4>
                <p>Price: ${item.price}</p>
                <p>Category: {item.category}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {filtered.length > 0 && (
        <div>
          <button onClick={goToFirst} disabled={currentPage===1}>First</button>
          <button onClick={gotToPrev} disabled={currentPage===1}>Prev</button>

          <span>pages {currentPage} of{totalPage}</span>
           <button onClick={gotToNext} disabled={currentPage===totalPage}>Next</button>
          <button onClick={goToLast} disabled={currentPage===totalPage}>Last</button>
        </div>
      )}
    </div>
  );
}

export default ProductMovie;
