import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Page1.css'; // Import the CSS file

const Page1 = () => {
  const [items, setItems] = useState([]);
  const [alreadySelectedItems, setAlreadySelectedItems] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      })
    );
  };

  const handleGoToPage2 = async () => {
    const newlySelectedItems = items.filter((item) => item.checked);

    if (alreadySelectedItems.length > 0) {
      const updatedSelectedItems = [...alreadySelectedItems, ...newlySelectedItems];
      await axios.put('http://localhost:3001/selectedItems', updatedSelectedItems);
    } else {
      await axios.post('http://localhost:3001/selectedItems', newlySelectedItems);
    }

    navigate('/2');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/selectedItems'); 
        setAlreadySelectedItems(response.data);
      } catch (error) {
        console.error('Error fetching selected items:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="page-container">
      <h1>Checklist</h1>
      <div className="items-container">
        {items.map((item) => (
          <div key={item.id} className="item">
            <input
              type="checkbox"
              checked={item.checked}
              disabled={alreadySelectedItems.some((selectedItem) => selectedItem.id === item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
            <div className="item-details">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <center>
        <button className="go-to-page2-btn" onClick={handleGoToPage2}>
          Selected Languages
        </button>
      </center>
    </div>
  );
};

export default Page1;
