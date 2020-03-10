import React from "react";
import VisualizersCarousel from "../../features/VisualizersCarousel";
import { observer } from "mobx-react-lite";
import Container from "@material-ui/core/Container";
import { Theme, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    }
  })
);

const App = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <VisualizersCarousel />
    </Container>
  );
};

export default observer(App);
