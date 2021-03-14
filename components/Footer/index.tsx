import React, { FunctionComponent } from 'react';
import {
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  edgeMask: {
    height: '200px',
    marginBottom: '-90px',
    top: 0,
    left: 0,
    transform: 'translate(0, -50%)',
    backgroundPosition: 'center 150%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: 'url(/assets/valley-white-static.svg)',
  },
  edgeAnimated: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: 'url(/assets/valley-white.svg)',
  },
  footer: {
    minHeight: '500px',
    width: '100%',
    bottom: '0',
    marginTop: '50px',
    backgroundImage: 'linear-gradient(#ff9d2f, #ff6126)',
    [theme.breakpoints.down('xs')]: {
      minHeight: '950px',
      // clipPath: 'polygon(0 calc(100% - 50vw), 100% 0, 100% 100%, 0% 100%)',
    },
    [theme.breakpoints.down('sm')]: {
      // minHeight: '800px',
      // clipPath: 'polygon(0 calc(100% - 50vw), 100% 0, 100% 100%, 0% 100%)',
    },
    [theme.breakpoints.up('md')]: {
      clipPath: 'polygon(0 calc(100% - 35vw), 100% 0, 100% 100%, 0% 100%)',
    },
    [theme.breakpoints.up('lg')]: {
      clipPath: 'polygon(0 calc(100% - 26vw), 100% 0, 100% 100%, 0% 100%)',
    },
    [theme.breakpoints.up('xl')]: {
      clipPath: 'polygon(0 calc(100% - 18vw), 100% 0, 100% 100%, 0% 100%)',
    },
    position: 'relative',
  },
}));

export const Footer: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div style={{ bottom: 0, position: 'absolute', width: '100%' }}>
        <Container maxWidth="md" style={{ width: '100%', bottom: 0 }}>
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ height: '100%' }}
          >
            <Grid item md={12}>
              <Typography component="div">l2NEW.COM 2020-2021</Typography>
            </Grid>
            <Grid item md={12}>
              <Typography variant="caption">
                FREE AND MOST FULL DATABASE OF LINEAGE 2 SERVERS
              </Typography>
              <Divider />
              <Typography
                variant="body2"
                style={{ marginBottom: '10px', marginTop: '10px' }}
              >
                &nbsp;На сайте l2new.com вы найдете самый полный список серверов
                Lineage 2. Мы собираем и дополняем нашу базу серверов каждый
                день для того что вы бы не упустили открытие любимого сервера.
                Под каждый сервер собирается детальная информация по хроникам,
                рейтам, дате открытия а так же особенностях сервера. Больше вам
                не нужно просматривать миллион анонсов в поисках нужного сервера
                т.к. наша база позволяет добавлять сервера без оплаты что в свою
                очередь позволяет собирать самую актуальную информацию по новым
                или открытым сервера.
              </Typography>
              <Divider />
              <Typography variant="body2" style={{ marginBottom: '10px' }}>
                &nbsp;Этот сайт создан специально геймерами для геймеров. Мы
                тоже устали скролить кучу топов в поисках уникальных проэктов,
                именно для вас мы стараемчя сделать ресурс который позволит
                забросить парсинг аносов в гугле. Все что нужно собрано в одном
                месте!
              </Typography>

              <Typography variant="body2" style={{ marginBottom: '10px' }}>
                &nbsp;Кроме всего, мы решили что в ожидании открытия сервера
                было бы круто развлечь наших посетителей и дать им возможность
                подзаработать немного денег. На сайте l2new.com действуют крутые
                ивенты и акции которые позволят ТЕБЕ заработать денег на премак
                или другие ништяки на открытии сервера!
              </Typography>

              <Typography variant="body2" style={{ marginBottom: '10px' }}>
                &nbsp;Ну и конечно же ПАТИ. Залетай к нам в{' '}
                <a
                  href="https://discord.gg/kdsrYj4xj2"
                  target="__blank"
                  rel="noopener noreferrer"
                  style={{ color: 'green' }}
                >
                  DISCORD
                </a>
                . Там ты точно не будешь скучать - ивенты, поиски кп и просто
                флуд! Все это ждет тебя!
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </footer>
  );
};
