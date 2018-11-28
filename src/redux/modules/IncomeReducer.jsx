import {
  snapshotWatcher,
  addDocument,
  updateDocument,
  deleteDocument,
} from '../database';

const incomeCollection = 'income';
const deductionsCollection = 'deductions';

// ------------------------------------
// Selectors
// ------------------------------------
export const getIsLoading = state => state.income.isLoading;
export const getGrossPay = state => state.income.grossPay.amount;
export const getDeductions = state => state.income.deductions;
export const getTotalDeductions = state => state.income.totalDeductions;
export const getNetPay = state => state.income.netPay;


// ------------------------------------
// Action Types
// ------------------------------------
const INCOME_IS_LOADING = 'INCOME_IS_LOADING';
const RECEIVE_GROSS_PAY = 'RECEIVE_GROSS_PAY';
const RECEIVE_DEDUCTIONS = 'RECEIVE_DEDUCTIONS';
const CALC_TOTAL_DEDUCTIONS = 'CALC_TOTAL_DEDUCTIONS';
const CALC_NET_PAY = 'CALC_NET_PAY';


// ------------------------------------
// Action Creators
// ------------------------------------
const isLoading = status => ({
  type: INCOME_IS_LOADING,
  status,
});

const receiveGrossPay = grossPay => ({
  type: RECEIVE_GROSS_PAY,
  grossPay,
});

const receiveDeductions = deductions => ({
  type: RECEIVE_DEDUCTIONS,
  deductions,
});

const calcTotalDeductions = income => ({
  type: CALC_TOTAL_DEDUCTIONS,
  income,
});

const calcNetPay = income => ({
  type: CALC_NET_PAY,
  income,
});


// ------------------------------------
// Async Action Creators
// ------------------------------------
const updateCalculatedElements = (dispatch, getState) => {
  const {
    grossPay,
    deductions,
  } = getState().income;
  dispatch(calcTotalDeductions({ grossPay: grossPay.amount, deductions }));
  const { totalDeductions } = getState().income;
  dispatch(calcNetPay({ grossPay: grossPay.amount, totalDeductions }));
};

const doLoadGrossPay = snapshot => (dispatch, getState) => {
  dispatch(isLoading(true));
  if (snapshot) {
    const doc = snapshot.docs[0];
    const grossPay = {
      id: doc.id,
      ...doc.data(),
    };
    dispatch(receiveGrossPay(grossPay));
    updateCalculatedElements(dispatch, getState);
  }
  dispatch(isLoading(false));
};

const initializeGrossPayWatcher = () => (dispatch) => {
  snapshotWatcher(incomeCollection, snapshot => dispatch(doLoadGrossPay(snapshot)));
};

const doLoadDeductions = snapshot => (dispatch, getState) => {
  dispatch(isLoading(true));
  if (snapshot) {
    const deductions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(receiveDeductions(deductions));
    updateCalculatedElements(dispatch, getState);
  }
  dispatch(isLoading(false));
};

const initializeDeductionsWatcher = () => (dispatch) => {
  snapshotWatcher(deductionsCollection, snapshot => dispatch(doLoadDeductions(snapshot)));
};

const doUpdateGrossPay = amount => (dispatch, getState) => {
  dispatch(isLoading(true));
  const {
    grossPay,
  } = getState().income;
  if (grossPay.id) {
    updateDocument(incomeCollection, { id: grossPay.id, amount });
  } else {
    addDocument(incomeCollection, { id: grossPay.id, amount });
  }
  dispatch(isLoading(false));
};

const doAddDeduction = deduction => (dispatch) => {
  dispatch(isLoading(true));
  addDocument(deductionsCollection, deduction);
  dispatch(isLoading(false));
};

const doUpdateDeduction = deduction => (dispatch) => {
  dispatch(isLoading(true));
  updateDocument(deductionsCollection, deduction);
  dispatch(isLoading(false));
};

const doDeleteDeduction = id => (dispatch) => {
  dispatch(isLoading(true));
  deleteDocument(deductionsCollection, id);
  dispatch(isLoading(false));
};


// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
  initializeGrossPayWatcher,
  initializeDeductionsWatcher,
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
  [RECEIVE_GROSS_PAY]: (state, action) => {
    const { grossPay } = action;
    return { ...state, grossPay };
  },
  [RECEIVE_DEDUCTIONS]: (state, action) => {
    const { deductions } = action;
    return { ...state, deductions };
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
};


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  grossPay: {},
  deductions: [],
  totalDeductions: 0,
  netPay: null,
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
