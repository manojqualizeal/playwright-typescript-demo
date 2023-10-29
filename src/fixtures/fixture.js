import { test as fixture } from '@playwright/test'
import ApplicationGeneric from '../pages/applicationGeneric'
import PlaywrightUtil from '../utils/playwrightUtil'
import LoginPage from '../pages/loginPage'
import Companies from '../pages/companies'

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
    await use(new Companies(page))
    }
})
export default test