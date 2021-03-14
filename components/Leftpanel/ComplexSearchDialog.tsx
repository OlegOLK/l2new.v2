import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
} from '@material-ui/core';
import { CHRONICLES, RATES } from '../../lib/models/constants';

import { RatesRow } from '../Complexfilter/RatesRow';
import { SelectedRatesRow } from '../Complexfilter/SelectedRatesRow';

const useStyles = makeStyles(() => ({
  uppercase: {
    textTransform: 'uppercase',
  },
}));

type ComplexSearchDialogProps = {
  close(exit: boolean, filter: any);
  isOpen: boolean;
};

export const ComplexSearchDialog: FunctionComponent<ComplexSearchDialogProps> = ({
  isOpen,
  close,
}) => {
  const classes = useStyles();
  const chronicles = CHRONICLES.map(function (value) {
    return { label: value, selected: false };
  });
  const [rows, setRows] = React.useState<any[]>([]);
  const [rates, setRates] = React.useState(RATES);
  const [filterName, setFilterName] = React.useState('');
  const [stateChronicles, setState] = React.useState(chronicles);
  const [filterNameError, setFilterNameError] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index) => {
    let statusCopy = [...stateChronicles];
    statusCopy[index].selected = event.target.checked;
    setState(statusCopy);
  };

  const handleFilterNameChage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFilterName(event.target.value);
    if (event.target.value.length === 0 && !filterNameError) {
      setFilterNameError(true);
    } else if (event.target.value.length !== 0 && filterNameError) {
      setFilterNameError(false);
    }
  };

  const handleClose = (exit: boolean) => {
    if (exit) {
      close(exit, null);
    }
    const chronicles = stateChronicles
      .filter(ch => ch.selected === true)
      .map(chronic => chronic);

    const copyRows = [...rows];
    const name = filterName;
    close(exit, { rates: copyRows, chronicles: chronicles, name: name });
  };

  const addNewRow = (name: string, min: number, max: number) => {
    setRows([...rows, { name, min, max }]);
    let statusCopy = [...rates];
    statusCopy.splice(statusCopy.indexOf(name), 1);
    setRates(statusCopy);
  };

  const removeRow = (rowNumber: number) => {
    let copy = [...rows];
    const removed = copy.splice(rowNumber, 1);
    setRates([...rates, removed[0].name]);
    setRows(copy);
  };

  const handleBlur = () => {
    if (filterName.length === 0 && !filterNameError) {
      setFilterNameError(true);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle className={classes.uppercase} id="form-dialog-title">
        Создайте удобный фильтр для себя!
        {/* {t('leftPanel.dialog.header')} */}
      </DialogTitle>
      <DialogContent dividers>
        <Typography className={classes.uppercase} gutterBottom>
          фильтр по хроникам
          {/* {t('leftPanel.dialog.subheader')} */}
        </Typography>
        <Grid container spacing={1}>
          {stateChronicles.map((ch, index) => {
            return (
              <Grid key={'grid' + ch.label + index} item xs={3}>
                <FormControlLabel
                  key={'FormControlLabel' + ch.label + index}
                  control={
                    <Checkbox
                      key={'Checkbox' + ch.label + index}
                      checked={ch.selected}
                      onChange={e => handleChange(e, index)}
                      name={ch.label}
                    />
                  }
                  label={ch.label}
                />
              </Grid>
            );
          })}
        </Grid>
        <Box mt={2}>
          <Typography className={classes.uppercase} gutterBottom>
            фильт по рейтам
            {/* {t('leftPanel.dialog.selectrates')} */}
          </Typography>

          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            {rows.map((row, i) => {
              return (
                <SelectedRatesRow
                  key={'selectedratesrow' + row.name + i}
                  rowNumber={i}
                  removeRove={removeRow}
                  min={row.min}
                  max={row.max}
                  selectedRate={row.name}
                />
              );
            })}
            {rates.length > 0 && (
              <RatesRow
                rates={rates}
                rowNumber={0}
                removeRove={removeRow}
                addNewRow={addNewRow}
              />
            )}
          </Grid>
        </Box>
        <Box mt={2}>
          <Typography className={classes.uppercase} gutterBottom>
            {/* {t('leftPanel.dialog.setname')} */}
            задайте имя для фильтра
          </Typography>
          <TextField
            id="filter-name"
            // placeholder={t('leftPanel.dialog.setname')}
            placeholder={'задайте имя для фильтра'}
            fullWidth
            error={filterNameError}
            // helperText={t('leftPanel.dialog.setname')}
            helperText={'задайте имя для фильтра'}
            onBlur={handleBlur}
            value={filterName}
            onChange={handleFilterNameChage}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => handleClose(true)} color="primary">
          {/* {t('leftPanel.dialog.exit')} */}
          Закрыть
        </Button>
        <Button
          autoFocus
          disabled={filterName.length === 0}
          onClick={() => handleClose(false)}
          color="primary"
        >
          Сохранить
          {/* {t('leftPanel.dialog.save')} */}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
