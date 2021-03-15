import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import { RatesFilterComponent } from './rates.filter';
import { ChroniclesFilterComponent } from './chronicles.fiter';
import { TypesFilterComponent } from './types.filter';
import { CustomFilterComponent } from './custom.filter';
import { DateFilter } from './date.filter';
export function ServersFilterComponent() {
  return (
    <>
      <Grid item>
        <RatesFilterComponent />
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item>
        <ChroniclesFilterComponent />
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item>
        <TypesFilterComponent />
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item>
        <DateFilter />
      </Grid>
      <Divider orientation="vertical" flexItem />
      <CustomFilterComponent />
    </>
  );
}
