import { useState } from 'react';
import axiosBase from 'axios';

import './App.css';

function App() {
  const axios = axiosBase.create({
    baseURL: process.env.REACT_APP_RESAS_API_BASE_URL,
    headers: {
      'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY
    }
  });

  const [prefectureList, setPrefectureList] = useState([]);

  const getPrefectureData = () => {
    axios.get("/api/v1/prefectures").then(response => {
      setPrefectureList(response.data.result)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => getPrefectureData()}>Click Here!</button>
      </header>
    </div>
  );
}

export default App;
