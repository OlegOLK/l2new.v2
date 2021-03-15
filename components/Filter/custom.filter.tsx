import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box, Chip } from '@material-ui/core';

import { ComplexSearchDialog } from '../Leftpanel/ComplexSearchDialog';
import { ComplexFilter } from '../../lib/models/complexfilter';


const useStyles = makeStyles(() =>
  createStyles({
    button: {
      fontSize: '20px',
      textTransform: 'none',
      fontWeight: 400,
    },
    chipOverflow: {
      textOverflow: 'ellipsis',
      maxWidth: '80px',
    },
  }),
);

function getCustomFilters() {
  return JSON.parse(localStorage.getItem('filter') ?? '{}');
}

export function CustomFilterComponent() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [customFilters, setCustomFilters] = React.useState(getCustomFilters());
  const [dialogKey, setDialogKey] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (exit: boolean, modalFilter: ComplexFilter) => {
    if (exit) {
      setOpen(false);
      return;
    }
    const jsonFilter = localStorage.getItem('filter');
    let filter;
    if (jsonFilter) {
      filter = JSON.parse(jsonFilter);
      filter.userFilters.push(modalFilter);
      localStorage.setItem('filter', JSON.stringify(filter));
    } else {
      localStorage.setItem(
        'filter',
        JSON.stringify({
          userFilters: [modalFilter],
        }),
      );
    }
    setCustomFilters(getCustomFilters());
    setOpen(false);
    let kk = dialogKey + 1;
    setDialogKey(kk);
  };

  // const history = useHistory();

  const handleDeleteFilter = (index: number) => {
    const jsonFilter = localStorage.getItem('filter');
    if (!jsonFilter) {
      return;
    }
    var complexFilter = JSON.parse(jsonFilter);
    complexFilter.userFilters.splice(index, 1);
    localStorage.setItem('filter', JSON.stringify(complexFilter));
    setCustomFilters(getCustomFilters());
  };

  const handleClickFilter = (name: string) => {
    // history.push(`/custom/${name}`);
  };
  const isFacetExist = () => {
    return customFilters.userFilters && customFilters.userFilters.length > 0;
  };
  return (
    <>
      <Grid item>
        <Button onClick={handleClickOpen} className={classes.button}>
          Фильтр
          {/* {t('sort.Фильтр')} */}
        </Button>
        <ComplexSearchDialog
          close={handleClose}
          key={dialogKey}
          isOpen={open}
        />
      </Grid>

      {isFacetExist() ? (
        <Grid item container md={12} style={{ borderTop: '1px solid black' }}>
          {customFilters.userFilters.map((filter, i) => {
            return (
              <Grid key={'grid' + i + filter.name} item md={4} sm={4} xs={4}>
                <Box key={'box' + i + filter.name} textAlign="left" my={1}>
                  <Chip
                    className={classes.chipOverflow}
                    label={filter.name}
                    clickable
                    size="small"
                    color="primary"
                    variant="outlined"
                    onDelete={() => handleDeleteFilter(i)}
                    onClick={() => handleClickFilter(filter.name)}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      ) : null}
    </>
  );
}
