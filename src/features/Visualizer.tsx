import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { RootStoreContext } from "../app/stores/rootStore";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";

const Visualizer: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  const rootStore = useContext(RootStoreContext);

  const { sortArray, getArray } = rootStore.visualizerStore;

  return (
    <div
      className="visualizer-window"
      onClick={() => sortArray(algorithm.type)}
    >
      <div className="visualizer bars-horizontal">
        {getArray(algorithm.type).map((element, index) => {
          return (
            <div
              className="visualizer-bar blue"
              key={index}
              style={{ width: `${element.getValue()}%` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(Visualizer);
