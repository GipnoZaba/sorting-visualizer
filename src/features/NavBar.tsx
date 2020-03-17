import React, { useContext } from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {
  FormControl,
  Select,
  MenuItem,
  ListSubheader
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../app/stores/rootStore";
import { squared, logarithmicLinear } from "../app/common/utils/mathHelpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit",
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "auto",
        minWidth: "15em"
      }
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      color: "white",
      [theme.breakpoints.up("md")]: {
        width: "auto",
        minWidth: "15em"
      }
    }
  })
);

const PrimarySearchAppBar = () => {
  const classes = useStyles();

  const rootStore = useContext(RootStoreContext);
  const { currentCardIndex, setCard } = rootStore.visualizerStore;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if ((event.target.value as number) !== undefined) {
      setCard(event.target.value as number);
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" id="appBar">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Sorting Visualizer
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>

            <FormControl className={classes.inputRoot}>
              <Select
                value={currentCardIndex}
                input={
                  <InputBase
                    id="algorithm-select"
                    classes={{
                      input: classes.inputInput
                    }}
                    onChange={handleChange}
                  />
                }
              >
                <ListSubheader
                  dangerouslySetInnerHTML={{
                    __html: squared
                  }}
                ></ListSubheader>
                <MenuItem value={1}>Bubble Sort</MenuItem>
                <MenuItem value={2}>Insertion Sort</MenuItem>
                <MenuItem value={3}>Selection Sort</MenuItem>
                <ListSubheader
                  dangerouslySetInnerHTML={{
                    __html: logarithmicLinear
                  }}
                ></ListSubheader>
                <MenuItem value={4}>Quick Sort</MenuItem>
                <MenuItem value={5}>Merge Sort</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default observer(PrimarySearchAppBar);
