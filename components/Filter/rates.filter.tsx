import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Paper, TextField } from '@material-ui/core';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      fontSize: '20px',
      textTransform: 'none',
      fontWeight: 400,
    },
  }),
);

export function RatesFilterComponent() {
  const classes = useStyles();
  // const { t } = useTranslation();
  const [customXp, setCustomXP] = React.useState<number>(1);
  const handleChangeCustomXP = e => {
    e.stopPropagation();
    setCustomXP(e.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>({});

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (
      anchorRef &&
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const rates = [1, 5, 10, 50, 100, 1000, 9999];

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.button}
      >
        Рейты
        {/* {t('sort.Рейты')} */}
        {/* Rates */}
      </Button>
      <Popper
        id="rates-popper"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        // disablePortal
        // className={classes.Popper}
        style={{ zIndex: 191919 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {rates.map(rate => {
                    return (
                      <MenuItem
                        // component={Link}
                        // to={`/rates/${rate}`}
                        onClick={handleClose}
                        key={'rate-menu-item' + rate}
                      >
                        x{rate}
                      </MenuItem>
                    );
                  })}
                  <MenuItem>
                    <TextField
                      id="custom-xp"
                      label="XP"
                      style={{ maxWidth: '80px' }}
                      variant="outlined"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                      value={customXp}
                      onChange={handleChangeCustomXP}
                    />
                    <Button
                    //  component={Link} to={`/rates/${customXp}`}
                    >
                      OK
                    </Button>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
