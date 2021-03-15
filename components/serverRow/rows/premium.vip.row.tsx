import React from 'react';
import { Grid } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as star } from '../svg/star.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    starWrapper: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      textAlign: 'center',
      justifyContent: 'center',
    },
    premiumServerRowVip: {
      alignItems: 'stretch',
      textAlign: 'center',
      backgroundImage: 'linear-gradient(#ff9d2f, #ff6126)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '60px',
      padding: '3px',

      textDecoration: 'none',
      '&:after': {
        animation: `$shine 5s ${theme.transitions.easing.easeInOut} infinite`,
        animationFillMode: 'forwards',
        content: '""',
        position: 'absolute',
        left: '-30%',
        width: '130%',
        height: '100%',
        opacity: 0,
        transform: 'rotate(30deg)',
        background: 'rgba(255, 255, 255, 0.13)',
        backgroundImage:
          'linear-gradient(to right, rgba(255, 255, 255, 0.13) 0 %, rgba(255, 255, 255, 0.13) 77 %, rgba(255, 255, 255, 0.5) 92 %, rgba(255, 255, 255, 0.0) 100 %)',
      },
    },
    '@keyframes shine': {
      '0%': {
        opacity: 1,
        top: '0%',
        left: '-100%',
        transitionProperty: 'left, top, opacity',
        transitionDuration: '0.7s, 0.7s, 0.15s',
        transitionTimingFunction: 'ease',
      },
      '90%': {
        opacity: 1,
        left: '100%',
        transitionProperty: 'left, top',
        transitionDuration: '0.7s, 0.7s',
        transitionTimingFunction: 'ease',
      },
      '100%': {
        opacity: 0,
        left: '100%',
      },
    },
    vipStar: {
      padding: 0,
      color: 'white',
    },
  }),
);

export function PremiumVipRow(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} container className={classes.premiumServerRowVip}>
      <Grid item md={1} className={classes.vipStar}>
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
        >
          {props.children}
        </Grid>
      </Grid>
    </Grid>
  );
}
