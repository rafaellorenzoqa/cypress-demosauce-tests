const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '8utkuo',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.saucedemo.com'
  },
});
