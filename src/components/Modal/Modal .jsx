"use client"
import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css'; // Tailwind CSS'i ekleyin

const Modal = ({ isOpen, onClose, onSubmit, item }) => {
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    // Modal açıldığında input değerlerini güncelle
    useEffect(() => {
        if (item) {
            setName(item.name || '');
            setValue(item.value || '');
        }
    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id: item.id, name, value }).then(() => {
            onClose(); // Save başarılı olduğunda modalı kapat
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Item</h2>
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
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="submit"
                            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
