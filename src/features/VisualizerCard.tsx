import { observer } from "mobx-react-lite";
import React from "react";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";
import VisualizerContainer from "./VisualizerContainer";
import VisualizerInfo from "./VisualizerInfo";
import { Card, makeStyles, createStyles, Theme, Grid } from "@material-ui/core";
import { customColors } from "../app/styling/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "80%",
      width: "100%",
      padding: "1em 1em 1.5em 1em",
      backgroundColor: customColors.greyLight,
      borderBottomStyle: "solid",
      borderWidth: "3px",
      borderColor: customColors.primaryDark,
      overflow: "visible"
    },
    content: {
      height: "100%"
    }
  })
);

const VisualizerCard: React.FC<{
  algorithm: ISortingAlgorithm;
  visible: boolean;
}> = ({ algorithm, visible }) => {
  const classes = useStyles();

  return (
    <Card
      raised
      className={classes.root}
      style={{ display: visible ? "block" : "none" }}
    >
      <Grid container className={classes.content}>
        <Grid item xs={4}>
          <VisualizerContainer algorithm={algorithm} />
        </Grid>
        <Grid item xs={8}>
          <VisualizerInfo algorithm={algorithm} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default observer(VisualizerCard);
