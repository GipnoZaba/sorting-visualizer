import React, { Fragment } from "react";
import VisualizersCarousel from "../../features/VisualizersCarousel";
import { observer } from "mobx-react-lite";
import PrimarySearchAppBar from "../../features/NavBar";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  })
);

const App = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <PrimarySearchAppBar />
        <VisualizersCarousel />
      </div>
    </Fragment>
  );
};

export default observer(App);
