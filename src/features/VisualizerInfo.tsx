import { observer } from "mobx-react-lite";
import React from "react";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";
import TabGroup from "./TabGroup";

const VisualizerInfo: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  return (
    <div className="info-panel">
      <div className="title">
        <h1>{algorithm.data.title}</h1>
        <span>{algorithm.data.class}</span>
      </div>

      <TabGroup algorithm={algorithm} />
    </div>
  );
};

export default observer(VisualizerInfo);
