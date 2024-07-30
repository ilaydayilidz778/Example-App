"use client"
import { getAPI, postAPI } from '@/services/fetchAPI/index';
import { useState, useEffect } from 'react';


export default function Home() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await getAPI("/items");
      console.log(res);
      if (res) {
        setItems(res);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div>
      <h1>CRUD Operations</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          required
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>{item.name} - {item.value}</li>
          ))
        ) : (
          <li>No Data</li>
        )}
      </ul>
    </div>
  );
}
