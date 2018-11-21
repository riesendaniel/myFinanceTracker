import React from 'react';
import {
  Card, CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

const NotFound = () => (
  <Grid container spacing={16} justify="center">
    <Grid item xs={12} md={10}>
      <Typography variant="headline" component="h2">Seite nicht gefunden</Typography>
    </Grid>
    <Grid item xs={12} md={10}>
      <Card>
        <CardContent>
          <Typography>Die gewünschte Seite wurde leider nicht gefunden...</Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default NotFound;
