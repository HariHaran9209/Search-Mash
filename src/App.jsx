import React, { useState, useEffect, use } from 'react'
import './App.css'

const App = () => {

  const [ products, setProducts ] = useState([])
  const [ filters, setFilters ] = useState({
    temperature: { min: '', max: '' },
    height: { min: '', max: '' },
    weight: { min: '', max: '' },
    name: '',
    category: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://backend-hhfq.onrender.com/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error(`Error fetching products: ${error}`)
    }
  }

  const handleSearch = async () => {
    try {
      const cleanedFilters = {}
      Object.keys(filters).forEach(key => {
        if (typeof filters[key] === 'object' && (filters[key].min !== '' || filters[key].max !== '')) {
          cleanedFilters[key] = {};
          if (filters[key].min !== '') {
            cleanedFilters[key].min = Number(filters[key].min);
          }
          if (filters[key].max !== '') {
            cleanedFilters[key].max = Number(filters[key].max);
          }
        } else if (typeof filters[key] === 'string' && filters[key] !== '') {
          cleanedFilters[key] = filters[key];
        }
      });

      const response = await fetch('https://backend-hhfq.onrender.com/api/products/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filters: cleanedFilters })
      })
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error(`Error searching products: ${error}`)
    }
  }

  const handleFilterChange = (field, type, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: type === 'min' || type === 'max'
        ? { ...prev[field], [type]: value !== '' ? Number(value) : '' }
        : value
    }))
  }
  
  {
    return (
      <div className="App">
      <header className="App-header">
        <h1>Product Search</h1>
      </header>
      
      <div className="search-container">
        <div className="filter-section">
          <h2>Search Filters</h2>
          
          <div className="filter-group">
            <label>Name:</label>
            <input
              type="text"
              value={filters.name}
              onChange={(e) => handleFilterChange('name', 'text', e.target.value)}
              placeholder="Search by name"
            />
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <input
              type="text"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', 'text', e.target.value)}
              placeholder="Search by category"
            />
          </div>

          <div className="filter-group">
            <label>Temperature Range:</label>
            <input
              type="number"
              value={filters.temperature.min}
              onChange={(e) => handleFilterChange('temperature', 'min', e.target.value)}
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.temperature.max}
              onChange={(e) => handleFilterChange('temperature', 'max', e.target.value)}
              placeholder="Max"
            />
          </div>

          <div className="filter-group">
            <label>Height Range:</label>
            <input
              type="number"
              value={filters.height.min}
              onChange={(e) => handleFilterChange('height', 'min', e.target.value)}
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.height.max}
              onChange={(e) => handleFilterChange('height', 'max', e.target.value)}
              placeholder="Max"
            />
          </div>

          <div className="filter-group">
            <label>Weight Range:</label>
            <input
              type="number"
              value={filters.weight.min}
              onChange={(e) => handleFilterChange('weight', 'min', e.target.value)}
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.weight.max}
              onChange={(e) => handleFilterChange('weight', 'max', e.target.value)}
              placeholder="Max"
            />
          </div>

          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        <div className="results-section">
          <h2>Search Results</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-details">
                  {product.temperature && <p>Temperature: {product.temperature}°C</p>}
                  {product.height && <p>Height: {product.height}cm</p>}
                  {product.weight && <p>Weight: {product.weight}kg</p>}
                  <p>Price: ${product.price}</p>
                  <p>Category: {product.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default App
