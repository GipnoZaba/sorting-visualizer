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
  Divider,
  Container
} from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import SdStorageIcon from "@material-ui/icons/SdStorage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100%"
    },
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
    <Box className={classes.root}>
      <Box style={{ flexBasis: "20%" }}>
        <Typography variant="h2">{algorithm.data.title}</Typography>
        <div className={classes.tags}>
          <Tooltip title="Average time complexity" interactive>
            <Chip
              className={classes.chip}
              color="primary"
              icon={<TimerIcon />}
              label={
                <span
                  dangerouslySetInnerHTML={{
                    __html: algorithm.data.timeComplexity
                  }}
                ></span>
              }
            ></Chip>
          </Tooltip>
          <Tooltip title="Space complexity" interactive>
            <Chip
              className={classes.chip}
              color="primary"
              icon={<SdStorageIcon />}
              label={
                <span
                  dangerouslySetInnerHTML={{
                    __html: algorithm.data.spaceComplexity
                  }}
                ></span>
              }
            />
          </Tooltip>
        </div>
        <Divider variant="fullWidth" />
      </Box>

      <InfoTabs algorithm={algorithm} />
    </Box>
  );
};

export default observer(VisualizerInfo);
