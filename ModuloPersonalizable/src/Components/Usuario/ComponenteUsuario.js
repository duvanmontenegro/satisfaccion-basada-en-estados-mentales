import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ImgStepper from "../../Data/Stepper.PNG";
import ImgStepperFin from "../../Data/StepperFin.PNG";
import ImgStepperMedio from "../../Data/StepperMedio.PNG";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
export default function CenteredGrid() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <br />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.paper}>
            <h5>
              Esta barra de estado te indica en que momento de la calibacion te
              encuentras
            </h5>
            <img
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
                marginTop: 10,
              }}
              width="80%"
              height="auto"
              src={ImgStepperFin}
              alt="StepperFin"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}