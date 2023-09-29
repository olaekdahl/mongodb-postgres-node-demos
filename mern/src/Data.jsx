// src/DataDisplay.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Data() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the /read endpoint when the component mounts
    axios.get('http://localhost:3000/read') // Replace with your API URL
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
      <h2>Data Display</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            Name: {item.name}, Age: {item.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Data;
