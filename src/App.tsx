import React, { useCallback, useEffect, useState } from "react";
import axiosBase from "axios";

import { Prefecture, InputCheckEvent } from "./types";

import "./App.css";

const axios = axiosBase.create({
  baseURL: process.env.REACT_APP_RESAS_API_BASE_URL,
  headers: {
    "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY
  }
});

function App() {
  const [prefectureList, setPrefectureList] = useState<Prefecture[]>([]);
  const [selectedPrefectureList, setSelectedPrefectureList] = useState<
    Prefecture[]
  >([]);

  useEffect(() => {
    axios.get("/api/v1/prefectures").then((response) => {
      setPrefectureList(response.data.result);
    });
  }, []);

  const onSelectPrefecture = useCallback((event: InputCheckEvent) => {
    const selectedPrefecture = prefectureList.find((pref) => {
      return pref.prefCode === Number(event.target?.value);
    });
    if (!selectedPrefecture) return;
    setSelectedPrefectureList([...selectedPrefectureList, selectedPrefecture]);
  }, []);

  return (
    <div className="App">
      <div className="PrefectureList">
        {prefectureList.map((prefecture) => {
          return (
            <div className="CheckboxWrapper" key={prefecture.prefCode}>
              <input
                id={String(prefecture.prefCode)}
                type="checkbox"
                value={prefecture.prefCode}
                onInput={onSelectPrefecture}
              />
              <label htmlFor={String(prefecture.prefCode)}>
                {prefecture.prefName}
              </label>
            </div>
          );
        })}
      </div>
      <div className="Graph"></div>
    </div>
  );
}

export default App;
