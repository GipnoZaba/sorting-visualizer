import React from "react";
import VisualizersCarousel from "../../features/VisualizersCarousel";
import { observer } from "mobx-react-lite";

const App = () => {
  return (
    <div>
      <VisualizersCarousel />
    </div>
  );
};

export default observer(App);
