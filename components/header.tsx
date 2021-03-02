import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(({
    header: {
        position: 'relative',
        // backgroundImage: 'linear-gradient(#ff9d2f, #ff6126)',
        // backgroundImage: 'url(/assets/banner.webp)',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        color: 'white',
        height: '400px',
        width: '100%',
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0% 100%)',
        marginTop: '-10px',
    },
}),
);

export function Header() {
    const classes = useStyles();
    return (
        <header className={clsx([classes.header, ' bg-gradient-to-r from-green-400 to-blue-500'])}>
            {/* <img src="/assets/banner.jpg" alt="banner" height="auto" width="100%" /> */}
        </header>
    );
}
