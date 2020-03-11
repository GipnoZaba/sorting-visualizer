import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../app/stores/rootStore";
import VisualizerCard from "./VisualizerCard";
import {
  Container,
  Button,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core"; //maaaaaaaau
import { customColors } from "../app/styling/colors";
import { Algorithms } from "../app/models/visualizerOptions";
//tut potsemu to net kotika a vernee pusisti
//if sirlja kotik import kotik to Tartu from TALLINN

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carousel: {
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    button: {
      height: "6em",
      width: "4em",
      backgroundColor: "transparent",
      border: "solid",
      borderWidth: "0.2em",
      borderColor: customColors.complementary
    }
  })
);

const VisualizersCarousel = () => {
  const classes = useStyles();

  const rootStore = useContext(RootStoreContext);

  const { getAlgorithm } = rootStore.visualizerStore;

  const [currentCard, setCurrentCard] = useState(1);

  const nextSlide = () => {
    if (currentCard >= 4) {
      setCurrentCard(1);
    } else {
      setCurrentCard(currentCard + 1);
    }
  };

  const prevSlide = () => {
    if (currentCard <= 1) {
      setCurrentCard(4);
    } else {
      setCurrentCard(currentCard - 1);
    }
  };

  return (
    <Container className={classes.carousel}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => prevSlide()}
      >
        Back
      </Button>

      <VisualizerCard
        algorithm={getAlgorithm(Algorithms.BubbleSort)}
        visible={currentCard === 1}
      />
      <VisualizerCard
        algorithm={getAlgorithm(Algorithms.InsertionSort)}
        visible={currentCard === 2}
      />
      <VisualizerCard
        algorithm={getAlgorithm(Algorithms.SelectionSort)}
        visible={currentCard === 3}
      />
      <VisualizerCard
        algorithm={getAlgorithm(Algorithms.QuickSort)}
        visible={currentCard === 4}
      />

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => nextSlide()}
      >
        Next
      </Button>
    </Container>
  );
};

export default observer(VisualizersCarousel);
