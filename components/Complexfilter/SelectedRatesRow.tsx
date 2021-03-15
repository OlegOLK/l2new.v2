import React, { FunctionComponent } from 'react';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

type SelectedRatesRowProps = {
  removeRove(rowNumber: number);
  rowNumber: number;
  min: number;
  max: number;
  selectedRate: string;
};

export const SelectedRatesRow: FunctionComponent<SelectedRatesRowProps> = ({
  removeRove,
  rowNumber,
  min,
  max,
  selectedRate,
}) => {
  const [added] = React.useState(true);

  const apply = () => {
    removeRove(rowNumber);
  };

  return (
    <React.Fragment>
      <Grid item xs={2}>
        <FormControl variant="outlined">
          <Select
            disabled={added}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedRate}
          >
            <MenuItem key={rowNumber + selectedRate} value={selectedRate}>
              {selectedRate}
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <TextField
          disabled={added}
          fullWidth
          id="rates-from"
          label="min"
          variant="outlined"
          value={min}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          disabled={added}
          fullWidth
          id="rates-to"
          label="max"
          variant="outlined"
          value={max}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton
          onClick={apply}
          color="primary"
          aria-label="add to shopping cart"
        >
          {!added ? <AddIcon /> : <RemoveIcon />}
        </IconButton>
      </Grid>
    </React.Fragment>
  );
};
