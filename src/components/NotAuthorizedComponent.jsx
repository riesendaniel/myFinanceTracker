import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  Card, CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  actions,
  getCurrentUser,
} from '../redux/modules/UserReducer';

class NotFoundComponent extends Component {
  requestExtendedUser = async () => {
    const {
      doAddUser,
      currentUser,
    } = this.props;
    await doAddUser({
      ...currentUser,
      state: 'pending',
      userRole: 'standard',
    });
  };

  render = () => {
    const {
      currentUser,
    } = this.props;
    let message;
    switch (currentUser.state) {
      case 'pending':
        message = 'Der Antrag für die erweiterten Berechtigungen ist beim Administrator in Bearbeitung und muss erst noch durch diesen freigegeben werden.';
        break;
      case 'rejected':
        message = 'Der Antrag für die erweiterten Berechtigungen wurde abgelehnt.';
        break;
      default:
        message = 'Um die Diagramme einsehen zu können sind erweiterte Berechtigungen notwendig.';
    }
    return (
      <div>
        <Grid item xs={12}>
          <Typography variant="h2" component="h2">Beschränkt zugänglicher Bereich</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography>{message}</Typography>
              {currentUser.state === 'unrequested' && <Button onClick={() => this.requestExtendedUser()}>Erweiterte Berechtigungen beantragen</Button>}
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  };
}

NotFoundComponent.propTypes = {
  doAddUser: PropTypes.func.isRequired,
  currentUser: CustomPropTypes.user.isRequired,
};

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotFoundComponent);
