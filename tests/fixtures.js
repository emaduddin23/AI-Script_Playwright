const base = require('@playwright/test');
const { LoginPage } = require('../pages/Login/LoginPage');
const { DashboardPage } = require('../pages/Dashboard/DashboardPage');
const { MyProfilePage } = require('../pages/MyProfile/MyProfilePage');
const { ApplicationsPage } = require('../pages/Applications/ApplicationsPage');
const { StudentPage } = require('../pages/Student/StudentPage');
const { SearchPage } = require('../pages/Search/SearchPage');

const test = base.test.extend({
  // Fixtures for injecting page objects directly into tests
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  myProfilePage: async ({ page }, use) => {
    await use(new MyProfilePage(page));
  },
  applicationsPage: async ({ page }, use) => {
    await use(new ApplicationsPage(page));
  },
  studentPage: async ({ page }, use) => {
    await use(new StudentPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
});

module.exports = { test, expect: base.expect };
