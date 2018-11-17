// ------------------------------------
// Selectors
// ------------------------------------
import {
  addNewDeduction,
  deleteDeduction,
  getIncomeValues,
  updateDeduction, updateGrossPay,
} from '../database';
import { addMessage } from '../../components/Notifier';

export const getIsLoading = state => state.income.isLoading;

export const getGrossPay = state => state.income.grossPay;

export const getDeductions = state => state.income.deductions;

export const getTotalDeductions = state => state.income.totalDeductions;

export const getNetPay = state => state.income.netPay;


// ------------------------------------
// Action Types
// ------------------------------------
const INCOME_IS_LOADING = 'INCOME_IS_LOADING';
const RECEIVE_INCOME = 'RECEIVE_INCOME';
const CALC_TOTAL_DEDUCTIONS = 'CALC_TOTAL_DEDUCTIONS';
const CALC_NET_PAY = 'CALC_NET_PAY';
const UPDATE_GROSS_PAY = 'UPDATE_GROSS_PAY';
const ADD_DEDUCTION = 'ADD_DEDUCTION';
const UPDATE_DEDUCTION = 'UPDATE_DEDUCTION';
const DELETE_DEDUCTION = 'DELETE_DEDUCTION';


// ------------------------------------
// Action Creators
// ------------------------------------
const isLoading = status => ({
  type: INCOME_IS_LOADING,
  status,
});

const receiveIncome = income => ({
  type: RECEIVE_INCOME,
  income,
});

const calcTotalDeductions = income => ({
  type: CALC_TOTAL_DEDUCTIONS,
  income,
});

const calcNetPay = income => ({
  type: CALC_NET_PAY,
  income,
});

const updateGrossPayEntry = grossPay => ({
  type: UPDATE_GROSS_PAY,
  grossPay,
});

const addDeduction = deduction => ({
  type: ADD_DEDUCTION,
  deduction,
});

const updateDeductionEntry = deduction => ({
  type: UPDATE_DEDUCTION,
  deduction,
});

const deleteDeductionEntry = id => ({
  type: DELETE_DEDUCTION,
  id,
});


// ------------------------------------
// Async Action Creators
// ------------------------------------
const updateCalculatedElements = (dispatch, getState) => {
  const {
    grossPay,
    deductions,
  } = getState().income;
  dispatch(calcTotalDeductions({ grossPay, deductions }));
  const { totalDeductions } = getState().income;
  dispatch(calcNetPay({ grossPay, totalDeductions }));
};

export function doLoadIncome() {
  return (dispatch, getState) => {
    dispatch(isLoading(true));
    getIncomeValues().then(income => {
        const grossPay = income.grossPay;
        const id = income.id;
        const deductions = income.deductions;
        dispatch(receiveIncome({ grossPay, deductions, id }));
        updateCalculatedElements(dispatch, getState);
        dispatch(isLoading(false));
      }).catch(error => {
        addMessage({ message: 'Einkommen konnte nicht geladen werden' });
        console.error(error);
        dispatch(isLoading(false));
      });
  };
}


export function doUpdateGrossPay(grossPay) {
  return (dispatch, getState) => {
    updateGrossPay(getState().income.id, grossPay).then(() => {
      dispatch(updateGrossPayEntry(grossPay));
      updateCalculatedElements(dispatch, getState);
      }
    ).catch(error => {
      addMessage({ message: 'Abzug konnten nicht geändert werden' });
      console.error(error);
    });
  };
}

export function doAddDeduction(deduction) {
  return (dispatch, getState) => {
    addNewDeduction(deduction).then((item) => {
        deduction.id = item.id;
        dispatch(addDeduction(deduction));
        updateCalculatedElements(dispatch, getState);
      }
    ).catch(error => {
      addMessage({ message: 'Abzug konnte nicht gespeichert werden' });
      console.error(error);
    });
  };
}

export function doUpdateDeduction(deduction) {
  return (dispatch, getState) => {
    updateDeduction(deduction).then(() => {
        dispatch(updateDeductionEntry(deduction));
        updateCalculatedElements(dispatch, getState);
      }
    ).catch(error => {
      addMessage({ message: 'Abzug konnten nicht geändert werden' });
      console.error(error);
    });
  };
}

export function doDeleteDeduction(id) {
  return (dispatch, getState) => {
    deleteDeduction(id).then(() => {
      dispatch(deleteDeductionEntry(id));
      updateCalculatedElements(dispatch, getState);
      }
    ).catch(error => {
      addMessage({ message: 'Abzug konnte nicht gelöscht werden' });
      console.error(error);
    });
  };
}


// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
  doLoadIncome,
  doUpdateGrossPay,
  doAddDeduction,
  doUpdateDeduction,
  doDeleteDeduction,
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const calculateTotalDeduction = (grossPay, deductions) => (
  deductions.reduce((total, deduction) => {
    let amount;
    if (deduction.type === 'percentaged') {
      amount = grossPay / 100 * deduction.value;
    } else {
      amount = deduction.value;
    }
    return total + amount;
  }, 0)
);

const calculateNetPay = (gross, totalDeduction) => (gross - totalDeduction);

const ACTION_HANDLERS = {
  [INCOME_IS_LOADING]: (state, action) => (
    { ...state, isLoading: action.status }
  ),
  [RECEIVE_INCOME]: (state, action) => {
    const { grossPay, deductions, id } = action.income;
    return { ...state, grossPay,id , deductions };
  },
  [CALC_TOTAL_DEDUCTIONS]: (state, action) => {
    const { grossPay, deductions } = action.income;
    const totalDeductions = calculateTotalDeduction(grossPay, deductions);
    return { ...state, totalDeductions };
  },
  [CALC_NET_PAY]: (state, action) => {
    const { grossPay, totalDeductions } = action.income;
    const netPay = calculateNetPay(grossPay, totalDeductions);
    return { ...state, netPay, isLoading: false };
  },
  [UPDATE_GROSS_PAY]: (state, action) => {
    const { grossPay } = action;
    return { ...state, grossPay };
  },
  [ADD_DEDUCTION]: (state, action) => {
    const deductions = [...state.deductions, action.deduction];
    return { ...state, deductions };
  },
  [UPDATE_DEDUCTION]: (state, action) => {
    const deductions = state.deductions.map(
      deduction => (deduction.id !== action.deduction.id ? deduction : action.deduction),
    );
    return { ...state, deductions };
  },
  [DELETE_DEDUCTION]: (state, action) => {
    const deductions = state.deductions.filter(deduction => deduction.id !== action.id);
    return { ...state, deductions };
  },
};


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  grossPay: null,
  deductions: [],
  totalDeductions: 0,
  netPay: null,
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
