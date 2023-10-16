import { test as fixture } from '@playwright/test'
import ApplicationGeneric from '../pages/applicationGeneric'
import PlaywrightUtil from '../utils/playwrightUtil'
import LoginPage from '../pages/loginPage'

const test = fixture.extend({
playwrightUtil: async ({ page }, use) => {
await use(new PlaywrightUtil(page))
},
applicationGeneric: async ({ page }, use) => {
await use(new ApplicationGeneric(page))
},
loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
    }
})
export default test