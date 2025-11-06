import React, { useEffect, useState, useMemo } from 'react';

function TablePagination() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [sortingOption, setSortingption] = useState('');
  const[currentPage,setCurrentPage]=useState(1)
  const itemPerPage=2
  const fetchData = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('error fetching');
      let users = await res.json();
      if (search) {
        users = users.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (sortingOption === 'lowToHigh') {
        users.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortingOption === 'highToLow') {
        users.sort((a, b) => b.name.localeCompare(a.name));
      }
      setData(users);
      console.log('reponse', data);
    } catch (error) {
      console.error('error', error.message);
    }
  };
  const totalPage=Math.ceil(data.length/itemPerPage)
  const startIndex=(currentPage-1)*itemPerPage
  const currentProduct=data.slice(startIndex,startIndex+totalPage)
  const goToFirst=()=>setCurrentPage(1)
  const goToLast=()=>setCurrentPage(totalPage)
  const goToPrev=()=>setCurrentPage((prev)=>Math.max(prev-1,1))
  const goToNext=()=>setCurrentPage((prev)=>Math.min(prev+1,totalPage))
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  useEffect(() => {
    fetchData(debounced);
  }, [debounced,sortingOption,search]);
  return (
    <div>
      <h1>Dashboard</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />

      <select
        value={sortingOption}
        onChange={(e) => setSortingption(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="lowToHigh">Low-High</option>
        <option value="highToLow">High-Low</option>
      </select>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Id</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>UserName</th>
          </tr>
        </thead>
        <tbody>
          {currentProduct.map((user) => (
            <tr>
              <td style={tdStyle}>{user.id}</td>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={goToFirst} disabled={currentPage===1}>First</button>
        <button onClick={goToPrev}  disabled={currentPage===1}>Prev</button>
        <span> pages {currentPage} of {totalPage} </span>
        <button onClick={goToNext}  disabled={currentPage===totalPage}>Next</button>
        <button onClick={goToLast} disabled={currentPage===totalPage}>Last</button>
        </div>
    </div>
  );
}
const thStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};
const tdStyle = { borderBottom: '2px solid #eee' };
export default TablePagination;
