import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import {
  Button,
  Dialog, DialogActions, DialogContent,
  Table, TableBody,
} from '@material-ui/core';
import {
  actions,
  getIsLoading, getMainCategories,
} from '../redux/modules/MainCategoryReducer';
import Loading from './LoadingComponent';
import MainCategoryListItem from './MainCategoryListItemComponent';

class MainCategoryListComponent extends Component {
  state = {
    open: false,
  };

  componentDidMount = async () => {
    const {
      open,
      doLoadMainCategories,
    } = this.props;
    await doLoadMainCategories();
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
      description: '',
      color: randomColor(),
    };
    const {
      open,
    } = this.state;
    const {
      isLoading,
      mainCategories,
    } = this.props;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
      >
        <DialogContent>
          { isLoading ? <Loading /> : (
            <Table>
              <TableBody>
                {mainCategories.map(mainCategory => (
                  <MainCategoryListItem key={mainCategory.id} mainCategory={mainCategory} />
                ))}
                <MainCategoryListItem mainCategory={emptyMainCategory} editable />
              </TableBody>
            </Table>
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
  doLoadMainCategories: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  mainCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
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
