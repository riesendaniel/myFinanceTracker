import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ValidatorForm,
  TextValidator,
} from 'react-material-ui-form-validator';
import {
  FormControl,
  withStyles,
} from '@material-ui/core';
import withWidth, {
  isWidthUp,
} from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTableRow, ResponsiveTableCell,
  ResponsiveTableRowFormCell,
} from './ResponsiveTable';
import FormActions from './FormActionsComponent';
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

  resetMainCategory = () => {
    this.setState({
      mainCategory: { ...this.initialMainCategory },
      editable: this.initialEditable,
    });
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
      doUpdateMainCategory(mainCategory).then(this.setState({
        editable: this.initialEditable,
      }));
    } else {
      doAddMainCategory(mainCategory).then(this.setState({
        mainCategory: this.initialMainCategory,
        editable: this.initialEditable,
      }));
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
                    'isString',
                    'minStringLength:3',
                    'maxStringLength:100',
                  ]}
                  errorMessages={[
                    'Die Bezeichnung muss ausgefüllt werden.',
                    'Die Bezeichnung muss in Form eines Textes erfasst werden.',
                    'Die Bezeichnung muss aus mindestens drei Zeichen bestehen.',
                    'Die Bezeichnung darf maximal 100 Zeichen beinhalten.',
                  ]}
                />
              </FormControl>
            </ResponsiveTableRowFormCell>
            <ResponsiveTableRowFormCell
              breakpoint={breakpoint}
              className={breakpointUp ? classes.actions : undefined}
              actions
            >
              <FormActions
                editable={editable}
                deleteFnc={() => this.deleteMainCategory(mainCategory.id)}
                editFnc={() => this.setState({ editable: true })}
                resetFnc={() => this.resetMainCategory()}
              />
            </ResponsiveTableRowFormCell>
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
