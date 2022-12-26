import { useCallback, useEffect, useState } from 'react';
import axiosBase from 'axios';

import './App.css';

const axios = axiosBase.create({
  baseURL: process.env.REACT_APP_RESAS_API_BASE_URL,
  headers: {
    'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY
  }
})

function App() {
  const [prefectureList, setPrefectureList] = useState([]);
  const [selectedPrefectureList, setSelectedPrefectureList] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/prefectures").then(response => {
      setPrefectureList(response.data.result)
    });
  }, [])

  const onSelectPrefecture = useCallback((value) => {
    const selectedPrefecture = prefectureList.find(pref => {
      return pref.prefCode === Number(value.target.value)
    })
    if (!selectedPrefecture) return;
    setSelectedPrefectureList([...selectedPrefectureList, selectedPrefecture])
  })

  return (
    <div className="App">
      <div className="PrefectureList">
        {prefectureList.map(prefecture => {
          return (
            <div className="CheckboxWrapper" key={prefecture.prefCode}>
              <input id={prefecture.prefCode} type="checkbox" value={prefecture.prefCode} onInput={onSelectPrefecture} />
              <label htmlFor={prefecture.prefCode}>{prefecture.prefName}</label>
            </div>
          )
        })}
      </div>
      <div className='Graph'></div>
    </div>
  );
}

export default App;
