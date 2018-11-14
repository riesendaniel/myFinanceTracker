import React from "react";
import { withStyles } from "@material-ui/core/styles";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Paper,Typography } from '@material-ui/core';
import { auth, uiConfig } from "../config/firebase";

const styles = theme => ({
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  }
});

class SignIn extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper>
        <Typography variant="headline" align="center" component="h2">Login</Typography>
        <div className={classes.heroContent}>
          <div className={classes.heroButtons}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(SignIn);
