// ------------------------------------
// Selectors
// ------------------------------------
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
const ADD_DEDUCTION = 'ADD_DEDUCTION';
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

const addDeduction = deduction => ({
  type: ADD_DEDUCTION,
  deduction,
});

const deleteDeduction = id => ({
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

const doLoadIncome = () => (dispatch, getState) => {
  dispatch(isLoading(true));
  setTimeout(() => {
    const {
      grossPay,
      deductions,
    } = getState().income;
    dispatch(receiveIncome({ grossPay, deductions }));
    updateCalculatedElements(dispatch, getState);
    dispatch(isLoading(false));
  }, 1000);
};

const doAddDeduction = deduction => (dispatch, getState) => {
  dispatch(addDeduction(deduction));
  updateCalculatedElements(dispatch, getState);
};

const doDeleteDeduction = id => (dispatch, getState) => {
  dispatch(deleteDeduction(id));
  updateCalculatedElements(dispatch, getState);
};


// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
  doLoadIncome,
  doAddDeduction,
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
    const { grossPay, deductions } = action.income;
    return { ...state, grossPay, deductions };
  },
  [CALC_TOTAL_DEDUCTIONS]: (state, action) => {
    const { grossPay, deductions } = action.income;
    const totalDeductions = calculateTotalDeduction(grossPay, deductions);
    return { ...state, totalDeductions };
  },
  [CALC_NET_PAY]: (state, action) => {
    const { grossPay, totalDeductions } = action.income;
    const netPay = calculateNetPay(grossPay, totalDeductions);
    return { ...state, netPay };
  },
  [ADD_DEDUCTION]: (state, action) => {
    const deductions = [...state.deductions, action.deduction];
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
  grossPay: 4000,
  deductions: [
    {
      id: 1,
      description: 'AHV',
      type: 'percentaged',
      value: 20,
    },
    {
      id: 2,
      description: 'ALV',
      type: 'percentaged',
      value: 5,
    },
    {
      id: 3,
      description: 'Nichtberufsunfall',
      type: 'fixed',
      value: 5,
    },
  ],
  totalDeductions: 0,
  netPay: null,
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
