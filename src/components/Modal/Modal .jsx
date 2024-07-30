"use client"
import { useState, useEffect } from 'react';

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
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h2>Edit Item</h2>
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
                    <div style={modalStyles.buttonContainer}>
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose} style={modalStyles.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#adadad',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        textAlign: 'center',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    cancelButton: {
        backgroundColor: '#4e4b4b',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
};

export default Modal;
