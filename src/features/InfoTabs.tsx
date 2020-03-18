import React, { useState } from "react";
import {
  ISortingAlgorithm,
  Implementation
} from "../app/models/sortingAlgorithm";
import {
  ButtonGroup,
  Button,
  Typography,
  Container,
  makeStyles,
  Theme,
  createStyles,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  SvgIcon
} from "@material-ui/core";
import { customColors } from "../app/styling/colors";
import DescriptionIcon from "@material-ui/icons/Description";
import CodeIcon from "@material-ui/icons/Code";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ImplementationModal from "./ImplementationModal";
import { JavascriptIcon } from "../app/styling/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      marginTop: "1em",
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
    tabContentContainer: {
      overflowY: "auto",
      position: "relative",
      flexGrow: 1,
      padding: "1em"
    },
    tabContent: {
      overflowY: "auto",
      position: "absolute"
    },
    implementationsList: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      "& > *": {
        margin: theme.spacing(0.5)
      }
    },
    listElement: {
      borderStyle: "dashed",
      borderWidth: "2px",
      borderColor: theme.palette.grey[400],
      width: "auto",
      "&:hover": {
        borderColor: theme.palette.grey[700]
      }
    },
    listElementText: {
      marginLeft: "0.5em"
    }
  })
);

const InfoTabs: React.FC<{ algorithm: ISortingAlgorithm }> = ({
  algorithm
}) => {
  const classes = useStyles();

  const [currentTab, setCurrentTab] = useState(1);
  const [currentImplementation, setCurrentImplementation] = useState<
    Implementation
  >(new Implementation("", "", "", JavascriptIcon));
  const [openModal, setOpenModal] = useState(false);

  const openImplementation = (implementation: Implementation) => {
    setCurrentImplementation(implementation);
    setOpenModal(true);
  };

  return (
    <Paper className={classes.tabs} elevation={5}>
      <ImplementationModal
        open={openModal}
        implementation={currentImplementation}
        size="sm"
        handleClose={() => setOpenModal(false)}
      />

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
        className={classes.tabContentContainer}
        style={{ display: currentTab === 1 ? "block" : "none" }}
      >
        <Typography variant="h5" gutterBottom>
          Description
        </Typography>

        <Typography
          className={classes.tabContent}
          variant="body2"
          dangerouslySetInnerHTML={{
            __html: algorithm.data.description
          }}
        ></Typography>
      </Container>
      <Container
        className={classes.tabContentContainer}
        style={{ display: currentTab === 2 ? "block" : "none" }}
      >
        <Typography variant="h5" gutterBottom>
          Implementaions
        </Typography>
        <div className={classes.tabContent}>
          <List className={classes.implementationsList}>
            {algorithm.data.implementations.map(implementation => {
              return (
                <ListItem
                  className={classes.listElement}
                  key={implementation.language}
                  button
                  onClick={() => openImplementation(implementation)}
                >
                  <implementation.icon />
                  <ListItemText
                    className={classes.listElementText}
                    primary={implementation.title}
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Container>
      <Container
        className={classes.tabContentContainer}
        style={{ display: currentTab === 3 ? "block" : "none" }}
      >
        <Typography variant="h5" gutterBottom>
          Use Cases
        </Typography>
        <Typography variant="body2" color="primary">
          ---Coming Soon---
        </Typography>
      </Container>
    </Paper>
  );
};

export default InfoTabs;
