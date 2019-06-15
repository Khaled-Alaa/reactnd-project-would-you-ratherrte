# Would you rather Project
This is my second assessment project for Udacity's React & Redux course.
The goal of this project is to have Polls of would you rather; each user have answered and unanswered questions, can view leaderboard and create new polls. 

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
      ├── components
      │   ├── App
      │       ├── style.css # Styles for your app.
      │       └── index.js # The Appbar and the routes for the application.
      │   ├── Create
      │       └── index.js # Component for adding new questions.
      │   ├── LeaderBoard
      │       └── index.js # Component for loading all users with the hights number of answers and  questions to the lowest.
      │   ├── Loggin
      │       └── index.js # Compnent for loading all users in the application to choose one to log in  with.
      │   ├── NoMatch
      │       └── index.js # Component to fall to when the route does not exisit. 
      │   ├── Question
      │       └── index.js # Component to show each question.
      │   ├── Questions
      │       └── index.js # Component to show all questions divided into answered and unanswered.
      ├── redux
      │   ├── actions # Folder containing a file for each data model and their specific actions.
      │   ├── reducers # Folder containing a file for each data model to maintain their store.
      │   ├── consts.js # File containing all action types to ensure no spelling mistake is done.
      │   ├── middleware.js # Applying thunk as a promise middleware.
      │   └── store.js # Creating a redux store.
      ├── index.js # Entry point for the react app to link the App with the provider and store.
      ├── index.css # Styles for your app. Feel free to customize this as you desire.
      ├── api.js # helper methodes to communicate with the _DATA file as a database.
      └── _DATA.js # Initial Data.
```

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
