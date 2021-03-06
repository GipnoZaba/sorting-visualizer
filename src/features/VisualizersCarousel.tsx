import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../app/stores/rootStore";
import VisualizerCard from "./VisualizerCard";
import {
  Button,
  makeStyles,
  Theme,
  createStyles,
  Box
} from "@material-ui/core"; //maaaaaaaau
import { customColors } from "../app/styling/colors";
import { Algorithms } from "../app/models/visualizerOptions";
//tut potsemu to net kotika a vernee pusisti
//if sirlja kotik import kotik to Tartu from TALLINN
/*
const neigbours = [
  {
    prev: "last",
    next: "Insertion"
  },
  {
    prev: "Bubble",
    next: "Selection"
  },
  {
    prev: "Insertion",
    next: "Quick"
  },
  {
    prev: "Selection",
    next: "Merge"
  },
  {
    prev: "Quick",
    next: "Insertion"
  }
];
*/

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carousel: {
      height: "100%",
      width: "100%",
      display: "flex"
    },
    buttonContainer: {
      flexBasis: "15%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    cardContainer: {
      flexBasis: "70%",
      display: "flex",
      alignItems: "center"
    },
    button: {
      height: "10%",
      width: "50%",
      backgroundColor: "transparent",
      border: "solid",
      borderWidth: "100%",
      borderColor: customColors.complementary
    }
  })
);

const VisualizersCarousel = () => {
  const classes = useStyles();

  const rootStore = useContext(RootStoreContext);

  const {
    getAlgorithm,
    nextCard,
    prevCard,
    currentCardIndex
  } = rootStore.visualizerStore;

  return (
    <Box className={classes.carousel}>
      <Box className={classes.buttonContainer}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => prevCard()}
        >
          Back
        </Button>
      </Box>

      <Box className={classes.cardContainer}>
        <VisualizerCard
          algorithm={getAlgorithm(Algorithms.BubbleSort)}
          visible={currentCardIndex === 1}
        />
        <VisualizerCard
          algorithm={getAlgorithm(Algorithms.InsertionSort)}
          visible={currentCardIndex === 2}
        />
        <VisualizerCard
          algorithm={getAlgorithm(Algorithms.SelectionSort)}
          visible={currentCardIndex === 3}
        />
        <VisualizerCard
          algorithm={getAlgorithm(Algorithms.QuickSort)}
          visible={currentCardIndex === 4}
        />
        <VisualizerCard
          algorithm={getAlgorithm(Algorithms.MergeSort)}
          visible={currentCardIndex === 5}
        />
      </Box>

      <Box className={classes.buttonContainer}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => nextCard()}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default observer(VisualizersCarousel);
