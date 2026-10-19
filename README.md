# Cypress SauceDemo Tests

A Cypress end-to-end UI test suite that practices against [Sauce Demo](https://www.saucedemo.com), a public demo e-commerce app. It is a learning project and portfolio piece. It currently covers the Login and Cart features.

## What is covered

15 test cases are implemented: 11 for Login and 4 for Cart.

### Login (`cypress/e2e/login.cy.js`)

- TC01 - Must login correctly given valid username and password
- TC02 - Must not login when username is correct, but password is invalid
- TC03 - Must not login when username is nonexistant with some password
- TC04 - Must not login when username is blank and password is valid
- TC05 - Must not login when username is valid and password is blank
- TC06 - Must not login when both fields are blank
- TC07 - Must not login when username has whitespace-only and password is valid
- TC08 - Must not login when password is whitespace-only and username is valid
- TC09 - Must not login when username and password are whitespace-only
- TC10 - Must not login when the user is locked_out_user and password is correct
- TC11 - Must not login when the user is locked out and the password is incorrect (validation order)

### Cart (`cypress/e2e/cart.cy.js`)

- TC01 - Must add the item to the cart when the button "add to cart" is clicked from the inventory screen
- TC02 - Must change the button label from "add to cart" to "remove" when a product is added to the cart from the inventory screen
- TC03 - Must add the item to the cart when the button "add to cart" is clicked from the item screen.
- TC04 - Must change the button label from "add to cart" to "remove" when a product is added to the cart from the item screen.

### Planned / in progress (Cart, not implemented yet)

- 05 Update the cart icon to display the number of items in the cart (adding)
- 06 Update the cart icon to display the number of items in the cart (removing)
- 07 Cart icon badge disappears when the number of items in the cart is 0
- 08 Button label changes from "remove" to "add to cart" when a product is removed in the inventory screen
- 09 Button label changes from "remove" to "add to cart" when a product is removed in the item screen
- 10 Allow removing items from the cart screen (item disappears from the list)
- 11 Quantity number in the cart screen cannot be edited
- 12 Button label state persists between inventory screen and item screen
- 13 Button label state persists between inventory screen and cart screen
- 14 Button label state persists between item screen and cart screen

## Project structure

```
.
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js          # Login test suite
│   │   └── cart.cy.js           # Cart test suite
│   ├── fixtures/
│   │   ├── credentials.json     # Test users (valid and locked out)
│   │   └── example.json         # Default Cypress example fixture
│   └── support/
│       ├── commands/
│       │   └── login.js         # Custom command: cy.login
│       ├── commands.js          # Imports custom commands
│       └── e2e.js               # Support file loaded before each spec
├── cypress.config.js            # Cypress config (baseUrl: https://www.saucedemo.com)
└── package.json                 # Dependencies (Cypress)
```

## Patterns used

- **Custom command** - `cy.login(username, password)` is defined in `cypress/support/commands/login.js` and registered through `cypress/support/commands.js`. It types into a field only when a value is given, so blank-field cases can reuse it.
- **Fixtures for test data** - user credentials live in `cypress/fixtures/credentials.json` and are loaded with `cy.fixture('credentials')` in both specs.
- **Base URL** - `baseUrl` is set in `cypress.config.js`, so tests call `cy.visit('/')`.
- **`beforeEach` setup** - `login.cy.js` visits the site. `cart.cy.js` also logs in with the valid user.
- **Arrange / Act / Assert comments** - used to structure the test bodies in both specs.
- **`data-test` selectors** - elements are located with `[data-test="..."]` attributes.
- **Aliases** - `cart.cy.js` saves the first item's name with `.as('firstItemName')` and compares it against the cart page.
- **Scoped queries** - `.within()` limits actions to the first inventory item in `cart.cy.js`.
- **Descriptive test IDs** - each test is titled `TCxx - Must ...`, and a comment block at the top of each spec lists the planned cases.

## Getting started

Prerequisite: [Node.js](https://nodejs.org/) with npm.

```bash
npm install
```

Open the interactive Cypress runner:

```bash
npx cypress open
```

Run all specs headless:

```bash
npx cypress run
```

Run a single spec:

```bash
npx cypress run --spec cypress/e2e/login.cy.js
```

`package.json` has no custom test scripts yet (the default `npm test` placeholder just prints an error), so use the `npx` commands above.

## Notes

- This project is a work in progress. More Cart cases are planned.
- After Cart, I plan to finish covering the remaining features of the demo site.
- The target site, saucedemo.com, is a public demo application intended for practice. No real data is involved.
