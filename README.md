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

---

# Description

Solution for the Chess.com front end programming challenge. Besides VueJS, the project utilizes the following technologies:

- [TypeScript](https://www.typescriptlang.org/)
- [Cypress](https://www.cypress.io/)
- [Vercel](https://vercel.com/)
- [Vite](https://vitejs.dev/)
- [Sass](https://sass-lang.com/)
- [ESLint](https://sass-lang.com/)
- [Prettier](https://prettier.io/)

Despite the simplicity of the problem, I aimed to give the project a well-structured and maintainable codebase. To achieve this, I separated the `ChessBoard` and `Sidebar` components into their own files, and utilized SCSS variables to keep the styling organized.

A live version of the solution can be accessed [here](https://frontendtest-psi.vercel.app/).

## Coding Conventions

The project adheres to the following coding conventions and best practices:

- **ESLint and Vue.js**: Linting rules provided by ESLint and the official Vue.js style guide. See [ESLint Vue.js rules](https://eslint.vuejs.org/rules/) for more details.
- **Prettier**: Recommended Prettier configuration for Vue.js projects. See [Prettier Vue Configuration](https://github.com/vuejs/eslint-config-prettier#prettier-config-for-vue) for more details.
- **BEM (Block Element Modifier)**: BEM methodology for CSS styling. See [getbem.com](https://getbem.com/) for more details.

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

2. Install the project dependencies:
```sh
$ npm install
```

3. Run locally:
```sh
$ npm run dev
```

4. Run tests:
```sh
$ npm run test
```

5. Access the application at `http://localhost:5173/` in your browser.
