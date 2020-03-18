import React, { useState } from "react";
import {
  ISortingAlgorithm,
  languages,
  ProgrammingLanguage
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
  ListItemText
} from "@material-ui/core";
import { customColors } from "../app/styling/colors";
import DescriptionIcon from "@material-ui/icons/Description";
import CodeIcon from "@material-ui/icons/Code";
import ImplementationModal from "./ImplementationModal";
import { JavascriptIcon } from "../app/styling/icons";
import { googlecode } from "react-code-blocks";

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
  const [currentLanguage, setCurrentLanguage] = useState(
    new ProgrammingLanguage("", "", googlecode, JavascriptIcon)
  );
  const [currentCode, setCurrentCode] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const openImplementation = (
    code: string | undefined,
    language: ProgrammingLanguage
  ) => {
    if (code === undefined) {
      return;
    }

    setCurrentLanguage(language);
    setCurrentCode(code);
    setOpenModal(true);
  };

  return (
    <Paper className={classes.tabs} elevation={5}>
      <ImplementationModal
        open={openModal}
        code={currentCode}
        implementation={currentLanguage}
        size="md"
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
          <CodeIcon className={classes.icon} />
        </Button>
        <Button
          onClick={() => setCurrentTab(2)}
          variant={currentTab === 2 ? "contained" : "text"}
        >
          <DescriptionIcon className={classes.icon} />
        </Button>
      </ButtonGroup>

      <Container
        className={classes.tabContentContainer}
        style={{ display: currentTab === 1 ? "block" : "none" }}
      >
        <Typography variant="h5" gutterBottom>
          Implementations
        </Typography>
        <div className={classes.tabContent}>
          <List className={classes.implementationsList}>
            {languages.map(language => {
              let implementation = algorithm.data.implementationsMap.get(
                language.language
              );

              return (
                <ListItem
                  disabled={implementation === undefined}
                  className={classes.listElement}
                  key={language.language}
                  button
                  onClick={() => openImplementation(implementation, language)}
                >
                  <language.icon />
                  <ListItemText
                    className={classes.listElementText}
                    primary={language.title}
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Container>
      <Container
        className={classes.tabContentContainer}
        style={{ display: currentTab === 2 ? "block" : "none" }}
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
    </Paper>
  );
};

export default InfoTabs;
