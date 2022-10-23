import React from "react";
import axios from "axios";

import "./App.css";

const api = `http://localhost:3002/api/v2/`;

function Sales() {
  const [data, setData] = React.useState({ sales: [] });

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(api);
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h1>Sales</h1>
      <ul>
        {data.sales.map((item, index) => (
          <li key={item._id}>
            <a href={item._id}> {item.item}</a>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default Sales;
