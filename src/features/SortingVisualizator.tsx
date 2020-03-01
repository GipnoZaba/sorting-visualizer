import React from "react";
import { observer } from "mobx-react-lite";
import Visualizations from "./Visualizations";

const SortingVisualizator = () => {
  return (
    <div>
      <Visualizations />
    </div>
  );
};

export default observer(SortingVisualizator);
