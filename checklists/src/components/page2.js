import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Page2.css';
import { useNavigate } from 'react-router-dom';

const Page2 = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/selectedItems');
        setSelectedItems(response.data);
      } catch (error) {
        console.error('Error fetching selected items:', error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      await axios.put(`http://localhost:3001/selectedItems/${id}`);
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="page-container">
      <h1>Selected Languages</h1>
      <div className="selected-items-container">
        <h2>Selected Items</h2>
        <ol className="selected-items-list">
          {selectedItems.map((item, index) => (
            <li key={item.id} className="selected-item">
              {index + 1}. {item.title} - {item.description}
              <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <center>
          <button className="go-to-page1-btn" onClick={() => navigate('/')}>
            Select More
          </button>
        </center>
      </div>
    </div>
  );
};

export default Page2;
