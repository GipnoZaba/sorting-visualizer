import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import {
  makeStyles,
  Theme,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import { RootStoreContext } from "../app/stores/rootStore";
import { AnimationTypes } from "../app/models/visualizerOptions";
import ColorLensIcon from "@material-ui/icons/ColorLens";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    checkbox: {
      height: "1em"
    }
  })
);

const AnimationSettings = () => {
  const classes = useStyles();

  const rootStore = useContext(RootStoreContext);
  const {
    animationSettingsMap,
    toggleAnimationSettings,
    getColor
  } = rootStore.visualizerStore;

  const handleToggle = (value: number) => () => {
    toggleAnimationSettings(value);
  };

  return (
    <List
      className={classes.root}
      subheader={<ListSubheader>Active animations</ListSubheader>}
    >
      <ListItem
        key="checkbox-animation-swap"
        role={undefined}
        dense
        button
        onClick={handleToggle(AnimationTypes.Swap)}
      >
        <ListItemIcon className={classes.checkbox}>
          <Checkbox
            edge="start"
            checked={animationSettingsMap.get(AnimationTypes.Swap)}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary="Swap" />

        <ColorLensIcon style={{ color: getColor(AnimationTypes.Swap) }} />
      </ListItem>

      <ListItem
        key="checkbox-animation-comparison"
        role={undefined}
        dense
        button
        onClick={handleToggle(AnimationTypes.Comparison)}
      >
        <ListItemIcon className={classes.checkbox}>
          <Checkbox
            edge="start"
            checked={animationSettingsMap.get(AnimationTypes.Comparison)}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary="Comparison" />

        <ColorLensIcon style={{ color: getColor(AnimationTypes.Comparison) }} />
      </ListItem>

      <ListItem
        key="checkbox-animation-move"
        role={undefined}
        dense
        button
        onClick={handleToggle(AnimationTypes.Move)}
      >
        <ListItemIcon className={classes.checkbox}>
          <Checkbox
            edge="start"
            checked={animationSettingsMap.get(AnimationTypes.Move)}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary="Move" />
        <ColorLensIcon style={{ color: getColor(AnimationTypes.Move) }} />
      </ListItem>

      <ListItem
        key="checkbox-animation-set"
        role={undefined}
        dense
        button
        onClick={handleToggle(AnimationTypes.Set)}
      >
        <ListItemIcon className={classes.checkbox}>
          <Checkbox
            edge="start"
            checked={animationSettingsMap.get(AnimationTypes.Set)}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary="Set" style={{ flexBasis: "40%" }} />

        <ColorLensIcon style={{ color: getColor(AnimationTypes.Set) }} />
      </ListItem>
    </List>
  );
};

export default observer(AnimationSettings);
