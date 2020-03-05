import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";
import Visualizer from "./Visualizer";
import { RootStoreContext } from "../app/stores/rootStore";

const VisualizerContainer: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  const rootStore = useContext(RootStoreContext);

  const { getRandomArray, getSteadyArray, getReversedArray } = rootStore.visualizerStore;

  return (
    <div className="vizualizer-container">
      <Visualizer algorithm={algorithm} />
      <div className="array-types">
        <ul>
          <li onClick={() => getRandomArray(algorithm.type)}>Rand</li>
          <li onClick={() => getSteadyArray(algorithm.type)}>Uni</li>
          <li onClick={() => getReversedArray(algorithm.type)}>Rev</li>
          <li>D</li>
        </ul>
      </div>
    </div>
  );
};

export default observer(VisualizerContainer);
