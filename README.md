# Chess.com - Front End Programming Challenge

Welcome to the [Chess.com](https://chess.com) front end programming challenge!

# Instructions
1. Fork this repository.
2. Create a VueJS application that satisfies the requirements detailed below.
3. Provide links to your fork of this repository and a live demo of your application.

# Application Requirements
1. Create a page with a chessboard and a sidebar.
2. On desktop devices the sidebar should be positioned to the right of the chessboard.
3. On mobile devices the sidebar should be positioned below the chessboard.
4. The chessboard should resize responsively to consume available space.
5. Clicking a chessboard square should highlight the square.
6. Keep track of which squares are clicked and the order in which they're clicked.
7. Display the information collected from step 6 in the sidebar.

# Questions & Feedback
Please contact Nick Kampa (nkampa@chess.com) with any questions or feedback regarding this challenge.

# Description

## Dependencies

- [Node.js](https://nodejs.org/es): v18.13.0
- [npm](https://www.npmjs.com/): v9.6.1
- [nvm](https://github.com/nvm-sh/nvm) (optional)

## Directory structure

```
.
├── cypress                         # Cypress tests
│   ├── e2e                         # End-to-end tests
│   │   ├── 1-chessboard            # Chessboard tests
│   │   └── 2-sidebar               # Sidebar tests
│   └── support                     # Cypress configuration and utilities
├── dist                            # Distributable version of the app
└── src                             # Source code
    ├── assets                      # Static assets used by the app
    │   ├── images                  # Image files
    ├── styles                      # Sass files defining app styles
    │   ├── _variables.scss         # Variables used across the app styles
    │   └── index.scss              # Main Sass file importing app styles
    └── components                  # Reusable Vue components used across the app
```

## Initial setup

1. Install and set the right Node.js version if you're using other one:
```sh
$ nvm install v18.13.0
$ nvm use v18.13.0
```

2. Install the `node_modules`:
```sh
$ npm install
```

3. Run locally:
```sh
$ npm run dev
```

4. Access the application at `http://localhost:5173/` in your browser.
