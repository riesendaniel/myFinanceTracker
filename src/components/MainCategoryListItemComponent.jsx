import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  FormControl,
  IconButton,
  TableRow, TableCell,
  Input, InputLabel,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import {
  actions,
} from '../redux/modules/MainCategoryReducer';

class MainCategoryListItem extends Component {
  state = {
    mainCategory: {},
    editable: false,
  }

  componentDidMount = () => {
    const {
      mainCategory,
      editable,
    } = this.props;
    this.initialMainCategory = { ...mainCategory };
    this.initialEditable = editable;
    this.setState({ mainCategory, editable });
  }

  handleInputChange = (event) => {
    const { mainCategory } = this.state;
    const { value } = event.target;
    mainCategory[event.target.name] = value;
    this.setState({ mainCategory });
  }

  saveMainCategory = async () => {
    const {
      doAddMainCategory,
      doUpdateMainCategory,
    } = this.props;
    const {
      mainCategory,
    } = this.state;
    if (mainCategory.id) {
      await doUpdateMainCategory(mainCategory);
      this.setState({ editable: this.initialEditable });
    } else {
      await doAddMainCategory(mainCategory);
      this.setState({ mainCategory: this.initialMainCategory, editable: this.initialEditable });
    }
  }

  deleteMainCategory = async (id) => {
    const {
      doDeleteMainCategory,
    } = this.props;
    await doDeleteMainCategory(id);
  }

  render = () => {
    const {
      mainCategory,
      editable,
    } = this.state;
    return (
      <TableRow key={mainCategory.id}>
        <TableCell>
          <FormControl>
            {editable && <InputLabel htmlFor="description">Beschreibung</InputLabel>}
            <Input
              id="description"
              name="description"
              type="text"
              value={mainCategory.description}
              onChange={event => this.handleInputChange(event)}
              disableUnderline={!editable}
              readOnly={!editable}
            />
          </FormControl>
        </TableCell>
        { editable ? (
          <TableCell>
            <IconButton onClick={this.saveMainCategory}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={() => this.setState({
              mainCategory: { ...this.initialMainCategory },
              editable: this.initialEditable,
            })}
            >
              <CancelIcon />
            </IconButton>
          </TableCell>
        ) : (
          <TableCell>
            <IconButton onClick={() => this.setState({ editable: true })}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => this.deleteMainCategory(mainCategory.id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
    );
  }
}

MainCategoryListItem.propTypes = {
  doAddMainCategory: PropTypes.func.isRequired,
  doUpdateMainCategory: PropTypes.func.isRequired,
  doDeleteMainCategory: PropTypes.func.isRequired,
  mainCategory: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  editable: PropTypes.bool,
};

MainCategoryListItem.defaultProps = {
  editable: false,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainCategoryListItem);
