import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import VisualizationCard from "./VisualizationCard";
import { RootStoreContext } from "../app/stores/rootStore";

const Visualizations = () => {
  const rootStore = useContext(RootStoreContext);

  const { bubbleAlgorithm } = rootStore.visualizerStore;

  return (
    <div className="visualisations-container">
      <VisualizationCard algorithm={bubbleAlgorithm} />
      <VisualizationCard algorithm={bubbleAlgorithm} />
      <VisualizationCard algorithm={bubbleAlgorithm} />
      <VisualizationCard algorithm={bubbleAlgorithm} />
    </div>
  );
};

export default observer(Visualizations);
