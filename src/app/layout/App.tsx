import React, { Fragment } from "react";
import VisualizersCarousel from "../../features/VisualizersCarousel";
import { observer } from "mobx-react-lite";

const App = () => {
  return (
    <Fragment>
      <VisualizersCarousel />
      <div style={{width: "200px", height: "200px", backgroundColor: "blue"}}>
      </div>
    </Fragment>
  );
};

export default observer(App);
