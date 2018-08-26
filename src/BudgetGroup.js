import React, {Component} from 'react';
import './BudgetGroup.css';

class BudgetGroup extends Component {

    render () {
        return (
            <div className="BudgetGroup">
                <h3>Haushalt</h3>
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
                        <tr>
                            <td>Unterhalt</td>
                            <td>100</td>
                            <td>-</td>
                            <td><button type="button">X</button></td>
                        </tr>
                        <tr>
                            <td>Essen & Getränke</td>
                            <td>250</td>
                            <td>-</td>
                            <td><button type="button">X</button></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4"><input placeholder="Eintrag hinzufügen..." /></td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>350</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }

}

export default BudgetGroup;