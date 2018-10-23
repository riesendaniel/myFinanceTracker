import firebase from 'firebase/app';
import 'firebase/database';

// ------------------------------------
// Database init
// ------------------------------------
let database;
export const init = () => {
  let config = {
    authDomain: 'myfinancetracker-ch.firebaseapp.com',
    databaseURL: 'https://myfinancetracker-ch.firebaseio.com/',
    apiKey: 'AIzaSyCiOr3lhkNp8rueEEgudXYnrPnZwN2bMME'
  };
  firebase.initializeApp(config);
  database = firebase.database();
};

// ------------------------------------
// Budget
// ------------------------------------
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
            const ref = firebase.database().ref('/budget').push({
                mainCategoryId: budget.mainCategoryId,
                category: budget.category,
                period: budget.period,
                monthly: budget.monthly,
                yearly: budget.yearly
            });
            /* , function (error) {
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

// ------------------------------------
// Income
// ------------------------------------
export const getIncomeValues = () => {
  return new Promise((resolve, reject) => {
    var income = [];
    database.ref('/income2').once('value').then((snapshot) => {
      //console.log(JSON.stringify(snapshot));
      console.log(snapshot.val());
      snapshot.forEach(function (childSnapshot) {
        //var key = childSnapshot.key;
        var curIncome = childSnapshot.val();
        //console.log(childSnapshot.val());
        income.push(curIncome);
      });
      console.log(income);
      resolve(income);
    }).catch(error => {
      reject(error);
    });
  });
};

// ------------------------------------
// Outgoing
// ------------------------------------
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

export function addNewOutgoing(outgoing) {
  return new Promise((resolve, reject) => {
      const ref = firebase.database().ref('/outgoing').push({
        outgoingDate: outgoing.outgoingDate,
        outgoingCategory: outgoing.outgoingCategory,
        outgoingTitle: outgoing.outgoingTitle,
        outgoingAmount: outgoing.outgoingAmount,
        outgoingCurrency: outgoing.outgoingCurrency
      });
      const key = ref.key;
      outgoing.id = key;
      resolve(outgoing);
    }
  );
}

export const updateOutgoing = (outgoing) => {
  return new Promise((resolve, reject) => {
    const id = outgoing.id;
    delete outgoing.id;
    //TODO Fehlerhandling
    firebase.database().ref('/outgoing').child(id).set(outgoing);
    resolve(outgoing);
  });
};

export const deleteOutgoing = (id) => {
  return new Promise((resolve, reject) => {
    //TODO Fehlerhandling
    firebase.database().ref('/outgoing').child(id).remove().then(outgoing => {
      resolve(outgoing);
    }).catch(error => {
      reject(error);
    });
  });
};

