import React, {Component} from 'react';
import './Budget.css';
import BudgetGroup from './BudgetGroup';
import BudgetGroupCreator from './BudgetGroupCreator';

class Budget extends Component {

    groups = [
        "Wohnen",
        "Haushalt",
        "Gesundheit & Körper",
        "Freizeit",
        "Reisen",
        "Versicherungen",
        "Steuern",
        "Sparen & Anlegen"
    ];

    budget = [
        {
            id: 1,
            group: 'Haushalt',
            category: 'Unterhalt',
            monthly: 100,
            yearly: null
        },
        {
            id: 2,
            group: 'Haushalt',
            category: 'Essen & Getränke',
            monthly: 250,
            yearly: null
        },
        {
            id: 3,
            group: 'Mobilität',
            category: 'öffentlicher Verkehr',
            monthly: null,
            yearly: 2600
        }
    ]

    constructor () {
        super();
        this.state = {
            budget: this.budget,
            groups: this.groups
        }
    }

    addGroup(name) {
        this.setState({groups: this.state.groups.concat(name)});
    }

    render () {
        return (
            <div className="Budget">
                <h2>Budget</h2>
                { this.state.groups.map(group => {
                    let list = this.state.budget.filter(item => item.group === group);
                    return list.length !== 0 && <BudgetGroup group={group} budget={list} />;
                }) }
                <BudgetGroupCreator onGroupAdded={(name) => this.addGroup(name)} />
                <div>
                    <span>Total</span>
                    <span>{ this.state.budget.reduce((total, item) => {return total + item.monthly;}, 0) }</span>
                    <span>{ this.state.budget.reduce((total, item) => {return total + item.yearly;}, 0) }</span>
                </div>
            </div>
        );
    }

}

export default Budget;