import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ISortingAlgortihm } from "../algorithms/sortingAlgorithm";
import { RootStoreContext } from "../app/stores/rootStore";

const VisualizationCard: React.FC<{ algorithm: ISortingAlgortihm }> = ({
  algorithm
}) => {
  const rootStore = useContext(RootStoreContext);

  const { startAlgorithm } = rootStore.visualizerStore;

  return (
    <div
      className="visualisation-card"
      onClick={() => startAlgorithm(algorithm)}
    >
      <div style={{ textAlign: "center" }}>Roflan</div>
      <div className="array-container">
        {algorithm.array.map(element => {
          return (
            <div
              className="array-element"
              key={element.index}
              style={{ height: `${element.getValue()}%` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(VisualizationCard);
