import React, {Component} from 'react';

class BudgetEntryEditor extends Component {

    handleSubmit(event) {
        console.log('Form submitted');
    }

    render () {
        return (
            <div className="BudgetEntryEditor">
                <h2>Budgeteintrag erfassen</h2>
                <form onSubmit="this.handleSubmit" action="/budget">
                    <input type="text" placeholder="Bezeichnung" />
                    <label><input type="radio" name="period" value="monthly" />monatlich</label>
                    <input type="number" placeholder="CHF" />
                    <label><input type="radio" name="period" value="yearly" />jährlich</label>
                    <input type="number" placeholder="CHF" />
                    <button type="submit">Hinzufügen</button>
                </form>
            </div>
        );
    }

}

export default BudgetEntryEditor;