import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../app/stores/rootStore";
import ArrayTextElement from "./ArrayTextElement";
import ArrayColorElement from "./ArrayColorElement";
import Visualizations from "./Visualizations";

const SortingVisualizator = () => {
  return (
    <div>
      <Visualizations />
    </div>
  );
};

export default observer(SortingVisualizator);
