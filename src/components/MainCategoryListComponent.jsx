import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Dialog, DialogActions, DialogContent,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTable,
  ResponsiveTableBody,
} from './ResponsiveTable';
import {
  actions,
  getIsLoading, getMainCategories,
} from '../redux/modules/MainCategoryReducer';
import Loading from './LoadingComponent';
import MainCategoryListItem from './MainCategoryListItemComponent';
import { auth } from '../config/firebase';

class MainCategoryListComponent extends Component {
  state = {
    open: false,
  };

  componentDidMount = async () => {
    const {
      open,
    } = this.props;
    this.setState({ open });
  }

  handleClose = () => {
    this.setState({ open: false });
    const {
      onClose,
    } = this.props;
    onClose();
  }

  render = () => {
    const emptyMainCategory = {
      id: 'new',
      description: '',
    };
    const {
      open,
    } = this.state;
    const {
      isLoading,
      mainCategories,
    } = this.props;

    if (!auth.currentUser) {
      return <Redirect to="/signin/" />;
    }

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
      >
        <DialogContent>
          { isLoading ? <Loading /> : (
            <ResponsiveTable breakpoint="xs">
              <ResponsiveTableBody>
                {mainCategories.map(mainCategory => (
                  <MainCategoryListItem key={mainCategory.id} mainCategory={mainCategory} />
                ))}
                <MainCategoryListItem mainCategory={emptyMainCategory} editable />
              </ResponsiveTableBody>
            </ResponsiveTable>
          ) }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Schliessen</Button>
        </DialogActions>
      </Dialog>
    );
  };
}

MainCategoryListComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  mainCategories: PropTypes.arrayOf(CustomPropTypes.mainCategory).isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  mainCategories: getMainCategories(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainCategoryListComponent);
