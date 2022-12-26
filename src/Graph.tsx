import React from "react";
import { Population } from "./types";

export const Graph = ({
  boundaryYear,
  totalPopulation
}: {
  boundaryYear: number | undefined;
  totalPopulation: Population[];
}) => {
  const onClick = () => {
    console.log(boundaryYear);
    console.log(totalPopulation);
  };
  return <button onClick={onClick}>Graph</button>;
};
