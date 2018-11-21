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
  }),
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.color,
  }),
  classes: PropTypes.objectOf(PropTypes.string),
  currency: PropTypes.oneOf(['CHF']),
  deduction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
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
};

export default CustomPropTypes;