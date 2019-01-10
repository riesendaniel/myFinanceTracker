# myFinanceTracker

myFinanceTracker helps you to register your outgoings rapidly and straightforward. So you get an overview of how much money you spend in different categories. It is on you to define the categories.

Compare your monthly budget with the outgoings and you will know the money left for more outgoings in this month.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Running the app](#running-the-app)
- [Running the tests](#running-the-tests)
  - [Unit and system tests](#unit-and-system-tests)
  - [End to end tests](#end-to-end-tests)
  - [Coding style tests](#coding-style-tests)
- [Supported Browsers](#supported-browsers)
- [Deployment](#deployment)
  - [Continuous Deployment](#continuous-deployment)
- [Built With](#built-with)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To work with the app you need to install Node.js on your computer.

### Installing

That is how you get your development environment running.

First, clone the git repository.

```
git clone https://github.com/riesendaniel/myFinanceTracker.git
```

Change to the new directory.

```
cd myFinanceTracker
```

Finally, install npm dependencies.

```
npm install
```

Add your `.env.local` file with following variables and their values:
* `REACT_APP_FIREBASE_AUTH_DOMAIN`
* `REACT_APP_FIREBASE_DATABASE_URL`
* `REACT_APP_FIREBASE_API_KEY`
* `REACT_APP_FIREBASE_PROJECT_ID`
* `SAUCE_USERNAME`
* `SAUCE_ACCESS_KEY`

### Running the app

Run the app in the development mode to make it work local.<br>
The page will reload if you make edits.

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Running the tests

### Unit and system tests

You can launch the test runner in the interactive watch mode with

```
npm test
```

### End to end tests

To launch the end to end tests with protractor, type

```
npm run e2e-test
```

### Coding style tests

Make sure your code follows the coding style guide with

```
npm run lint
```

## Supported Browsers

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

## Deployment

Run following command to build the app for production to the `build` folder.

```
npm run build
```

With this the React app gets bundled in production mode and optimized for the best performance. The build is minified and the filenames include the hashes.<br>
Now the app is ready to be deployed!

### Continuous Deployment

After every commit to the master branch, succeeding tests, the project will be deployed with firebase.

## Built With

* [Create React App](https://github.com/facebookincubator/create-react-app) - The web framework
* [Redux](https://redux.js.org/) - The state management
* [Material UI](https://material-ui.com/) - The UI framework
* [React Material UI Form Validator](https://github.com/NewOldMax/react-material-ui-form-validator) - The form validation extension
* [Recharts](http://recharts.org/) - The chart library
* [Firebase Hosting](https://firebase.google.com/products/hosting/) - The web host
* [Cloud Firestore](https://firebase.google.com/products/firestore/) - The cloud storage
* [Firebase Authentication](https://firebase.google.com/products/auth/) - The authentication service
* [React Firebase UI](https://github.com/firebase/firebaseui-web-react) - The firebase UI library
* [Jest](https://facebook.github.io/jest/) - The test runner
* [Protractor](https://www.protractortest.org) - The e2e test runner
* [Babel](https://babeljs.io/) - The JavaScript compiler
* [Enzyme](https://airbnb.io/enzyme/) - The testing utility for React
* [ESLint](https://eslint.org/) - The JavaScript linter
* [AirBnB Styleguide](https://github.com/airbnb/javascript) - The coding style guide

## Authors

* **Daniel Riesen** - *Initial work* - [RiesenDaniel](https://github.com/riesendaniel)
* **Samuel Abächerli** - *Initial work* - [sarner](https://github.com/sarner)

## Acknowledgments

For more information about React apps refer to [Create React App README](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
