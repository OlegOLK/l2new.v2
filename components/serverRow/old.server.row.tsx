import React, { FunctionComponent } from 'react';
import { Server } from '../../lib/models/server';
import { Typography, Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { RegularRow } from './rows/regular.row';
import { PremiumVipRow } from './rows/premium.vip.row';
import { PremiumRow } from './rows/premium.row';
import { format, parseISO } from 'date-fns';
import { trackServerNavigation } from '../../lib/services/google-analytics';

const useStyles = makeStyles(theme =>
    createStyles({
        serverRow: {
            color: 'white',
            position: 'relative',
            transition: 'all .2s ease-in-out',
            paddingTop: '1px',
            marginBottom: '5px',
            //   backgroundColor: 'white',
            boxShadow:
                '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
            borderBottom: '1px solid rgb(222, 226, 230)',

            // border: '1px solid #faebd7',
            '&:hover': {
                transform: 'scale(1.05)',
                zIndex: 100,
                backgroundColor: 'wheat',
            },
        },
        serverDetails: {
            fontSize: '12px',
            borderTop: '1px solid rgb(222, 226, 230)',
            paddingTop: '5px',
        },
        regularServerDetails: {
            borderTop: '3px solid #ff9d2f',
            // borderBottom: '3px solid #ff9d2f',
            backgroundColor: '#ffdbb4', //'antiquewhite',
            marginBottom: '-4px !important',
            // color: 'white'
        },
        regularText: {
            fontSize: '20px',
            textOverflow: 'elipsis',
            wordBreak: 'keep-all',
        },
        textAligment: {
            [theme.breakpoints.down('sm')]: {
                textAlign: 'center',
            },
            [theme.breakpoints.up('md')]: {
                textAlign: 'left',
            },
        },
        regularPadding: {
            paddingLeft: '15px',
        },
    }),
);

export type ServerItemProps = {
    server: Server;
};

function mapRatesWithType(server: Server) {
    const elements: JSX.Element[] = [];
    if (server.type !== 'Normal') {
        elements.push(
            <Grid item key={'type-' + server.name}>
                {server.type}
            </Grid>,
        );
    }

    server.rates.forEach(rate => {
        if (rate.amount > 0) {
            elements.push(
                <Grid item key={`server-rate-${server.name}-${rate.type}`}>
                    {rate.type.toUpperCase()}: x{rate.amount}
                </Grid>,
            );
        }
    });
    return elements;
}

export const ServerRowComponent: FunctionComponent<ServerItemProps> = ({
    server,
}) => {
    const classes = useStyles();
    const handleNavigateToServer = () => {
        let uri = server.uri;
        if (!server.uri.toLowerCase().startsWith('http')) {
            uri = `https://${server.uri}`;
        }
        window.open(uri, '__blank', 'noopener noreferrer');
        trackServerNavigation(server);
    };

    const getServerRates = () => {
        const hasAnyRates = server.rates.some(x => x.amount !== 0);
        if (!hasAnyRates) {
            return null;
        }
        return (
            <Grid
                item
                xs={12}
                className={
                    server.premium === 2
                        ? classes.serverDetails
                        : classes.regularServerDetails
                }
            >
                <Grid
                    item
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    style={{ height: '100%', paddingBottom: 0 }}
                >
                    {mapRatesWithType(server)}
                </Grid>
            </Grid>
        );
    };

    const getMainRate = () => {
        var xp = server.rates.find(x => x.type.toLowerCase() === 'xp');
        if (!xp || xp.amount <= 0) {
            return server.type;
        }
        return `x${xp.amount}`;
    };

    const getInfo = (isRegular: boolean) => {
        return (
            <>
                <Grid
                    item
                    md={isRegular ? 4 : 3}
                    sm={5}
                    xs={5}
                    zeroMinWidth
                    className={clsx(
                        classes.regularText,
                        classes.textAligment,
                        isRegular ? classes.regularPadding : '',
                    )}
                >
                    <Typography
                        noWrap
                        variant={'button'}
                        onClick={handleNavigateToServer}
                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >
                        {server.name.toUpperCase()}
                    </Typography>
                </Grid>
                <Grid
                    item
                    md={2}
                    sm={6}
                    xs={6}
                    zeroMinWidth
                    className={clsx(classes.regularText, classes.textAligment)}
                >
                    <Typography noWrap>{getMainRate()}</Typography>
                </Grid>
                <Grid
                    item
                    md={3}
                    sm={5}
                    xs={5}
                    zeroMinWidth
                    className={clsx(classes.regularText, classes.textAligment)}
                >
                    <Typography noWrap style={{ fontWeight: 500 }}>
                        {server.chronicles}
                    </Typography>
                </Grid>
                <Grid
                    item
                    md={3}
                    sm={5}
                    xs={5}
                    zeroMinWidth
                    style={{
                        paddingRight: '5px',
                        backgroundColor: '#333a7b',
                        color: 'white',
                        clipPath: 'polygon(15% 0, 100% 0%, 100% 100%, 0% 100%)',
                    }}
                    className={clsx(classes.regularText, classes.textAligment)}
                >
                    <Typography noWrap align="right">
                        {format(parseISO(server.openDate), 'dd.MM.yyyy')}
                    </Typography>
                </Grid>
                {getServerRates()}
            </>
        );
    };

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.serverRow}
            key={'server-grid-' + server.name}
        >
            {server.premium === 2 ? (
                <PremiumVipRow key={'vip-row-' + server.name}>
                    {' '}
                    {getInfo(false)}{' '}
                </PremiumVipRow>
            ) : server.premium === 1 ? (
                <PremiumRow key={'premium-row-' + server.name}>
                    {' '}
                    {getInfo(false)}{' '}
                </PremiumRow>
            ) : (
                        <RegularRow key={'regular-row-' + server.name}>
                            {getInfo(true)}{' '}
                        </RegularRow>
                    )}
        </Grid>
    );
};
