import React, {Component} from 'react';
import './BudgetGroupCreator.css';

class BudgetGroupCreator extends Component {

    render () {
        return (
            <div className="BudgetGroupCreator">
                <input placeholder="Hauptkategorie hinzufügen..." />
            </div>
        );
    }

}

export default BudgetGroupCreator;