import { test as fixture, playwright } from '@playwright/test'
import ApplicationGeneric from '../pages/applicationGeneric'
import PlaywrightUtil from '../utils/playwrightUtil'
import LoginPage from '../pages/loginPage'
import Companies from '../pages/companies'
import Contacts from '../pages/contacts'


const test = fixture.extend({

  playwrightUtil: async ({ page }, use) => {
    await use(new PlaywrightUtil(page))
  },
  applicationGeneric: async ({ page }, use) => {        
      await use(new ApplicationGeneric(page))
  },
  loginPage: async ({ page }, use) => {
      await use(new LoginPage(page))
      },
  companies: async ({ page }, use) => {
    await use(new Companies(page));
    },
  contacts: async ({ page }, use) => {
    await use(new Contacts(page));
    }

})

// test.extend(async ({ playwright }) => {
//       const capabilities = {
//       'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
//       'browserVersion': 'latest',
//       'LT:Options': {
//         'platform': 'Windows 10',
//         'build': 'Playwright Single Build',
//         'name': 'Playwright Sample Test',
//         'user': process.env.LAMBDA_TEST_USERNAME,
//         'accessKey': process.env.LAMBDA_TEST_ACCESS_KEY,
//         'network': true,
//         'video': true,
//         'console': true,
//         'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
//         'tunnelName': '', // Optional
//         'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
//         'playwrightClientVersion': playwrightClientVersion
//       }
//     };
//   const browser = await playwright['chromium'].connect({
//     wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
//   });
//   return browser;
// });


export default test