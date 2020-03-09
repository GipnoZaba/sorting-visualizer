import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../app/stores/rootStore";
import VisualizerCard from "./VisualizerCard";
import { Container } from "@material-ui/core"; //maaaaaaaau
//tut potsemu to net kotika a vernee pusisti
//if sirlja kotik import kotik to Tartu from TALLINN

const VisualizersCarousel = () => {
  const rootStore = useContext(RootStoreContext);

  const { bubbleSort, insertionSort } = rootStore.visualizerStore;

  return (
    <Container>
      <VisualizerCard algorithm={bubbleSort} />
    </Container>
  );
};

export default observer(VisualizersCarousel);
