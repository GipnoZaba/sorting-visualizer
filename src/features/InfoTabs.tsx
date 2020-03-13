import React, { useState } from "react";
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
import DescriptionIcon from "@material-ui/icons/Description";
import CodeIcon from "@material-ui/icons/Code";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      marginTop: "1em",
      marginRight: "1.5em",
      borderBottomStyle: "solid",
      borderWidth: "2px",
      borderColor: customColors.primaryDark
    },
    header: {
      marginBottom: "1em"
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
          <DescriptionIcon />
        </Button>
        <Button
          onClick={() => setCurrentTab(2)}
          variant={currentTab === 2 ? "contained" : "text"}
        >
          <CodeIcon />
        </Button>
        <Button
          onClick={() => setCurrentTab(3)}
          variant={currentTab === 3 ? "contained" : "text"}
        >
          <AddIcon />
          <RemoveIcon />
        </Button>
      </ButtonGroup>

      <Container
        className={classes.tabContent}
        style={{ display: currentTab === 1 ? "block" : "none" }}
      >
        <Typography variant="h5" className={classes.header}>
          Description
        </Typography>
        <Typography variant="body2">{algorithm.data.description}</Typography>
      </Container>
      <Container
        className={classes.tabContent}
        style={{ display: currentTab === 2 ? "block" : "none" }}
      >
        <Typography variant="h5" className={classes.header}>
          Implementaions
        </Typography>
        <Typography variant="body2">
          Implementations Implementations Implementations Implementations
          Implementations
        </Typography>
      </Container>
      <Container
        className={classes.tabContent}
        style={{ display: currentTab === 3 ? "block" : "none" }}
      >
        <Typography variant="h5" className={classes.header}>
          Use Cases
        </Typography>
        <Typography variant="body2">
          Use CasesUse CasesUse CasesUse CasesUse Cases
        </Typography>
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
