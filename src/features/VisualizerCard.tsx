import { observer } from "mobx-react-lite";
import React from "react";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";
import VisualizerContainer from "./VisualizerContainer";
import VisualizerInfo from "./VisualizerInfo";

const VisualizerCard: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  return (
    <section className="vizualizer-card">
      <VisualizerContainer algorithm={algorithm} />
      <VisualizerInfo algorithm={algorithm} />
    </section>
  );
};

export default observer(VisualizerCard);

/*

*/
