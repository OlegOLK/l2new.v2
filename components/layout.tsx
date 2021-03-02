import { Header } from './header';
import { NavBar } from './nav';
import Head from 'next/head'

import { Grid, Container } from '@material-ui/core';

export function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            {/* <Header /> */}
            {/* <Container maxWidth="sm">

            </Container> */}
            <main className="container mx-auto flex-row mt-5">
                {children}
            </main>
        </>
    )
}