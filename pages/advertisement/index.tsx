import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { Donate } from '../../components/donate/donate';
import { Layout } from '../../components/layout';

export default function AdvertisementPage() {
    return (
        <Layout>
            <Grid container direction="row" justify="center" alignItems="center">
                <Donate />
            </Grid>
        </Layout>
    );
};
