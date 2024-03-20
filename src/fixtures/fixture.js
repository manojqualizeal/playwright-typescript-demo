import { test as fixture } from '@playwright/test'
import ApplicationGeneric from '../pages/applicationGeneric'
import PlaywrightUtil from '../utils/playwrightUtil'
import LoginPage from '../pages/loginPage'
import Companies from '../pages/companies'

const { chromium } = require('playwright')
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

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

  // const capabilities = {
  //   'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  //   'browserVersion': 'latest',
  //   'LT:Options': {
  //     'platform': 'Windows 10',
  //     'build': 'Playwright Single Build',
  //     'name': 'Lambdatest',
  //     'user': "vignesh.ponna",
  //     'accessKey': "TTcZMa4Yszygocm0Kjw5yZWfHK75z7vKgLdC45Rx7RWaw6rRjZ",
  //     'network': true,
  //     'video': true,
  //     'console': true,
  //     'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
  //     'tunnelName': '', // Optional
  //     'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
  //     'playwrightClientVersion': playwrightClientVersion
  //   }
  // }

  //   const browser = await chromium.connect({
  //     wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  //   })

  //   page = await browser.newPage()

    await use(new Companies(page));
    }
})
export default test