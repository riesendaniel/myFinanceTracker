import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';

const FormActionsComponent = (props) => {
  const {
    editable,
    disableDelete,
    editFnc,
    deleteFnc,
    resetFnc,
  } = props;
  return (
    editable ? (
      <div>
        <IconButton
          type="submit"
          data-test-id={'submit-button'}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          type="reset"
          data-test-id={'reset-button'}
          onClick={resetFnc}
        >
          <CancelIcon />
        </IconButton>
      </div>
    ) : (
      <div>
        <IconButton
          onClick={editFnc}
          data-test-id={'edit-button'}
        >
          <EditIcon />
        </IconButton>
        {disableDelete || (
          <IconButton
            onClick={deleteFnc}
            data-test-id={'delete-button'}
          >
            <DeleteOutlineIcon />
          </IconButton>
        )}
      </div>
    )
  );
};

FormActionsComponent.propTypes = {
  editable: PropTypes.bool,
  disableDelete: PropTypes.bool,
  editFnc: PropTypes.func,
  deleteFnc: PropTypes.func,
  resetFnc: PropTypes.func,
};

FormActionsComponent.defaultProps = {
  editable: false,
  disableDelete: false,
  editFnc: () => {},
  deleteFnc: () => {},
  resetFnc: () => {},
};

export default FormActionsComponent;
