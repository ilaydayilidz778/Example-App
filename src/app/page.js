"use client"
import { getAPI, postAPI, deleteAPI, putAPI } from '@/services/fetchAPI/index';
import { useState, useEffect } from 'react';
import Modal from '@/components/Modal/Modal ';


export default function Home() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await getAPI("/items");
      console.log("Fetched items:", res);
      if (res && res.status === "success" && Array.isArray(res.data)) {
        setItems(res.data);
      } else {
        console.error("Unexpected response format:", res);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !value) {
      console.error("Name and value are required");
      return;
    }

    try {
      const newItem = { name, value };
      const res = await postAPI("/items/create", newItem);

      // API yanıtını kontrol et
      if (res && res.status === "success") {
        fetchItems(); // Verileri yeniden yükle
        setName('');
        setValue('');
      } else {
        console.error("Failed to add item:", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error adding item:", error.message || error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteAPI(`/items/${id}`);
      if (res && res.status === "success") {
        fetchItems(); // Verileri yeniden yükle
      } else {
        console.error("Failed to delete item:", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error deleting item:", error.message || error);
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  const handleUpdate = async (updatedItem) => {
    try {
      const res = await putAPI(`/items/${updatedItem.id}`, updatedItem);

      if (res && res.status === "success") {
        fetchItems(); // Verileri yeniden yükle
        handleModalClose();
      } else {
        console.error("Failed to update item:", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error updating item:", error.message || error);
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
          style={{ backgroundColor: '#4a4a4a', color: '#ffffff' }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          required
          style={{ backgroundColor: '#4a4a4a', color: '#ffffff' }}
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} style={{ color: '#ffffff' }}>
              {item.name} - {item.value}
              <button onClick={() => handleEditClick(item)} style={{ marginLeft: '20px', backgroundColor: '#4d79ff', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '5px 10px' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '20px', backgroundColor: '#ff4d4d', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '5px 10px' }}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <li style={{ color: '#ffffff' }}>No Data</li>
        )}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleUpdate}
        item={editItem}
      />

    </div>
  );
}
