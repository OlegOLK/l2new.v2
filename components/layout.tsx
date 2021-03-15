import Head from 'next/head'

import { Container, Box, Hidden } from '@material-ui/core';
import { NavBar } from './Navbar/index';
import { HeaderComponent } from './Header/header';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Footer } from './Footer';
import React from 'react';

export function Layout({ children }) {
    return (
        <>
            <Head>
                <title>l2new - анонс новых серверов l2 | Бесплатная база серверов.</title>
                <link rel="icon" href="./favicon.ico" />
                <meta name="description" content="Новые сервера л2. Бесплатный анонс серверов Lineage 2 всех рейтов и хроник. Самая большая база серверов. Не пропустите открытие серверов l2 уже сегодня!" />
                <meta name="keywords" content="Новые сервера Lineage 2, анонсы серверов Lineage 2, новые сервера л2, анонсы л2, л2, ла2, la2, l2, lineage ii, линейдж 2, линейка, l2 anons, сервера l2" />
                <meta name="google-site-verification" content="tr2jipBoV-jJZgiqKUAUUs_Rh_ozGNsBu6jXu-nctZc" />
            </Head>
            <>
                <CssBaseline />
                <Box>
                    <NavBar />
                </Box>
                <Hidden mdDown>
                    <Box mb={1}>
                        <HeaderComponent />
                    </Box>
                </Hidden>
                <Container maxWidth="xl" style={{ minHeight: '500px' }}>
                    {children}
                </Container>
                <Hidden xsDown>
                    <Box mb={1}>
                        <Footer />
                    </Box>
                </Hidden>
            </>
        </>
    )
}

