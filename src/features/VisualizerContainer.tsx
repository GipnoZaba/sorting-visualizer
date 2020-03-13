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
  CardContent,
  Slider,
  Paper
} from "@material-ui/core";
import { customColors } from "../app/styling/colors";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

const marks = [
  {
    value: 5,
    label: "5"
  },
  {
    value: 25,
    label: "25"
  },
  {
    value: 50,
    label: "50"
  },
  {
    value: 75,
    label: "75"
  },
  {
    value: 100,
    label: "100"
  }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: "visible",
      height: "30em",
      position: "relative",
      right: "2.5em",
      display: "flex",
      flexDirection: "row"
    },
    sliderContainer: {
      display: "flex",
      flexDirection: "column",
      height: "15em",
      alignItems: "center",
      width: "5em",
      borderBottomStyle: "solid",
      borderWidth: "2px",
      borderColor: customColors.secondaryLight,
      "&:hover": {
        borderWidth: "5px"
      }
    },
    card: {
      overflow: "visible",
      height: "100%",
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
      borderColor: customColors.primaryLight,
      "&:hover": {
        border: "solid",
        background: customColors.grey,
        borderColor: customColors.primary,
        borderWidth: "3px"
      }
    },
    content: {
      height: "100%",
      boxSizing: "border-box",
      padding: 0
    },
    buttons: {
      flexBasis: "10%"
    },
    icon: {
      zIndex: 1,
      position: "absolute",
      left: "50%",
      marginLeft: "-25%",
      top: "50%",
      marginTop: "-25%",
      width: "5em",
      height: "5em",
      color: "white",
      "&:hover": {
        transform: "scale(1.02)"
      }
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
    getSteppedArray,
    triggerSorting,
    isAnimating,
    handleBarsAmountChange
  } = rootStore.visualizerStore;

  return (
    <div className={classes.root}>
      <Paper className={classes.sliderContainer} elevation={20}>
        <div style={{ marginTop: "1em" }} />
        <Slider
          style={{ color: `${customColors.secondary}` }}
          min={5}
          max={100}
          orientation="vertical"
          defaultValue={20}
          aria-labelledby="discrete-slider-custom"
          step={1}
          valueLabelDisplay="on"
          marks={marks}
          onChange={(event, value) =>
            handleBarsAmountChange(Number(value), algorithm.type)
          }
        />
        <div style={{ marginBottom: "1em" }} />
      </Paper>

      <Card raised className={classes.card}>
        <CardActionArea
          id="visualizerArea"
          className={classes.actionArea}
          onClick={() => triggerSorting(algorithm.type)}
        >
          {isAnimating(algorithm.type) ? (
            <PauseCircleOutlineIcon id="pauseIcon" className={classes.icon} />
          ) : (
            <PlayCircleOutlineIcon id="playIcon" className={classes.icon} />
          )}

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
          <Button onClick={() => getSteppedArray(algorithm.type)}>Four</Button>
        </ButtonGroup>
      </Card>
    </div>
  );
};

export default observer(VisualizerContainer);
