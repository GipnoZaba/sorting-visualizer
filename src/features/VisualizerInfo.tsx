import { observer } from "mobx-react-lite";
import React from "react";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";
import InfoTabs from "./InfoTabs";
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  Chip,
  Tooltip,
  Divider
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tags: {
      marginTop: "1em",
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5)
      }
    }
  })
);

const VisualizerInfo: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h2">{algorithm.data.title}</Typography>
      <Divider variant="fullWidth" />
      <div className={classes.tags}>
        <Tooltip title="Link?" interactive>
          <Chip
            label={"Θ(" + algorithm.data.timeComplexity + ")"}
            color="primary"
          />
        </Tooltip>

        <Chip
          label={"O(" + algorithm.data.spaceComplexity + ")"}
          color="primary"
        />
      </div>
      <InfoTabs algorithm={algorithm} />
    </Box>
  );
};

export default observer(VisualizerInfo);
