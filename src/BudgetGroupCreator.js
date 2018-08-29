import React, {Component} from 'react';
import './BudgetGroupCreator.css';

class BudgetGroupCreator extends Component {

    addGroup(event) {
        if (event.key === 'Enter') {
            this.props.onGroupAdded(event.target.value);
        }
    }

    render () {
        return (
            <div className="BudgetGroupCreator">
                <input onKeyUp={event => this.addGroup(event)} placeholder="Hauptkategorie hinzufügen..." />
            </div>
        );
    }

}

export default BudgetGroupCreator;