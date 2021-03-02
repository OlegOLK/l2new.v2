import { NavBar } from './nav';
import Head from 'next/head'

export function Layout({ children }) {
    return (
        <>
            <Head>
                <title>l2new - анонс новых серверов l2 | Бесплатная база серверов.</title>
                <link rel="icon" href="./favicon.ico" />
                <meta name="description" content="Новые сервера л2. Бесплатный анонс серверов Lineage 2 всех рейтов и хроник. Самая большая база серверов. Не пропустите открытие серверов l2 уже сегодня!" />
                <meta name="keywords" content="Новые сервера Lineage 2, анонсы серверов Lineage 2, новые сервера л2, анонсы л2, л2, ла2, la2, l2, lineage ii, линейдж 2, линейка, l2 anons, сервера l2" />
            </Head>
            <NavBar />
            <main className="container mx-auto flex-row mt-5">
                {children}
            </main>
        </>
    )
}

