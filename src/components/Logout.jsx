import { auth } from '../config/firebase';
import { unregisterBudgetWatcher } from '../redux/modules/BudgetReducer';
import { unregisterDeductionsWatcher, unregisterGrossPayWatcher } from '../redux/modules/IncomeReducer';
import { unregisterMainCategoryWatcher } from '../redux/modules/MainCategoryReducer';
import { unregisterOutgoingWatcher } from '../redux/modules/OutgoingReducer';
import { unregisterUsersWatcher } from '../redux/modules/UserReducer';

const unregisterSnapshotWatcher = () => {
  unregisterMainCategoryWatcher();
  unregisterBudgetWatcher();
  unregisterGrossPayWatcher();
  unregisterDeductionsWatcher();
  unregisterOutgoingWatcher();
  unregisterUsersWatcher();
};

const Logout = () => {
  auth.signOut();
  unregisterSnapshotWatcher();
  return null;
};

export default Logout;
