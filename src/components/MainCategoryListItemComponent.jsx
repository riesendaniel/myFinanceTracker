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
import {
  getBudget,
} from '../redux/modules/BudgetReducer';
import ErrorLogger from '../helper/ErrorLogger';

const styles = () => ({
  form: {
    width: '100%',
  },
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

  saveMainCategory = async () => {
    const {
      doAddMainCategory,
      doUpdateMainCategory,
    } = this.props;
    const {
      mainCategory,
    } = this.state;
    if (mainCategory.id !== 'new') {
      await doUpdateMainCategory(mainCategory);
      this.setState({ editable: this.initialEditable });
    } else {
      await doAddMainCategory(mainCategory);
      this.setState({ mainCategory: this.initialMainCategory, editable: this.initialEditable });
    }
  }

  deleteMainCategory = async (id) => {
    const {
      mainCategory,
    } = this.state;
    const {
      doDeleteMainCategory,
      budget,
    } = this.props;
    const budgetEntryInMainCategory = budget.filter(item => (
      item.mainCategoryId === mainCategory.id
    ));
    if (budgetEntryInMainCategory.length === 0) {
      await doDeleteMainCategory(id);
    } else {
      ErrorLogger.log(undefined, 'Diese Hauptkategorie darf nicht gelöscht werden, da ihr noch Budgeteinträge zugeordnet sind.');
    }
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
          <ValidatorForm className={classes.form} onSubmit={this.saveMainCategory}>
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
  budget: PropTypes.arrayOf(CustomPropTypes.budgetEntry).isRequired,
  classes: CustomPropTypes.classes.isRequired,
  mainCategory: CustomPropTypes.mainCategory.isRequired,
  editable: PropTypes.bool,
  width: CustomPropTypes.breakpoint.isRequired,
};

MainCategoryListItem.defaultProps = {
  editable: false,
};

const mapStateToProps = state => ({
  budget: getBudget(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const componentWithWidth = withWidth()(MainCategoryListItem);
const componentWithStyles = withStyles(styles)(componentWithWidth);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
