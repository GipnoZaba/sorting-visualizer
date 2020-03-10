import React, { useEffect, useState } from "react";
import { ISortingAlgorithm } from "../app/models/sortingAlgorithm";
import {
  ButtonGroup,
  Button,
  Typography,
  Container,
  makeStyles,
  Theme,
  createStyles,
  Paper
} from "@material-ui/core";
import { customColors } from "../app/styling/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      marginTop: "4em",
      marginRight: "1.5em",
      borderBottomStyle: "solid",
      borderWidth: "2px",
      borderColor: customColors.primaryDark
    },
    tabContent: {
      padding: "1em"
    }
  })
);

const InfoTabs: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  const classes = useStyles();

  const [currentTab, setCurrentTab] = useState(1);

  return (
    <Paper className={classes.tabs} elevation={5}>
      <ButtonGroup
        size="large"
        variant="text"
        color="primary"
        aria-label="contained primary button group"
        fullWidth
      >
        <Button
          onClick={() => setCurrentTab(1)}
          variant={currentTab === 1 ? "contained" : "text"}
        >
          Rand
        </Button>
        <Button
          onClick={() => setCurrentTab(2)}
          variant={currentTab === 2 ? "contained" : "text"}
        >
          Uni
        </Button>
        <Button
          onClick={() => setCurrentTab(3)}
          variant={currentTab === 3 ? "contained" : "text"}
        >
          Rev
        </Button>
        <Button
          onClick={() => setCurrentTab(4)}
          variant={currentTab === 4 ? "contained" : "text"}
        >
          Four
        </Button>
      </ButtonGroup>

      <Container
        className={classes.tabContent}
        style={{ display: currentTab === 1 ? "block" : "none" }}
      >
        <Typography variant="body2">{algorithm.data.description}</Typography>
      </Container>
      <Container
        className={classes.tabContent}
        style={{ display: currentTab === 2 ? "block" : "none" }}
      >
        <Typography variant="body2">111</Typography>
      </Container>
      <Container
        className={classes.tabContent}
        style={{ display: currentTab === 3 ? "block" : "none" }}
      >
        <Typography variant="body2">222</Typography>
      </Container>
      <Container
        className={classes.tabContent}
        style={{ display: currentTab === 4 ? "block" : "none" }}
      >
        <Typography variant="body2">333</Typography>
      </Container>
    </Paper>
  );
};

export default InfoTabs;
