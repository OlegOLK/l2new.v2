import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      position: 'relative',
      // backgroundImage: 'linear-gradient(#ff9d2f, #ff6126)',
      backgroundImage: 'url(/assets/banner.webp)',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      color: 'white',
      height: '400px',
      width: '100%',
      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0% 100%)',
      marginTop: '-10px',
    },
  }),
);

export function HeaderComponent() {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      {/* <img src="/assets/banner.jpg" alt="banner" height="auto" width="100%" /> */}
    </header>
  );
}
