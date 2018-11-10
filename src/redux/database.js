import { auth, database } from '../config/firebase';

// ------------------------------------
// Budget
// ------------------------------------
export function getBudgetValues() {
  return new Promise((resolve, reject) => {
    var budgetList = [];
    database.collection("budget").where("userId", "==", auth.currentUser.uid).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var key = doc.id;
          var curBudget = doc.data();
          curBudget.id = key;
          budgetList.push(curBudget);
        });
        resolve(budgetList);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        reject(error);
      });
  });
}

export function addNewBudget(budget) {
  return database.collection('budget').add({
    mainCategoryId: budget.mainCategoryId,
    category: budget.category,
    period: budget.period,
    monthly: budget.monthly,
    yearly: budget.yearly,
    userId: auth.currentUser.uid,
  });
}

export const updateBudget = (budget) => {
  return database.collection('budget')
    .doc(budget.id)
    .update({
      mainCategoryId: budget.mainCategoryId,
      category: budget.category,
      period: budget.period,
      monthly: budget.monthly,
      yearly: budget.yearly
    });
};

export const deleteBudget = (id) => {
  return database.collection("budget")
    .doc(id)
    .delete();
};

// ------------------------------------
// Income
// ------------------------------------
export function getIncomeValues() {
  return new Promise((resolve, reject) => {
    let data;
    database.collection("income").where("userId", "==", auth.currentUser.uid).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          data = doc.data();
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        reject(error);
      });

    var deductionList = [];
    database.collection("deductions").where("userId", "==", auth.currentUser.uid).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var key = doc.id;
          var curDecuction = doc.data();
          curDecuction.id = key;
          deductionList.push(curDecuction);
        });
        data.deductions = deductionList;
        resolve(data);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        reject(error);
      });
  });
}

// ------------------------------------
// Outgoing
// ------------------------------------
export function getOutgoingValues() {
  return new Promise((resolve, reject) => {
    var outgoingList = [];
    database.collection("outgoing").where("userId", "==", auth.currentUser.uid).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var key = doc.id;
          var curOutgoing = doc.data();
          curOutgoing.id = key;
          outgoingList.push(curOutgoing);
        });
        resolve(outgoingList);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        reject(error);
      });
  });
}

export function addNewOutgoing(outgoing) {
  return database.collection('outgoing').add({
    outgoingDate: outgoing.outgoingDate,
    outgoingCategoryId: outgoing.outgoingCategoryId,
    outgoingTitle: outgoing.outgoingTitle,
    outgoingAmount: outgoing.outgoingAmount,
    userId: auth.currentUser.uid,
  });
}

export const updateOutgoing = (outgoing) => {
  return database.collection('outgoing')
    .doc(outgoing.id)
    .update({
      outgoingDate: outgoing.outgoingDate,
      outgoingCategoryId: outgoing.outgoingCategoryId,
      outgoingTitle: outgoing.outgoingTitle,
      outgoingAmount: outgoing.outgoingAmount,
    });
};

export const deleteOutgoing = (id) => {
  return database.collection("outgoing")
    .doc(id)
    .delete();
};

// ------------------------------------
// Main Categories
// ------------------------------------
export function getCategoryValues() {
  return new Promise((resolve, reject) => {
    var categories = [];
    database.collection("categories").where("userId", "==", auth.currentUser.uid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var key = doc.id;
          var category = doc.data();
          category.id = key;
          categories.push(category);
        });
        resolve(categories);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        reject(error);
      });
  });
}

export function addNewCategory(category) {
  return database.collection('categories').add({
    description: category.description,
    color: category.color,
    userId: auth.currentUser.uid,
  });
}

export const updateCategory = (category) => {
  return database.collection('categories')
    .doc(category.id)
    .update({
      description: category.description,
      color: category.color,
    });
};

export const deleteCategory = (id) => {
  return database.collection("categories")
    .doc(id)
    .delete();
};


