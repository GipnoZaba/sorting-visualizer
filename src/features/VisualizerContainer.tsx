import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";
import Visualizer from "./Visualizer";
import { RootStoreContext } from "../app/stores/rootStore";
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  ButtonGroup,
  CardActionArea,
  CardContent,
  Slider,
  Paper,
  IconButton,
  Badge,
  styled,
  Button
} from "@material-ui/core";
import { customColors } from "../app/styling/colors";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SignalCellular4BarIcon from "@material-ui/icons/SignalCellular4Bar";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import SpeedIcon from "@material-ui/icons/Speed";
import { green, orange, red, grey } from "@material-ui/core/colors";

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
  },
  {
    value: 150,
    label: "150"
  },
  {
    value: 200,
    label: "200"
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
      height: "90%",
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
      width: "100%",
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
    },
    slow: {
      backgroundColor: green[600],
      color: "white"
    },
    average: {
      backgroundColor: orange[600],
      color: "white"
    },
    fast: {
      backgroundColor: red[600],
      color: "white"
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
    handleBarsAmountChange,
    changeSpeed,
    speed
  } = rootStore.visualizerStore;

  const handleChangeSpeed = (speed: string) => {
    changeSpeed(speed);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.sliderContainer} elevation={20}>
        <div style={{ marginTop: "1em" }} />
        <Slider
          style={{ color: `${customColors.secondary}` }}
          min={5}
          max={200}
          orientation="vertical"
          defaultValue={25}
          aria-labelledby="discrete-slider-custom"
          step={1}
          valueLabelDisplay="on"
          marks={marks}
          onChange={(event, value) =>
            handleBarsAmountChange(Number(value), algorithm.type)
          }
        />
        <div style={{ marginBottom: "1em" }} />
        <ButtonGroup
          orientation="vertical"
          className={classes.buttons}
          size="large"
          variant="text"
          color="secondary"
          aria-label="contained primary button group"
          fullWidth
        >
          <IconButton
            style={{
              backgroundColor: speed === "slow" ? green[100] : "white"
            }}
            aria-label="slow"
            onClick={() => handleChangeSpeed("slow")}
          >
            <Badge
              classes={{ badge: classes.slow }}
              variant="dot"
              style={{ color: `${green[600]}` }}
            >
              <SpeedIcon style={{ color: `${green[600]}` }} />
            </Badge>
          </IconButton>
          <IconButton
            style={{
              backgroundColor: speed === "average" ? orange[100] : "white"
            }}
            aria-label="average"
            onClick={() => handleChangeSpeed("average")}
          >
            <Badge
              classes={{ badge: classes.average }}
              variant="dot"
              style={{ color: `${orange[600]}` }}
            >
              <SpeedIcon style={{ color: `${orange[600]}` }} />
            </Badge>
          </IconButton>
          <IconButton
            style={{
              backgroundColor: speed === "fast" ? red[100] : "white"
            }}
            aria-label="fast"
            onClick={() => handleChangeSpeed("fast")}
          >
            <Badge
              classes={{ badge: classes.fast }}
              variant="dot"
              style={{ color: `${red[600]}` }}
            >
              <SpeedIcon style={{ color: `${red[600]}` }} />
            </Badge>
          </IconButton>
        </ButtonGroup>
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
          <Button onClick={() => getRandomArray(algorithm.type)}>
            <ShuffleIcon />
          </Button>
          <Button onClick={() => getSteadyArray(algorithm.type)}>
            <SignalCellular4BarIcon />
          </Button>
          <Button onClick={() => getReversedArray(algorithm.type)}>
            <SignalCellular4BarIcon style={{ transform: "scaleX(-1)" }} />
          </Button>
          <Button onClick={() => getSteppedArray(algorithm.type)}>
            <SignalCellularAltIcon />
          </Button>
        </ButtonGroup>
      </Card>
    </div>
  );
};

export default observer(VisualizerContainer);
