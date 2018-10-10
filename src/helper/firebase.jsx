import firebase from 'firebase/app';
import 'firebase/database';
import {generateUuid} from "./helper";
import {loadedOutgoings, addOutgoing} from "../redux/modules/OutgoingReducer";

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
    var budgetList = [];
    database.ref("/budget").once("value").then((snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            budgetList.push(childData);
        });
    });
    return budgetList;
}

export function getOutgoingValues() {
    return (dispatch) => {
        var outgoingList = [];
        database.ref("/outgoing").once("value").then((snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                outgoingList.push(childData);
            });
            dispatch(loadedOutgoings(outgoingList));
        });
    };
}

export const addNewOutgoing = (entry) => {
    return (dispatch) => {
        firebase.database().ref('/outgoing').push({
            id: generateUuid(),
            outgoingDate: entry.outgoingDate,
            outgoingCategory: entry.outgoingCategory,
            outgoingTitle: entry.outgoingTitle,
            outgoingAmount: entry.outgoingAmount,
            outgoingCurrency: entry.outgoingCurrency
        });
        dispatch(addOutgoing(entry));
    };
}

export const addBudget = (id, name) => {
    //const key = firebase.database().ref('budget').child().key;
    //return new Promise((resolve, reject) => {
    return firebase.database().ref('budget/').push({
        id: generateUuid(),
        group: "Haushalt",
        category: "Unterhalt",
        period: 'monthly',
        monthly: 100,
        yearly: 1200
        //});
    })
}