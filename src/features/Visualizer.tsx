import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { RootStoreContext } from "../app/stores/rootStore";
import { ISortingAlgortihm } from "../algorithms/sortingAlgorithm";

const Visualizer: React.FC<{ algorithm: ISortingAlgortihm }> = ({
  algorithm
}) => {
  const rootStore = useContext(RootStoreContext);

  const { startAlgorithm } = rootStore.visualizerStore;

  return (
    <div
      className="visualizer-window"
      onClick={() => startAlgorithm(algorithm)}
    >
      <div className="visualizer">
        {algorithm.array.map(element => {
          return (
            <div
              className="visualizer-bar blue"
              key={element.index}
              style={{ height: `${element.getValue()}%` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(Visualizer);
