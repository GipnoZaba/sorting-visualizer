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
  Theme
} from "@material-ui/core";
import { customColors } from "../app/styling/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: "auto",
      width: "70%",
      overflow: "visible",
      backgroundColor: customColors.greyLight,
      borderBottomStyle: "solid",
      borderWidth: "3px",
      borderColor: customColors.primaryDark
    },
    "card-content": {
      display: "grid",
      gridTemplateColumns: "1fr 2fr"
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
      <CardContent className={classes["card-content"]}>
        <VisualizerContainer algorithm={algorithm} />
        <VisualizerInfo algorithm={algorithm} />
      </CardContent>
    </Card>
  );
};

export default observer(VisualizerCard);
