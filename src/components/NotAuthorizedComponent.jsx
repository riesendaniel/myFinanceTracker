import React from 'react';
import {
  Card, CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

const NotFound = () => (
  <div>
    <Grid item xs={12}>
      <Typography variant="h2" component="h2">Dieser Bereich ist leider nicht einsehbar.</Typography>
    </Grid>
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography>Um Admin zu werden melde dich beim myFinanceTracker Team</Typography>
        </CardContent>
      </Card>
    </Grid>
  </div>
);

export default NotFound;
