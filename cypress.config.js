const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 30000,
  reporter: 'mochawesome',
  env: {
    baseUrl: 'https://rahulshettyacademy.com',
    sauceDemoUrl: 'https://www.saucedemo.com/'
  },
  retries: {
    runMode: 1,
  },
  projectId: 'ri81oq',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.js',
  },
})
