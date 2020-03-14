import React, { Fragment } from "react";
import VisualizersCarousel from "../../features/VisualizersCarousel";
import { observer } from "mobx-react-lite";
import Container from "@material-ui/core/Container";
import { Theme, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const App = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <VisualizersCarousel />
    </Fragment>
  );
};

export default observer(App);
