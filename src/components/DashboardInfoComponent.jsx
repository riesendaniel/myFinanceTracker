import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, CardMedia,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';

const spacing = '16px';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  media: {
    backgroundColor: theme.palette.primary.main,
    padding: `${spacing} 24px`,
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    padding: spacing,
    '&:last-child': {
      paddingBottom: spacing,
    },
  },
});

const DashboardInfoComponent = (props) => {
  const {
    classes,
    icon,
    title,
    value,
    clickFn,
  } = props;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
      <Card
        className={classes.card}
        onClick={clickFn}
        style={{ cursor: clickFn ? 'pointer' : 'auto' }}
      >
        <CardMedia className={classes.media}>
          {icon}
        </CardMedia>
        <CardContent className={classes.content}>
          <Typography component="div" variant="body2">{title}</Typography>
          <Typography component="div">{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

DashboardInfoComponent.propTypes = {
  classes: PropTypes.shape(PropTypes.object).isRequired,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  clickFn: PropTypes.func,
};

DashboardInfoComponent.defaultProps = {
  clickFn: undefined,
};

export default withStyles(styles)(DashboardInfoComponent);
