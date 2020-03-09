import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { RootStoreContext } from "../app/stores/rootStore";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { customColors } from "../app/styling/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visualizer: {
      width: "100%",
      height: "100%",
      backgroundColor: customColors.grey
    },
    vertical: {
      display: "grid",
      gridTemplateRows: "repeat(100, minmax(1px, 1fr))",
      rowGap: "1px"
    },
    horizontal: {
      display: "grid",
      gridTemplateColumns: "repeat(100, minmax(1px, 1fr))",
      columnGap: "1px",
      alignItems: "flex-end"
    },
    bar: {
      height: "100%"
    }
  })
);

const Visualizer: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  const classes = useStyles();
  const rootStore = useContext(RootStoreContext);

  const { getArray } = rootStore.visualizerStore;

  return (
    <div className={[classes.visualizer, classes.vertical].join(" ")}>
      {getArray(algorithm.type).map((element, index) => {
        return (
          <div
            className={classes.bar}
            key={index}
            style={{
              width: `${element.getValue()}%`,
              backgroundColor: `${element.getColor()}`
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default observer(Visualizer);
