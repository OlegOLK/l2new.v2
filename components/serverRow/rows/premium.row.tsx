import React from 'react';
import { Grid } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as star } from '../svg/star.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    regularServerRow: {
      color: 'black !important',
      minHeight: '60px',
    },
    regularVipStart: {
      backgroundColor: '#ff9d2f',
      padding: 0,
      color: 'white',
    },

    starWrapper: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      textAlign: 'center',
      justifyContent: 'center',
    },
  }),
);

export function PremiumRow(props) {
  const classes = useStyles();
  return (
    <Grid item xs={12} container className={classes.regularServerRow}>
      <Grid item sm={1} xs={1} md={1} className={classes.regularVipStart}>
        <div className={classes.starWrapper}>
          <SvgIcon key={'icon'} component={star} viewBox="0 0 16 16" />
        </div>
      </Grid>
      <Grid item md={11} sm={11} xs={11}>
        <Grid
          item
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          style={{ height: '100%' }}
        >
          {props.children}
        </Grid>
      </Grid>
    </Grid>
  );
}
