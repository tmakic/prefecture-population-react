import React, { useEffect, useState } from "react";
import axiosBase from "axios";

import { Prefecture, InputCheckEvent, Population } from "./types";

import "./App.css";
import { Graph } from "./Graph";

const axios = axiosBase.create({
  baseURL: process.env.REACT_APP_RESAS_API_BASE_URL,
  headers: {
    "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY
  }
});

function App() {
  const [prefectureList, setPrefectureList] = useState<Prefecture[]>([]);
  const [selectedPrefCodeList, setSelectedPrefCodeList] = useState<number[]>(
    []
  );
  const [boundaryYear, setBoundaryYear] = useState<number>();
  const [totalPopulation, setTotalPopulation] = useState<Population[]>([]);

  useEffect(() => {
    axios.get("/api/v1/prefectures").then((response) => {
      setPrefectureList(response.data.result);
    });
  }, []);

  const getPrefName = (prefCode: number) => {
    const prefData = prefectureList.find((v) => v.prefCode === prefCode);
    return prefData == null ? "" : prefData.prefName;
  };

  const getPopulationData = (prefCode: number) => {
    axios
      .get("/api/v1/population/composition/perYear", {
        params: {
          prefCode: prefCode,
          cityCode: "-"
        }
      })
      .then((response) => {
        if (!boundaryYear) {
          setBoundaryYear(response.data.result.boundaryYear);
        }
        setTotalPopulation([
          ...totalPopulation,
          {
            prefCode: prefCode,
            prefName: getPrefName(prefCode),
            data: response.data.result.data[0].data
          }
        ]);
      });
  };

  const onSelectPrefecture = (event: InputCheckEvent) => {
    const prefCode = Number(event.target?.value);
    // 選択済み都道府県コードに含まれているかの確認
    const prefCodeIndex = selectedPrefCodeList.indexOf(prefCode);

    if (prefCodeIndex > -1) {
      // 含まれている場合(チェックあり → なし)
      const newPrefCodeList = selectedPrefCodeList.filter(
        (v) => v !== prefCode
      );
      setSelectedPrefCodeList(newPrefCodeList);

      // グラフデータからデータを削除
      const totalPopulationIndex = totalPopulation.findIndex(
        (v) => v.prefCode === prefCode
      );
      if (totalPopulationIndex > -1) {
        const newTotalPopulation = totalPopulation.filter(
          (v) => v.prefCode !== prefCode
        );
        setTotalPopulation(newTotalPopulation);
      }
    } else {
      // 含まれていない場合(チェックなし → あり)
      setSelectedPrefCodeList([...selectedPrefCodeList, prefCode]);
      // グラフデータにデータを追加
      getPopulationData(prefCode);
    }
  };

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
      <div className="GraphArea">
        <Graph
          boundaryYear={boundaryYear || 2020}
          totalPopulation={totalPopulation}
        />
      </div>
    </div>
  );
}

export default App;
