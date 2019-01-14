import PropTypes from 'prop-types';

const CustomPropTypes = {
  breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  budgetEntry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    mainCategoryId: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    color: PropTypes.color,
    period: PropTypes.oneOf(['monthly', 'yearly']).isRequired,
    monthly: PropTypes.number.isRequired,
    yearly: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
  }),
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.color,
    disabled: PropTypes.bool,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classes: PropTypes.objectOf(PropTypes.string),
  currency: PropTypes.oneOf(['CHF']),
  deduction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['percentaged', 'fixed']).isRequired,
    value: PropTypes.number.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
  mainCategory: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  menuState: PropTypes.oneOf(['open', 'closed']),
  outgoing: PropTypes.shape({
    id: PropTypes.string.isRequired,
    outgoingTitle: PropTypes.string,
    outgoingAmount: PropTypes.number,
    outgoingCategoryId: PropTypes.string.isRequired,
    outgoingDate: PropTypes.string.isRequired,
  }),
  outgoingByCategory: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    color: PropTypes.color,
    amount: PropTypes.number.isRequired,
  }),
  outgoingsByCategory: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    outgoings: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    state: PropTypes.oneOf(['unrequested', 'pending', 'approved', 'rejected']).isRequired,
    role: PropTypes.oneOf(['standard', 'extended', 'admin']).isRequired,
  }),
};

export default CustomPropTypes;
