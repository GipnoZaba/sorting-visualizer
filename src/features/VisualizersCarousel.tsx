import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import VisualizationCard from "./VisualizerCard";
import { RootStoreContext } from "../app/stores/rootStore";

const VisualizersCarousel = () => {
  const rootStore = useContext(RootStoreContext);

  const { bubbleAlgorithm } = rootStore.visualizerStore;

  return (
    <div className="visualizations-carousel">
      <VisualizationCard algorithm={bubbleAlgorithm} />
    </div>
  );
};

export default observer(VisualizersCarousel);
