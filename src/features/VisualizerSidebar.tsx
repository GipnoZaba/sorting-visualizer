import React, { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import Container from "@material-ui/core/Container";
import {
  Theme,
  makeStyles,
  createStyles,
  Paper,
  Slider,
  ButtonGroup,
  Button,
  Badge
} from "@material-ui/core";
import { customColors } from "../app/styling/colors";
import { green, orange, red } from "@material-ui/core/colors";
import { RootStoreContext } from "../app/stores/rootStore";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";
import SpeedIcon from "@material-ui/icons/Speed";

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
      display: "flex",
      flexDirection: "column",
      height: "100%",
      alignItems: "center",
      borderBottomStyle: "solid",
      borderWidth: "2px",
      borderColor: customColors.secondaryLight
    },
    buttons: {
      flexBasis: "10%"
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

const VisualizerSidebar: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  const classes = useStyles();

  const rootStore = useContext(RootStoreContext);

  const {
    handleBarsAmountChange,
    changeSpeed,
    speed
  } = rootStore.visualizerStore;

  const handleChangeSpeed = (speed: string) => {
    changeSpeed(speed);
  };

  return (
    <Paper className={classes.root} elevation={20}>
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
        <Button
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
        </Button>
        <Button
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
        </Button>
        <Button
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
        </Button>
      </ButtonGroup>
    </Paper>
  );
};

export default observer(VisualizerSidebar);
