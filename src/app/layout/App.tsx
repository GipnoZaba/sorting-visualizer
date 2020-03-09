import React from "react";
import VisualizersCarousel from "../../features/VisualizersCarousel";
import { observer } from "mobx-react-lite";
import Container from "@material-ui/core/Container";

const App = () => {
  return (
    <Container>
      <VisualizersCarousel />
    </Container>
  );
};

export default observer(App);
