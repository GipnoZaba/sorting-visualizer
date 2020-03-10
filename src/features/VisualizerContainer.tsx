import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";
import Visualizer from "./Visualizer";
import { RootStoreContext } from "../app/stores/rootStore";
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  ButtonGroup,
  Button,
  CardActionArea,
  CardContent
} from "@material-ui/core";
import { customColors } from "../app/styling/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "30em",
      position: "relative",
      right: "5em",
      display: "flex",
      flexDirection: "column",
      borderBottomStyle: "solid",
      borderWidth: "2px",
      borderColor: customColors.primaryDark
    },
    actionArea: {
      flexBasis: "90%",
      border: "dashed",
      borderWidth: "3px",
      borderColor: customColors.primaryLight
    },
    content: {
      height: "100%",
      boxSizing: "border-box",
      padding: 0
    },
    buttons: {
      flexBasis: "10%"
    }
  })
);

const VisualizerContainer: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  const classes = useStyles();
  const rootStore = useContext(RootStoreContext);

  const {
    getRandomArray,
    getSteadyArray,
    getReversedArray,
    triggerSorting
  } = rootStore.visualizerStore;

  return (
    <Card raised className={classes.root}>
      <CardActionArea
        className={classes.actionArea}
        onClick={() => triggerSorting(algorithm.type)}
      >
        <CardContent className={classes.content}>
          <Visualizer algorithm={algorithm} />
        </CardContent>
      </CardActionArea>

      <ButtonGroup
        className={classes.buttons}
        size="large"
        variant="text"
        color="primary"
        aria-label="contained primary button group"
        fullWidth
      >
        <Button onClick={() => getRandomArray(algorithm.type)}>Rand</Button>
        <Button onClick={() => getSteadyArray(algorithm.type)}>Uni</Button>
        <Button onClick={() => getReversedArray(algorithm.type)}>Rev</Button>
        <Button>Four</Button>
      </ButtonGroup>
    </Card>
  );
};

export default observer(VisualizerContainer);
