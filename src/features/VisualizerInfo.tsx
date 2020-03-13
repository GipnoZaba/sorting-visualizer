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
import TimerIcon from "@material-ui/icons/Timer";
import SdStorageIcon from "@material-ui/icons/SdStorage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tags: {
      display: "flex",
      flexWrap: "wrap",
      marginBottom: "1em",
      "& > *": {
        margin: theme.spacing(0.5)
      }
    },
    chip: {
      fontSize: "1em"
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
      <div className={classes.tags}>
        <Tooltip title="Average time complexity" interactive>
          <Chip
            className={classes.chip}
            color="primary"
            icon={<TimerIcon />}
            label={
              <p
                dangerouslySetInnerHTML={{
                  __html: algorithm.data.timeComplexity
                }}
              ></p>
            }
          ></Chip>
        </Tooltip>
        <Tooltip title="Space complexity" interactive>
          <Chip
            className={classes.chip}
            color="primary"
            icon={<SdStorageIcon />}
            label={
              <p
                dangerouslySetInnerHTML={{
                  __html: algorithm.data.spaceComplexity
                }}
              ></p>
            }
          />
        </Tooltip>
      </div>
      <Divider variant="fullWidth" />
      <InfoTabs algorithm={algorithm} />
    </Box>
  );
};

export default observer(VisualizerInfo);
