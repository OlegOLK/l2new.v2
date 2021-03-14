import { Typography, Grid, Button, Link } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Discord } from './svg/Discord-Logo-White.svg';
import { ServerRowComponent } from '../serverRow/old.server.row';
import { Server } from '../../lib/models/server';
import * as dfn from 'date-fns';

function ComposeServer(premium: number): Server {
  return {
    chronicles: 'Chronicles',
    features: ['GVE'],
    name: 'Server',
    premium: premium,
    openDate: dfn.formatISO(new Date()),
    type: 'Multiprof',
    uri: '#',
    rates: [
      { amount: 1, type: 'XP' },
      { amount: 1, type: 'SP' },
      { amount: 1, type: 'Adena' },
      { amount: 1, type: 'Drop' },
      { amount: 1, type: 'Spoil' },
    ],
    id: '1',
  };
}

export const Donate: FunctionComponent = () => {
  return (
    <Grid item md={6}>
      <Typography style={{ textAlign: 'center' }} variant="h6">
        В данный момент портал все еще находится на стадии разработки. <br />
        Поэтому для размещения вашего сервера на нашем ресурсе вам необходимо
        написать нам в
        <Link
          href="https://discord.gg/7RYg2mjwJN"
          target="__blank"
          rel="noreferrer noopener"
          style={{ textDecoration: 'none' }}
        >
          <Button
            style={{ backgroundColor: '#7289DA', margin: '5px' }}
            startIcon={<SvgIcon component={Discord} viewBox="0 0 245 240" />}
          >
            Discord
          </Button>
        </Link>
      </Typography>

      <Typography style={{ fontSize: '20px' }}>
        Хотите привлечь больше аудитории к игре на вашем сервере?
        <br />
        Устали от анонсов с размещением только за деньги и не хотите добавлять
        себе на сайт странные баннеры\кнопки?
        <br />У нас все просто, пишешь в дискорд с информацией о сервере и мы
        добавим его в ЭТОТ ЖЕ ДЕНЬ (после проверки)! БЕСПЛАТНО!
      </Typography>

      <Typography>
        Но и это еще не все. <br />
        Мы запустили Викторину которая поможет пользователям заработать
        денжонок, а вам привлечь их внимание к вашему проекту. Что от вас
        требуется? Все уже включено! Просто составьте вопрос(ы) для викторины и
        пишите их нам вместе с информацией о сервере. Беплатный сервер может
        имеь только один вопрос для викторины, колличество показов которого
        неограничего!
      </Typography>

      <Typography variant="h5">
        Информация необходимая для добавления нового сервера:
      </Typography>

      <ol>
        <li>Имя сервера</li>
        <li>Ссылка на сайт сервера.</li>
        <li>Дата открытия</li>
        <li>Платформа сервера : JAVA / PTS</li>
        <li>Тип сервера: Normal / Multiproff / GvE / Multicraft / Custom</li>
        <li>Хроники</li>
        <li>Рейты: XP / SP /SPOIL /ADENA / DROP</li>
        <li>
          Один вопрос (с ответом) для викторины (викторина позволяет вам в
          игровой способ привлечь на сервер новую аудиторию. Кроме того
          администрация l2NEW.COM поощряет участие пользователей в викторине
          денежным вознаграждением. Ответ на вопрос должен быть неизменным и не
          зависеть от сторонних факторов, например: "Дата первого поста
          администрации на форуме, в разделе НОВОСТИ")
        </li>

        <li>
          Так же администрация анонса l2new была бы очень благодарна за
          размещение у себя на сайте нашей кнопки Код
          <br />
          <textarea
            style={{ border: '1px solid black' }}
            rows={8}
            cols={40}
            onChange={() => { }}
            value={
              '<a href="https://l2new.com/" style="z-index:99999;" target="_blank" rel="noreferrer"><img src="https://l2new.com/assets/l2new.png" width="122" height="31" alt="Бесплатный анонс серверов л2" title="Бесплатный анонс серверов л2 | заработай реальные деьги в конкурсах!" border="0"></a>'
            }
          ></textarea>
          <br />
          <a
            href="https://l2new.com/"
            style={{ zIndex: 99999 }}
            rel="noreferrer"
            target="_blank"
          >
            <img
              src="https://l2new.com/assets/l2new.png"
              width="122"
              height="31"
              alt="Бесплатный анонс серверов л2"
              title="Бесплатный анонс серверов л2 | заработай реальные деьги в конкурсах!"
            />
          </a>
        </li>
      </ol>

      <Typography variant="h6">Платные услуги</Typography>

      <Typography>
        5$ (30 дней) - Premium - выделяет ваш сервер среди других, а так же
        позволяет вам добавить 2 вопроса о вашем сервере для викторины (что
        повышает частоту попадания вашего сервера в викторину).
        <br />
        <br />
      </Typography>

      <ServerRowComponent server={ComposeServer(1)} />
      <br />
      <Typography>
        15$ (30 дней) - VIP - выделяет ваш сервер среди других, а так же
        позволяет вам добавить 3 вопросов о вашем сервере для викторины (что
        повышает частоту попадания вашего сервера в викторину).
      </Typography>
      <br />
      <br />
      <ServerRowComponent server={ComposeServer(2)} />
      <br />
      <Typography>
        200$ (30 дней) - VIP+баннер - баннер вашего сервера всегда будет
        отображен в шапке нашего сайта. Кроме того будет закреплен в списке с
        VIP статусом. И позволяет вам добавить 5 вопросов о вашем сервере для
        викторины (что повышает частоту попадания вашего сервера в викторину).
      </Typography>
      <br />
      <br />
      <ServerRowComponent server={ComposeServer(2)} />
      <br />

    </Grid>
  );
};
