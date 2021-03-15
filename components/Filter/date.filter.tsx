import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useRouter } from 'next/router';
import * as dfn from 'date-fns';
const useStyles = makeStyles(() =>
  createStyles({
    button: {
      fontSize: '20px',
      textTransform: 'none',
      fontWeight: 400,
    },
  }),
);

const localeMap = {
  en: enLocale,
  ru: ruLocale,
};

export function DateFilter() {
  const classes = useStyles();
  // const { t, i18n } = useTranslation();
  // const [locale, setLocale] = React.useState('ru');
  // const history = useHistory();
  const [selectedDate, handleDateChange] = React.useState<
    MaterialUiPickersDate
  >(new Date());
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  // React.useEffect(() => {
  //   setLocale(i18n.language);
  // }, [i18n.language]);

  const handleDate = (date: MaterialUiPickersDate) => {
    router.push({
      pathname: '/',
      query: `date=${dfn.format(
        dfn.parseISO(date?.toISOString() || ''),
        'dd.MM.yyyy',
      )}`,
    })
    handleDateChange(date);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <>
        <Button
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.button}
        >
          Дата
          {/* {t('sort.Дата')} */}
        </Button>
        <div style={{ visibility: 'hidden', width: 0, height: 0 }}>
          <DatePicker
            open={open}
            onClose={handleToggle}
            disableToolbar
            format="dd-MM-yyyy"
            value={selectedDate}
            onChange={handleDate}
          />
        </div>
      </>
    </MuiPickersUtilsProvider>
  );
}
