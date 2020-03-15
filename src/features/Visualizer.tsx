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
      height: "100%"
    },
    vertical: {
      display: "grid",
      gridTemplateRows: "repeat(100, minmax(1px, 1fr))",
      rowGap: "1px"
    },
    bar: {
      display: "flex",
      height: "100%",
      borderRadius: "0 2px 2px 0"
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
    <div
      className={[classes.visualizer, classes.vertical].join(" ")}
      style={{
        gridTemplateRows: `repeat(${
          getArray(algorithm.type).length
        }, minmax(1px, 1fr))`
      }}
    >
      {getArray(algorithm.type).map((element, index) => {
        return (
          <div key={index} className={classes.bar}>
            <div
              style={{
                width: `${element.getValue() === 0 ? 1 : element.getValue()}%`,
                backgroundColor: `${element.getColor()}`
              }}
            ></div>
            <div
              style={{
                width: `${100 - element.getValue()}%`,
                backgroundColor: `${customColors.grey}`
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default observer(Visualizer);
