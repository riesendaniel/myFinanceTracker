import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ValidatorForm,
  TextValidator,
} from 'react-material-ui-form-validator';
import {
  FormControl,
  IconButton,
  withStyles,
} from '@material-ui/core';
import withWidth, {
  isWidthUp,
} from '@material-ui/core/withWidth';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTableRow, ResponsiveTableCell,
  ResponsiveTableRowFormCell,
} from './ResponsiveTable';
import {
  actions,
} from '../redux/modules/MainCategoryReducer';

const styles = () => ({
  actions: {
    width: '100px',
  },
});

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
    event.preventDefault();
    const { mainCategory } = this.state;
    const { value } = event.target;
    mainCategory[event.target.name] = value;
    this.setState({ mainCategory });
  }

  saveMainCategory = () => {
    const {
      doAddMainCategory,
      doUpdateMainCategory,
    } = this.props;
    const {
      mainCategory,
    } = this.state;
    if (mainCategory.id !== 'new') {
      doUpdateMainCategory(mainCategory);
      this.setState({ editable: this.initialEditable });
    } else {
      doAddMainCategory(mainCategory);
      this.setState({ mainCategory: this.initialMainCategory, editable: this.initialEditable });
    }
  }

  deleteMainCategory = (id) => {
    const {
      doDeleteMainCategory,
    } = this.props;
    doDeleteMainCategory(id);
  }

  render = () => {
    const {
      mainCategory,
      editable,
    } = this.state;
    const {
      breakpoint,
      classes,
      width,
    } = this.props;
    const breakpointUp = isWidthUp(breakpoint, width, false);
    return (
      <ResponsiveTableRow breakpoint={breakpoint}>
        <ResponsiveTableCell>
          <ValidatorForm onSubmit={this.saveMainCategory}>
            <ResponsiveTableRowFormCell breakpoint={breakpoint}>
              <FormControl fullWidth={editable ? true : undefined}>
                <TextValidator
                  autoFocus={editable ? true : undefined}
                  name="description"
                  placeholder="Beschreibung"
                  type="text"
                  value={mainCategory.description}
                  onChange={event => this.handleInputChange(event)}
                  InputProps={{
                    disableUnderline: !editable,
                    readOnly: !editable,
                  }}
                  validators={[
                    'required',
                    'minStringLength:3',
                  ]}
                  errorMessages={[
                    'Die Bezeichnung muss ausgefüllt werden.',
                    'Die Bezeichnung muss aus mindestens drei Zeichen bestehen.',
                  ]}
                />
              </FormControl>
            </ResponsiveTableRowFormCell>
            { editable ? (
              <ResponsiveTableRowFormCell
                breakpoint={breakpoint}
                className={breakpointUp ? classes.actions : undefined}
                alignRight
              >
                <IconButton type="submit">
                  <SaveIcon />
                </IconButton>
                <IconButton
                  type="reset"
                  onClick={() => this.setState({
                    mainCategory: { ...this.initialMainCategory },
                    editable: this.initialEditable,
                  })}
                >
                  <CancelIcon />
                </IconButton>
              </ResponsiveTableRowFormCell>
            ) : (
              <ResponsiveTableRowFormCell
                breakpoint={breakpoint}
                className={breakpointUp ? classes.actions : undefined}
                alignRight
              >
                <IconButton onClick={() => this.setState({ editable: true })}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => this.deleteMainCategory(mainCategory.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </ResponsiveTableRowFormCell>
            )}
          </ValidatorForm>
        </ResponsiveTableCell>
      </ResponsiveTableRow>
    );
  }
}

MainCategoryListItem.propTypes = {
  doAddMainCategory: PropTypes.func.isRequired,
  doUpdateMainCategory: PropTypes.func.isRequired,
  doDeleteMainCategory: PropTypes.func.isRequired,
  breakpoint: CustomPropTypes.breakpoint.isRequired,
  classes: CustomPropTypes.classes.isRequired,
  mainCategory: CustomPropTypes.mainCategory.isRequired,
  editable: PropTypes.bool,
  width: CustomPropTypes.breakpoint.isRequired,
};

MainCategoryListItem.defaultProps = {
  editable: false,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const componentWithWidth = withWidth()(MainCategoryListItem);
const componentWithStyles = withStyles(styles)(componentWithWidth);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
