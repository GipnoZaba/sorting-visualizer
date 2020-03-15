import React, { Fragment } from "react";
import VisualizersCarousel from "../../features/VisualizersCarousel";
import { observer } from "mobx-react-lite";

const App = () => {
  return (
    <Fragment>
      <VisualizersCarousel />
    </Fragment>
  );
};

export default observer(App);
