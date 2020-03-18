import React from "react";
import Button from "@material-ui/core/Button";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CodeBlock, dracula } from "react-code-blocks";
import { ProgrammingLanguage } from "../app/models/sortingAlgorithm";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    codeBlock: {
      letterSpacing: "0.15em"
    }
  })
);

const ImplementationModal: React.FC<{
  open: boolean;
  implementation: ProgrammingLanguage;
  code: string;
  size: DialogProps["maxWidth"];
  handleClose: () => void;
}> = ({ open, implementation, code, size, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth={size}
      scroll="paper"
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{implementation.title}</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
          className={classes.codeBlock}
        >
          <CodeBlock
            text={code}
            language={implementation.language}
            showLineNumbers={true}
            theme={dracula}
            wrapLines
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImplementationModal;
