import firebase from 'firebase/app';
import 'firebase/database';

let database;

export const init = () => {
    let config = {
        authDomain: "myfinancetracker-ch.firebaseapp.com",
        databaseURL: "https://myfinancetracker-ch.firebaseio.com/"
    };
    firebase.initializeApp(config)
    database = firebase.database();
}

export const getBudgetValues = () => {
    return new Promise((resolve, reject) => {
        var budgetList = [];
        database.ref("/budget").once("value").then((snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var curBudget = childSnapshot.val();
                curBudget.id = key;
                budgetList.push(curBudget);
            });
            resolve(budgetList);
        }).catch(error => {
            reject(error);
        });
    });
}

export const updateBudget = (budget) => {
    return new Promise((resolve, reject) => {
        const id = budget.id;
        delete budget.id;
        //TODO Fehlerhandling
        firebase.database().ref('/budget').child(id).set(budget);
        resolve(budget);
    });
}

export const deleteBudget = (id) => {
    return new Promise((resolve, reject) => {
        //TODO Fehlerhandling
        firebase.database().ref('/budget').child(id).remove().then(budget => {
            resolve(budget);
        }).catch(error => {
            reject(error);
        });
    });
}

export function addNewBudget(budget) {
    return new Promise((resolve, reject) => {
            //TODO Fehlerhandling
            let test;
            const ref = firebase.database().ref('/budget').push({
                group: budget.group,
                category: budget.category,
                period: budget.period,
                monthly: budget.monthly,
                yearly: budget.yearly
            });
            /*, function (error) {
                            if (error) {
                                test = error;
                                console.log('lueg für din scheiss')
                                reject(error);
                            }
                            else {
                            console.log('de mirco het 10-0 verlore')
                            const key = ref.key;
                            budget.id = key;
                            resolve(budget);
                        }
                        });*/
            const key = ref.key;
            budget.id = key;
            resolve(budget);
        }
    );
}

export const getIncomeValues = () => {
    return new Promise((resolve, reject) => {
        var incomeList = [];
        database.ref("/income").once("value").then((snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var curIncome = childSnapshot.val();
                curIncome.id = key;
                incomeList.push(curIncome);
            });
            resolve(incomeList);
        }).catch(error => {
            reject(error);
        });
    });
}

export function getOutgoingValues() {
    return new Promise((resolve, reject) => {
        var outgoingList = [];
        database.ref("/outgoing").once("value").then((snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var curOutgoing = childSnapshot.val();
                curOutgoing.id = key;
                outgoingList.push(curOutgoing);
            });
            resolve(outgoingList);
        }).catch(error => {
            reject(error);
        });
    });
}

export const addNewOutgoing = (outgoing) => {
    return new Promise((resolve, reject) => {
            firebase.database().ref('/outgoing').push({
                outgoingDate: outgoing.outgoingDate,
                outgoingCategory: outgoing.outgoingCategory,
                outgoingTitle: outgoing.outgoingTitle,
                outgoingAmount: outgoing.outgoingAmount,
                outgoingCurrency: outgoing.outgoingCurrency
            }).then(outgoing => {
                resolve(outgoing);
            }).catch(error => {
                reject(error);
            });
        }
    );
}
