import { Grid, makeStyles, GridProps } from "@material-ui/core";
import { LoginForm } from "../../components";
import React from "react";

const gridLoginProps: GridProps = {
  item: true,
  container: true,
  direction: "column",
  justifyContent: "center",
  alignItems: "center",
  xs: 12,
  md: 5,
  xl: 4,
};

export default function Login() {
  const classes = useStyles();

  return (
    <Grid container component="main">
      <Grid
        item
        className={classes.leftContainer}
        wrap="nowrap"
        {...gridLoginProps}>
        <Grid
          item
          container
          xs
          alignContent="center"
          justifyContent="center"
          className={classes.loginItems}>
          <Grid item container alignItems="center" direction="column"></Grid>
        </Grid>
        <Grid item container xs className={classes.loginItems}>
          <LoginForm
            onSubmit={(result) => {}}
            onForgotPassword={(user) => {}}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  leftContainer: {
    padding: theme.spacing(2, 0),
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      minHeight: "83vh",
    },
  },
  loginItems: {
    maxWidth: 450,
  },
}));