// import { ServerGroup } from '../components/server.group'
import { ServerList } from '../components/old.server.group';
import { Layout } from '../components/layout';
import { GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import React, {useEffect} from 'react';
import { ServersList } from '../lib/models/server';
import { Container, Grid, Hidden, Typography } from '@material-ui/core';
import { FilterComponent } from '../components/Filter/filter';
import { ServersFilterComponent } from '../components/Filter/servers.filter';
import { useRouter } from 'next/router';

export default function Home({ servers, query }) {
  // const [servers] = React.useState<ServersList[]>(data)
  const router = useRouter();
  // console.log('aaaaaaa', data.length, query)
  // useEffect(()=>{
  //   console.log(query)
  // }, [query])
  // console.log(servers)
  // console.log(JSON.stringify(router.query))
  const soon = () => {
    if(!servers){return []};
    return servers.filter(
      server => server.panel === 0 && server.servers.length !== 0,
    );
  };

  const already = () => {
    if(!servers){return []};
    return servers.filter(
      server => server.panel === 1 && server.servers.length !== 0,
    );
  };

  const any = () => {
    if(!servers){return false};
    let a = servers.filter(x => x.servers.length > 0);
    return a.length > 0;
  };

  return (
    <Layout>
      <Hidden mdDown>
        <FilterComponent>
          <ServersFilterComponent />
        </FilterComponent>
      </Hidden>
      <Grid container direction="row" justify="space-between" spacing={2}>

        <Container maxWidth="lg">
          <Grid
            container
            alignItems="flex-start"
            justify="center"
            spacing={5}
            style={{ marginTop: '15px' }}
          >

            {!any() ? (
              <Grid container item lg={12} xl={12} spacing={2} justify="center">
                <Typography align="center" display="block" variant="h2">
                  4
              <span role="img" aria-label="Crying Face">
                    😢
              </span>
              4
            </Typography>
              </Grid>
            ) : (
              <>
                <Grid
                  item
                  container
                  alignItems="flex-start"
                  lg={6}
                  xl={6}
                  spacing={2}
                >
                  {soon().map(server => {
                    return (
                      <Grid key={'grid' + server.sortOrder} item xs={12}>
                        <ServerList
                          key={'serverlist' + server.sortOrder}
                          groupped={server}
                        />
                      </Grid>
                    );
                  })}
                </Grid>

                <Grid
                  item
                  container
                  alignItems="flex-start"
                  lg={6}
                  xl={6}
                  spacing={2}
                >
                  {already().map(server => {
                    return (
                      <Grid key={'grid' + server.sortOrder} item xs={12}>
                        <ServerList
                          key={'serverlist' + server.sortOrder}
                          groupped={server}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </Grid>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async (query) => {
  console.log(query.resolvedUrl)
  const res = await fetch('http://localhost:3000/api/servers' + query.resolvedUrl)
  const json = await res.json()
  return { props: { servers: json , query: query.query} };
}