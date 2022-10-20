import React from "react";
import axios from "axios";

import "./App.css";

const api = `http://localhost:3001/api`;

function Sales() {
  const [data, setData] = React.useState({ results: [] });

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios(api,);
      setData(result.data);
      console.log(result.data);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h1>Sales</h1>
      <ul>
        {/* {data.result.map((item) => (
          <li key={item}>
            <a href={item}> {item}</a>
          </li>
        ))} */}
      </ul>
    </React.Fragment>
  );
}

export default Sales;
