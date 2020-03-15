import React from "react";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import { observer } from "mobx-react-lite";
import {
  makeStyles,
  Theme,
  createStyles,
  Popover,
  Box
} from "@material-ui/core";
import AnimationSettings from "./AnimationSettings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      [theme.breakpoints.up("xs")]: {
        fontSize: 20
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: 25
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 30
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: 35
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: 50
      }
    },
    content: {
      padding: theme.spacing(2)
    }
  })
);

const VisualizerSettings = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        variant="text"
        onClick={handleClick}
      >
        <SettingsIcon color="action" className={classes.icon} />
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <Box className={classes.content}>
          <AnimationSettings />
        </Box>
      </Popover>
    </div>
  );
};

export default observer(VisualizerSettings);
