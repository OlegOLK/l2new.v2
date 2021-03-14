// import { ServerGroup } from '../components/server.group'
import { ServerList } from '../components/old.server.group';
import { Layout } from '../components/layout';
import { GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import React from 'react';
import { ServersList } from '../lib/models/server';
import { Container, Grid, Hidden, Typography } from '@material-ui/core';
import { FilterComponent } from '../components/Filter/filter';
import { ServersFilterComponent } from '../components/Filter/servers.filter';

export default function Home({ data }) {
  const [servers] = React.useState<ServersList[]>(data)

  const soon = () => {
    return servers.filter(
      server => server.panel === 0 && server.servers.length !== 0,
    );
  };

  const already = () => {
    return servers.filter(
      server => server.panel === 1 && server.servers.length !== 0,
    );
  };

  const any = () => {
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


export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/servers')
  const json = await res.json()
  return { props: { data: json } };
}