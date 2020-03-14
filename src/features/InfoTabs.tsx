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
      height: "21em",
      borderBottomStyle: "solid",
      borderWidth: "2px",
      borderColor: customColors.primaryDark
    },
    icon: {
      [theme.breakpoints.up("xs")]: {
        fontSize: 15
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: 20
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 25
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: 30
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: 50
      }
    },
    tabContent: {
      height: "80%",
      padding: "1em",
      overflowY: "scroll",
      overflowX: "hidden"
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
          <DescriptionIcon className={classes.icon} />
        </Button>
        <Button
          onClick={() => setCurrentTab(2)}
          variant={currentTab === 2 ? "contained" : "text"}
        >
          <CodeIcon className={classes.icon} />
        </Button>
        <Button
          onClick={() => setCurrentTab(3)}
          variant={currentTab === 3 ? "contained" : "text"}
        >
          <AddIcon className={classes.icon} />
          <RemoveIcon className={classes.icon} />
        </Button>
      </ButtonGroup>

      <Container
        className={classes.tabContent}
        style={{ display: currentTab === 1 ? "block" : "none" }}
      >
        <Typography variant="h5" gutterBottom>
          Description
        </Typography>
        <Typography variant="body2">
          <p
            dangerouslySetInnerHTML={{
              __html: algorithm.data.description
            }}
          ></p>
        </Typography>
      </Container>
      <Container
        className={classes.tabContent}
        style={{ display: currentTab === 2 ? "block" : "none" }}
      >
        <Typography variant="h5" gutterBottom>
          Implementaions
        </Typography>
        <Typography variant="body2" color="primary">
          ---Coming Soon---
        </Typography>
      </Container>
      <Container
        className={classes.tabContent}
        style={{ display: currentTab === 3 ? "block" : "none" }}
      >
        <Typography variant="h5" gutterBottom>
          Use Cases
        </Typography>
        <Typography variant="body2" color="primary">
          ---Coming Soon---
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
