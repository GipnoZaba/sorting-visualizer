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
  CardActionArea,
  CardContent,
  Button
} from "@material-ui/core";
import { customColors } from "../app/styling/colors";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SignalCellular4BarIcon from "@material-ui/icons/SignalCellular4Bar";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import VisualizerSidebar from "./VisualizerSidebar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      position: "relative",
      right: "2.5em",
      display: "flex",
      flexDirection: "row"
    },
    card: {
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
      padding: 0
    },
    buttons: {
      flexBasis: "10%"
    },
    icon: {
      [theme.breakpoints.up("xs")]: {
        fontSize: 20
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: 25
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 30
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: 35
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: 50
      }
    },
    iconPlay: {
      zIndex: 1,
      position: "absolute",
      left: "25%",
      top: "25%",
      width: "50%",
      height: "50%",
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
    isAnimating
  } = rootStore.visualizerStore;

  return (
    <div className={classes.root}>
      <VisualizerSidebar algorithm={algorithm} />

      <Card raised className={classes.card}>
        <CardActionArea
          id="visualizerArea"
          className={classes.actionArea}
          onClick={() => triggerSorting(algorithm.type)}
        >
          {isAnimating(algorithm.type) ? (
            <PauseCircleOutlineIcon
              id="pauseIcon"
              className={classes.iconPlay}
            />
          ) : (
            <PlayCircleOutlineIcon id="playIcon" className={classes.iconPlay} />
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
            <ShuffleIcon className={classes.icon} />
          </Button>
          <Button onClick={() => getSteadyArray(algorithm.type)}>
            <SignalCellular4BarIcon className={classes.icon} />
          </Button>
          <Button onClick={() => getReversedArray(algorithm.type)}>
            <SignalCellular4BarIcon
              className={classes.icon}
              style={{ transform: "scaleX(-1)" }}
            />
          </Button>
          <Button onClick={() => getSteppedArray(algorithm.type)}>
            <SignalCellularAltIcon className={classes.icon} />
          </Button>
        </ButtonGroup>
      </Card>
    </div>
  );
};

export default observer(VisualizerContainer);
