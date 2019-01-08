import reducer,
{
  BUDGET_IS_LOADING,
  RECEIVE_BUDGET,
  LOAD_CATEGORIES,
  CALC_MONTHLY_BUDGET_SUM,
  actions,
} from '../redux/modules/BudgetReducer';

const initialState = {
  isLoading: true,
  categories: [],
  budget: [],
  budgetHistory: [],
  monthlyBudgetSum: null,
};

const budget = [
  {
    id: 'test2',
    mainCategoryId: 'test2',
    category: 'Essen & Getränke',
    color: '#FF9900',
    period: 'monthly',
    monthly: 250,
    yearly: 3000,
  },
  {
    id: 'test3',
    mainCategoryId: 'test9',
    category: 'öffentlicher Verkehr',
    color: '#FF0099',
    period: 'yearly',
    monthly: 200,
    yearly: 2400,
  },
  {
    id: 'test1',
    mainCategoryId: 'test2',
    category: 'Unterhalt',
    color: '#FF0000',
    period: 'monthly',
    monthly: 100,
    yearly: 1200,
  },
];

const budgetLoaded = [
  {
    id: 'test2',
    mainCategoryId: 'test2',
    category: 'Essen & Getränke',
    color: '#FF9900',
    period: 'monthly',
    monthly: 250,
    yearly: 3000,
  },
  {
    id: 'test3',
    mainCategoryId: 'test9',
    category: 'öffentlicher Verkehr',
    color: '#FF0099',
    period: 'yearly',
    monthly: 200,
    yearly: 2400,
  },
  {
    id: 'test4',
    mainCategoryId: 'test5',
    category: 'Tanken',
    color: '#FF9999',
    period: 'monthly',
    monthly: 100,
    yearly: 1200,
    disabled: true,
  },
  {
    id: 'test1',
    mainCategoryId: 'test2',
    category: 'Unterhalt',
    color: '#FF0000',
    period: 'monthly',
    monthly: 100,
    yearly: 1200,
  },
];

const newStatus = false;

const monthlyBudgetSum = 550;

const isLoadingAction = {
  type: BUDGET_IS_LOADING,
  status: newStatus,
};

const receiveBudgetAction = {
  type: RECEIVE_BUDGET,
  budget: budgetLoaded,
};

const loadCategoriesAction = {
  type: LOAD_CATEGORIES,
};

const calcMonthlyBudgetSumAction = {
  type: CALC_MONTHLY_BUDGET_SUM,
  budget,
};

describe('BudgetReducer', () => {
  describe('actions', () => {
    it('should create an action with the loading state', () => {
      expect(actions.isLoading(newStatus)).toEqual(isLoadingAction);
    });

    it('should create an action to save the received budget', () => {
      expect(actions.receiveBudget(budgetLoaded)).toEqual(receiveBudgetAction);
    });

    it('should create an action to extract the categories from budget', () => {
      expect(actions.loadCategories()).toEqual(loadCategoriesAction);
    });

    it('should create an action to calculate the monthly budget sum', () => {
      expect(actions.calcMonthlyBudgetSum(budget)).toEqual(calcMonthlyBudgetSumAction);
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should change the loading state', () => {
      const state = { ...initialState, isLoading: newStatus };
      expect(reducer(initialState, isLoadingAction)).toEqual(state);
    });

    it('should save the recieved budget', () => {
      const state = { ...initialState, budget, budgetHistory: budgetLoaded };
      expect(reducer(initialState, receiveBudgetAction)).toEqual(state);
    });

    it('should calculate the monthly budget sum', () => {
      const state = { ...initialState, monthlyBudgetSum };
      expect(reducer(initialState, calcMonthlyBudgetSumAction)).toEqual(state);
    });

    it('should extract categories from budget', () => {
      const categories = [
        { id: 'test2', description: 'Essen & Getränke', color: '#FF9900', disabled: undefined },
        { id: 'test3', description: 'öffentlicher Verkehr', color: '#FF0099', disabled: undefined },
        { id: 'test4', description: 'Tanken', color: '#FF9999', disabled: true },
        { id: 'test1', description: 'Unterhalt', color: '#FF0000', disabled: undefined },
      ];
      const state = { ...initialState, budgetHistory: budgetLoaded, categories };
      expect(reducer(
        { ...initialState, budgetHistory: budgetLoaded },
        loadCategoriesAction,
      )).toEqual(state);
    });
  });
});
