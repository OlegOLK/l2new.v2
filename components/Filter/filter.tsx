import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    section: {
      width: '100%',
      marginBottom: '2vw',
      [theme.breakpoints.up('lg')]: {
        marginTop: '-5vw',
      },
      [theme.breakpoints.down('md')]: {
        marginTop: '3vw',
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: '5vw',
      },
    },
    root: {
      zIndex: 100,
      fontSize: '20px',
    },
    wrapper: {
      height: '100%',
      zIndex: 100,
    },
    button: {
      fontSize: '20px',
      textTransform: 'none',
      fontWeight: 400,
    },
  }),
);

export function FilterComponent(props) {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Grid container direction="row" justify="center" className={classes.root}>
        <Grid item md={6} style={{ zIndex: 100 }}>
          <Paper
            elevation={3}
            style={{ minHeight: '80px', display: 'flex', alignItems: 'center' }}
          >
            <Grid
              item
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              className={classes.wrapper}
            >
              {props.children}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </section>
  );
}
