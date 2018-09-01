import React, {Component} from 'react';

class BudgetGroup extends Component {

    render () {
        return (
            <div className="BudgetGroup">
                <h3>{this.props.group}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Kategorie</th>
                            <th>monatlich</th>
                            <th>jährlich</th>
                            <th>Entfernen</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.budget.map(item => {return (
                            <tr>
                                <td>{item.category}</td>
                                <td>{item.monthly}</td>
                                <td>{item.yearly || '-'}</td>
                                <td><button type="button">X</button></td>
                            </tr>
                        )}) }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4"><a href="/budget/edit">Eintrag hinzufügen...</a></td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{ this.props.budget.reduce((total, item) => {return total + item.monthly;}, 0) }</td>
                            <td>{ this.props.budget.reduce((total, item) => {return total + item.yearly;}, 0) }</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }

}

export default BudgetGroup;