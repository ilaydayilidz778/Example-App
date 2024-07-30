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
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">CRUD Operations</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value"
            required
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Item
          </button>
        </form>
        <ul className="mt-4">
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-2 border-b border-gray-600">
                <span>{item.name} - {item.value}</span>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center py-2">No Data</li>
          )}
        </ul>

        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleUpdate}
          item={editItem}
        />
      </div>
    </div>
  );
}
