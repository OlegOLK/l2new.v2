import { FunctionComponent } from 'react';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  MenuItem,
  Grid,
  Menu,
  Hidden,
  Divider,
  IconButton,
  Link as MaterialLink,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { LeftSlider } from '../Leftpanel/LeftSlider';
import React from 'react';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { RatesFilterComponent } from '../Filter/rates.filter';
import { ChroniclesFilterComponent } from '../Filter/chronicles.fiter';
import clsx from 'clsx';
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textTransform: 'uppercase',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
  },
  toolbar: {
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  box: {
    display: 'flex',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  list: {
    textTransform: 'uppercase',
  },
  button: {
    fontSize: '20px',
    textTransform: 'none',
    fontWeight: 400,
    color: 'black',
    textDecoration: 'none',
    '& > span > a': {
      fontSize: '20px',
      textTransform: 'none',
      fontWeight: 400,
      textDecoration: 'none',
    },
  },
  filterButton: {
    fontSize: '20px',
    textTransform: 'none',
    fontWeight: 400,
  },
}));

type CardProps = {};

export const NavBar: FunctionComponent<CardProps> = () => {
  const [
    discussAnchorEl,
    setDiscussAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const [drawerOpen, setDrawerOpenState] = React.useState(false);
  const [filtersOpen, setFiltersOpenState] = React.useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpenState(open);
  };

  const toggleFiltersDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setFiltersOpenState(open);
  };

  const [
    languageAnchorEl,
    setLanguageAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDiscussAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setDiscussAnchorEl(null);
  };

  const handleSelectLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };
  const handleSelectLanguageClose = (locale: string) => {
    setLanguageAnchorEl(null);
    // i18n.changeLanguage(locale);
  };
  const [open, setOpen] = React.useState(false);

  const toggleSwipeableDrawer = () => {
    setOpen(!open);
  };

  const [authDialogOpen, setAuthDialogOpen] = React.useState(false);
  const openDialog = () => {
    setAuthDialogOpen(true);
  };

  const closeDialog = () => {
    setAuthDialogOpen(false);
  };

  const navigateTo = (e, route: string) => {
    e.stopPropagation();
    router.replace(route, null, { shallow: false });
    // history.push(route);
  };

  // const handleLogout = () => {
  //   dispatch(actions.logout());
  //   history.push('/');
  // };

  const goToDiscord = () => {
    window.open(
      'https://discord.gg/kdsrYj4xj2',
      '__blank',
      'noopener noreferrer',
    );
  };

  const classes = useStyles();
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Hidden mdDown>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.root}
          >
            <Grid item>
            <Button
                className={classes.button}
                onClick={e => navigateTo(e, '/')}
              >
                <img
                  src="/logo192.png"
                  alt="l2new logo"
                  height="40px"
                  width="40px"
                />{' '}
                &nbsp;
                l2new
              </Button>
            </Grid>
            <Grid item>
            <Button
                className={classes.button}
                onClick={e => navigateTo(e, '/advertisement')}
              >
                Реклама
              </Button>
              {/* <Link href="/advertisement">
                <a>Реклама</a>
              </Link> */}
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.button}
                endIcon={<ArrowDropDownIcon color="primary" />}
              >
                Обсуждение
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={discussAnchorEl}
                keepMounted
                open={Boolean(discussAnchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <MaterialLink
                    href="https://discord.gg/kdsrYj4xj2"
                    target="__blank"
                    rel="noreferrer noopener"
                    color="primary"
                  >
                    Discord
                  </MaterialLink>
                </MenuItem>
                <MenuItem disabled onClick={handleClose}>
                  Форум
                </MenuItem>
              </Menu>
              <Button
                className={classes.button}
              >
                <MaterialLink
                  href="https://discord.gg/GEgCbHkWb4"
                  target="__blank"
                  rel="noreferrer noopener"
                  className={classes.button}
                >
                  Предложения по сайту
                </MaterialLink>
              </Button>
              <Button
                className={classes.button}
                onClick={e => navigateTo(e, '/events')}
              >
                Заработать аденки
              </Button>
            </Grid>
          </Grid>
        </Hidden>
        <Hidden lgUp>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuOpenIcon />
          </IconButton>
          <Divider orientation="vertical" flexItem />

          <Button
            onClick={toggleFiltersDrawer(true)}
            className={clsx(classes.filterButton, classes.button)}
          >
            Фильтр
          </Button>

          <RatesFilterComponent />
          <ChroniclesFilterComponent />
          <LeftSlider
            openned={filtersOpen}
            toggleDrawer={toggleFiltersDrawer}
          />
          {/* <SwipeableDrawer
            anchor={'left'}
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <List
              className={classes.list}
              component="nav"
              aria-label="main mailbox folders"
            >
              <ListItem button onClick={e => navigateTo(e, '/')}>
                <ListItemIcon>
                  <HomeIcon color="primary" />
                </ListItemIcon>
                <ListItemText color="primary" primary={t('nav.home')} />
              </ListItem>
              <ListItem button onClick={e => navigateTo(e, '/advertisement')}>
                <ListItemIcon>
                  <TrendingUpIcon color="primary" />
                </ListItemIcon>
                <ListItemText color="primary" primary={t('nav.advert')} />
              </ListItem>
              <ListItem button onClick={goToDiscord}>
                <ListItemIcon>
                  <QuestionAnswerIcon color="primary" />
                </ListItemIcon>
                <ListItemText color="primary" primary={t('nav.discuss')} />
              </ListItem>
              <ListItem button disabled>
                <ListItemIcon>
                  <InfoIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  color="primary"
                  primary={t('nav.knowledgebase')}
                />
              </ListItem>
              <ListItem button onClick={e => navigateTo(e, '/events')}>
                <ListItemIcon>
                  <AttachMoneyIcon color="primary" />
                </ListItemIcon>
                <ListItemText color="primary" primary={t('nav.earnMoney')} />
              </ListItem>
            </List>
            <Divider />
          </SwipeableDrawer> */}
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
