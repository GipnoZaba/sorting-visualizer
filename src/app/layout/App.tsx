import React from "react";
import SortingVisualizator from "../../features/SortingVisualizator";
import { observer } from "mobx-react-lite";

const App = () => {
  return (
    <div>
      <SortingVisualizator />
    </div>
  );
};

export default observer(App);
