import { observer } from "mobx-react-lite";
import React from "react";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";
import VisualizerContainer from "./VisualizerContainer";
import VisualizerInfo from "./VisualizerInfo";
import {
  Card,
  CardContent,
  makeStyles,
  createStyles,
  Theme,
  Grid
} from "@material-ui/core";
import { customColors } from "../app/styling/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: "80%",
      width: "100%",
      overflow: "visible",
      backgroundColor: customColors.greyLight,
      borderBottomStyle: "solid",
      borderWidth: "3px",
      borderColor: customColors.primaryDark
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
      className={classes.card}
      style={{ display: visible ? "block" : "none" }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            <VisualizerContainer algorithm={algorithm} />
          </Grid>
          <Grid item xs={8}>
            <VisualizerInfo algorithm={algorithm} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default observer(VisualizerCard);
