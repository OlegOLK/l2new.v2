import React from 'react';
import { Grid, Divider, Button, makeStyles } from '@material-ui/core';
// import { useHistory, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  filterButton: {
    fontSize: '20px',
    textTransform: 'none',
    fontWeight: 400,
  },
}));

export function EvetnsFilterComponent() {
  const classes = useStyles();
  // const history = useHistory();
  // const { path } = useRouteMatch();

  const navigateTo = (e, route: string) => {
    e.stopPropagation();
    //history.push(`${path}/${route}`);
  };
  return (
    <>
      <Grid item>
        <Button
          className={classes.filterButton}
          onClick={e => navigateTo(e, 'quiz')}
        >
          Викторина
        </Button>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item>
        <Button className={classes.filterButton} disabled>
          Пиар
        </Button>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item>
        <Button className={classes.filterButton} disabled>
          Стрим
        </Button>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item>
        <Button className={classes.filterButton} disabled>
          Еще
        </Button>
      </Grid>
      {/* <Divider orientation="vertical" flexItem /> */}
      {/* <CustomFilterComponent /> */}
    </>
  );
}
