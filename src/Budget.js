import React, {Component} from 'react';
import './Budget.css';
import BudgetGroup from './BudgetGroup';
import BudgetGroupCreator from './BudgetGroupCreator';

class Budget extends Component {

    render () {
        return (
            <div className="Budget">
                <h2>Budget</h2>
                <BudgetGroup />
                <BudgetGroupCreator />
                <div>
                    Total 300
                </div>
            </div>
        );
    }

}

export default Budget;