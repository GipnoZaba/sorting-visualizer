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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      marginTop: "4em",
      marginRight: "1.5em"
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

  const getTabButtonId = (tabId: number) => `${algorithm.type}Tab${tabId}`;
  const getTabContentId = (tabContentId: number) =>
    `${algorithm.type}TabContent${tabContentId}`;

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
          id={getTabButtonId(1)}
          onClick={() => setCurrentTab(1)}
          variant={currentTab === 1 ? "contained" : "text"}
        >
          Rand
        </Button>
        <Button
          id={getTabButtonId(2)}
          onClick={() => setCurrentTab(2)}
          variant={currentTab === 2 ? "contained" : "text"}
        >
          Uni
        </Button>
        <Button
          id={getTabButtonId(3)}
          onClick={() => setCurrentTab(3)}
          variant={currentTab === 3 ? "contained" : "text"}
        >
          Rev
        </Button>
        <Button
          id={getTabButtonId(4)}
          onClick={() => setCurrentTab(4)}
          variant={currentTab === 4 ? "contained" : "text"}
        >
          Four
        </Button>
      </ButtonGroup>

      <Container
        id={getTabContentId(1)}
        className={classes.tabContent}
        style={{ display: currentTab === 1 ? "block" : "none" }}
      >
        <Typography variant="body2">{algorithm.data.description}</Typography>
      </Container>
      <Container
        id={getTabContentId(2)}
        className={classes.tabContent}
        style={{ display: currentTab === 2 ? "block" : "none" }}
      >
        <Typography variant="body2">111</Typography>
      </Container>
      <Container
        id={getTabContentId(3)}
        className={classes.tabContent}
        style={{ display: currentTab === 3 ? "block" : "none" }}
      >
        <Typography variant="body2">222</Typography>
      </Container>
      <Container
        id={getTabContentId(4)}
        className={classes.tabContent}
        style={{ display: currentTab === 4 ? "block" : "none" }}
      >
        <Typography variant="body2">333</Typography>
      </Container>
    </Paper>
  );
};

export default InfoTabs;
