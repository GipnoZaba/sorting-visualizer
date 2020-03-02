import { observer } from "mobx-react-lite";
import React from "react";
import { ISortingAlgortihm } from "../algorithms/sortingAlgorithm";
import VisualizerContainer from "./VisualizerContainer";
import VisualizerInfo from "./VisualizerInfo";

const VisualizerCard: React.FC<{ algorithm: ISortingAlgortihm }> = ({
  algorithm
}) => {
  return (
    <section className="vizualizer-card">
      <VisualizerContainer algorithm={algorithm} />
      <VisualizerInfo />
    </section>
  );
};

export default observer(VisualizerCard);

/*

*/
