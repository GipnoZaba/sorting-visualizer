import React, { useContext, Fragment, useState } from "react";
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
//tut potsemu to net kotika a vernee pusisti
//if sirlja kotik import kotik to Tartu from TALLINN

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carousel: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    button: {
      height: "6em",
      width: "4em",
      border: "solid",
      borderWidth: "0.2em",
      borderColor: customColors.complementary
    }
  })
);

const VisualizersCarousel = () => {
  const classes = useStyles();

  const rootStore = useContext(RootStoreContext);

  const { bubbleSort, insertionSort } = rootStore.visualizerStore;

  const [currentCard, setCurrentCard] = useState(1);

  const nextSlide = () => {
    if (currentCard >= 2) {
      setCurrentCard(1);
    } else {
      setCurrentCard(currentCard + 1);
    }
  };

  const prevSlide = () => {
    if (currentCard <= 1) {
      setCurrentCard(2);
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
        onClick={() => nextSlide()}
      >
        Back
      </Button>

      <VisualizerCard algorithm={bubbleSort} visible={currentCard === 1} />
      <VisualizerCard algorithm={insertionSort} visible={currentCard === 2} />

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => prevSlide()}
      >
        Next
      </Button>
    </Container>
  );
};

export default observer(VisualizersCarousel);
