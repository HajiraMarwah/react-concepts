import React, { useState, useEffect } from 'react';
function App() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const [error, setError] = useState('');
  const[currentPage,setCurrentPage]=useState(1)
  const[totalPage,setTotalPage]=useState(1)
  let page_per_size=4
  const fetchProduct = async () => {
    try {
      setLoading(true);

      setError('');
      const res = await fetch('https://dummyjson.com/products');
      if (!res.ok) throw new Error('Network issues');
      const data = await res.json();
      console.log(data.product, 'datasss');
      setProduct(data.products);
      setTotalPage()
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProduct();
  }, []);
  const categories = [...new Set(product.map((p) => p.category))];
  console.log(categories);
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error:{error}</p>;
  const filteredProduct = product
    .filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (categoryFilter ? p.category === categoryFilter : true)
    )
    .sort((a, b) => {
      if (priceSort === 'asc') return a.price - b.price;
      if (priceSort === 'dsc') return b.price - a.price;
      return 0;
    });
    const totalProductPage=Math.ceil(filteredProduct.length/page_per_size)
    const startIndex=(currentPage-1)*page_per_size
    const endIndex=startIndex+page_per_size
    const ProductePaginated=filteredProduct.slice(startIndex,endIndex)
    const handlePrev=()=>{
      if(currentPage>1){
        setCurrentPage((prev)=>prev-1)
      }
    }
    const handleNext=()=>{
      if(currentPage<totalProductPage){
        setCurrentPage((prev)=>prev+1)
      }
    }
  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
      gap: 20,
      marginTop: 20,
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 20,
      background: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    },
    image: {
      width: '100%',
      height: 150,
      objectFit: 'cover',
      borderRadius: 8,
    },
  };
  return (
    <div>
      <h1>Product Listing</h1>
      <input
        type="text"
        style={{ marginRight: 10, padding: 5 }}
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        style={{ marginRight: 10, padding: 5 }}
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option value={cat}>{cat}</option>
        ))}
      </select>
      <select
        style={{ marginRight: 10, padding: 5 }}
        value={priceSort}
        onChange={(e) => setPriceSort(e.target.value)}
      >
        <option value="">Select price range</option>
        <option value="asc">Price:low-high</option>
        <option value="dsc">Price:high-low</option>
      </select>
      <div style={styles.grid}>
        {ProductePaginated.map((item) => (
          <div style={styles.card}>
            <img src={item.thumbnail} style={styles.image} />
            <h4>{item.title}</h4>
            <p>Category:{item.category}</p>
            <p>Price:{item.price}$</p>
            <p>Rating:{item.rating}⭐</p>
          </div>
        ))}
        <div style={{marginTop:20,display:"flex",gap:10}}>
          <button onClick={handlePrev} disabled={currentPage===1}>Prev</button>
          <button onClick={handleNext} disabled={currentPage===totalProductPage}>Next</button>

        </div>
      </div>
    </div>
  );
}
export default App;
