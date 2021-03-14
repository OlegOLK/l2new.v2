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

type LeftPanelProps = {
  addNewRow(name: string, min: number, max: number);
  removeRove(rowNumber: number);
  rates: string[];
  rowNumber: number;
  min?: number;
  max?: number;
  selectedRate?: string;
};

interface Rate {
  min: number;
  max: number;
}

export const RatesRow: FunctionComponent<LeftPanelProps> = ({
  addNewRow,
  rates,
  rowNumber,
}) => {
  const [rate, setRate] = React.useState(rates[0]);
  const [values, setValues] = React.useState<Rate>({
    min: 1,
    max: 1,
  });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRate(event.target.value as string);
  };

  const handleChangeRate = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    prop: keyof Rate,
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const apply = () => {
    setValues({ min: 1, max: 1 });
    addNewRow(rate, values.min, values.max);
    const newRate = rates.find(r => r !== rate);
    setRate(newRate ?? '');
  };

  return (
    <React.Fragment>
      <Grid item xs={2}>
        <FormControl variant="outlined">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rate}
            onChange={handleChange}
          >
            {rates.map((rate, i) => {
              return (
                <MenuItem
                  key={rowNumber + rate}
                  value={rate}
                  selected={i === 0}
                >
                  {rate}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          id="rates-from"
          onChange={e => handleChangeRate(e, 'min')}
          label="min"
          variant="outlined"
          value={values.min}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          id="rates-to"
          onChange={e => handleChangeRate(e, 'max')}
          label="max"
          variant="outlined"
          value={values.max}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton
          onClick={apply}
          color="primary"
          aria-label="add to shopping cart"
        >
          <AddIcon />
        </IconButton>
      </Grid>
    </React.Fragment>
  );
};
