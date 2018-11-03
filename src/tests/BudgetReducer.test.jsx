import reducer,
{
  BUDGET_IS_LOADING, RECEIVE_BUDGET,
  LOAD_CATEGORIES,
  CALC_MONTHLY_BUDGET_SUM,
  ADD_BUDGET_ENTRY, UPDATE_BUDGET_ENTRY, DELETE_BUDGET_ENTRY,
  actions,
} from '../redux/modules/BudgetReducer';

const initialState = {
  isLoading: false,
  categories: [],
  budget: [
    {
      id: 1,
      mainCategoryId: 2,
      category: 'Unterhalt',
      color: '#FF0000',
      period: 'monthly',
      monthly: 100,
      yearly: 1200,
    },
    {
      id: 2,
      mainCategoryId: 2,
      category: 'Essen & Getränke',
      color: '#FF9900',
      period: 'monthly',
      monthly: 250,
      yearly: 3000,
    },
    {
      id: 3,
      mainCategoryId: 9,
      category: 'öffentlicher Verkehr',
      color: '#FF0099',
      period: 'yearly',
      monthly: 200,
      yearly: 2400,
    },
    {
      id: 4,
      mainCategoryId: 5,
      category: 'Tanken',
      color: '#FF9999',
      period: 'monthly',
      monthly: 100,
      yearly: 1200,
    },
  ],
  monthlyBudgetSum: null,
};

const budget = [
  {
    id: 1,
    mainCategoryId: 2,
    category: 'Unterhalt',
    color: '#FF0000',
    period: 'monthly',
    monthly: 100,
    yearly: 1200,
  },
  {
    id: 2,
    mainCategoryId: 2,
    category: 'Essen & Getränke',
    color: '#FF9900',
    period: 'monthly',
    monthly: 250,
    yearly: 3000,
  },
  {
    id: 3,
    mainCategoryId: 9,
    category: 'öffentlicher Verkehr',
    color: '#FF0099',
    period: 'yearly',
    monthly: 200,
    yearly: 2400,
  },
  {
    id: 4,
    mainCategoryId: 5,
    category: 'Tanken',
    color: '#FF9999',
    period: 'monthly',
    monthly: 100,
    yearly: 1200,
  },
];

const updatedBudget = [
  {
    id: 1,
    mainCategoryId: 2,
    category: 'Unterhalt',
    color: '#FF0000',
    period: 'monthly',
    monthly: 100,
    yearly: 1200,
  },
  {
    id: 2,
    mainCategoryId: 2,
    category: 'Essen & Getränke',
    color: '#FF9900',
    period: 'monthly',
    monthly: 500,
    yearly: 6000,
  },
  {
    id: 3,
    mainCategoryId: 9,
    category: 'öffentlicher Verkehr',
    color: '#FF0099',
    period: 'yearly',
    monthly: 200,
    yearly: 2400,
  },
  {
    id: 4,
    mainCategoryId: 5,
    category: 'Tanken',
    color: '#FF9999',
    period: 'monthly',
    monthly: 100,
    yearly: 1200,
  },
];

const reducedBudget = [
  {
    id: 1,
    mainCategoryId: 2,
    category: 'Unterhalt',
    color: '#FF0000',
    period: 'monthly',
    monthly: 100,
    yearly: 1200,
  },
  {
    id: 2,
    mainCategoryId: 2,
    category: 'Essen & Getränke',
    color: '#FF9900',
    period: 'monthly',
    monthly: 250,
    yearly: 3000,
  },
  {
    id: 3,
    mainCategoryId: 9,
    category: 'öffentlicher Verkehr',
    color: '#FF0099',
    period: 'yearly',
    monthly: 200,
    yearly: 2400,
  },
];

const newStatus = true;

const monthlyBudgetSum = 650;

const newEntry = {
  mainCategoryId: 2,
  category: 'Elektronik',
  color: '#00FF00',
  period: 'monthly',
  monthly: 150,
  yearly: 1800,
};

const updateEntry = {
  id: 2,
  mainCategoryId: 2,
  category: 'Essen & Getränke',
  color: '#FF9900',
  period: 'monthly',
  monthly: 500,
  yearly: 6000,
};

const deleteId = 4;

const isLoadingAction = {
  type: BUDGET_IS_LOADING,
  status: newStatus,
};

const receiveBudgetAction = {
  type: RECEIVE_BUDGET,
  budget,
};

const loadCategoriesAction = {
  type: LOAD_CATEGORIES,
};

const calcMonthlyBudgetSumAction = {
  type: CALC_MONTHLY_BUDGET_SUM,
  budget,
};

const addBudgetEntryAction = {
  type: ADD_BUDGET_ENTRY,
  entry: newEntry,
};

const updateBudgetEntryAction = {
  type: UPDATE_BUDGET_ENTRY,
  entry: updateEntry,
};

const deleteBudgetEntryAction = {
  type: DELETE_BUDGET_ENTRY,
  id: deleteId,
};

describe('BudgetReducer', () => {
  describe('actions', () => {
    it('should create an action with the loading state', () => {
      expect(actions.isLoading(newStatus)).toEqual(isLoadingAction);
    });

    it('should create an action to save the received budget', () => {
      expect(actions.receiveBudget(budget)).toEqual(receiveBudgetAction);
    });

    it('should create an action to extract the categories from budget', () => {
      expect(actions.loadCategories()).toEqual(loadCategoriesAction);
    });

    it('should create an action to calculate the monthly budget sum', () => {
      expect(actions.calcMonthlyBudgetSum(budget)).toEqual(calcMonthlyBudgetSumAction);
    });

    it('should create an action to add a budget entry', () => {
      expect(actions.addBudgetEntry(newEntry)).toEqual(addBudgetEntryAction);
    });

    it('should create an action to update a budget entry', () => {
      expect(actions.updateBudgetEntry(updateEntry)).toEqual(updateBudgetEntryAction);
    });

    it('should create an action to delete a budget entry', () => {
      expect(actions.deleteBudgetEntry(deleteId)).toEqual(deleteBudgetEntryAction);
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
      const state = { ...initialState, budget };
      expect(reducer(initialState, receiveBudgetAction)).toEqual(state);
    });

    it('should calculate the monthly budget sum', () => {
      const state = { ...initialState, monthlyBudgetSum };
      expect(reducer(initialState, calcMonthlyBudgetSumAction)).toEqual(state);
    });

    it('should extract categories from budget', () => {
      const categories = [
        { id: 1, description: 'Unterhalt', color: '#FF0000' },
        { id: 2, description: 'Essen & Getränke', color: '#FF9900' },
        { id: 3, description: 'öffentlicher Verkehr', color: '#FF0099' },
        { id: 4, description: 'Tanken', color: '#FF9999' },
      ];
      const state = { ...initialState, categories };
      expect(reducer(initialState, loadCategoriesAction)).toEqual(state);
    });

    it('should add a budget entry', () => {
      const state = { ...initialState, budget: [...budget, newEntry] };
      expect(reducer(initialState, addBudgetEntryAction)).toEqual(state);
    });

    it('should update the budget entry', () => {
      const state = { ...initialState, budget: updatedBudget };
      expect(reducer({ ...initialState, budget }, updateBudgetEntryAction)).toEqual(state);
    });

    it('should delete the budget entry', () => {
      const state = { ...initialState, budget: reducedBudget };
      expect(reducer({ ...initialState, budget }, deleteBudgetEntryAction)).toEqual(state);
    });
  });
});
