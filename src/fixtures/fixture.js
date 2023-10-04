import { test as fixture } from '@playwright/test'
import businessGeneric from '../pages/businessGeneric'
import basePage from '../pages/basePage'
import loginPage from '../pages/loginPage'

const test = fixture.extend({
basePage: async ({ page }, use) => {
await use(new basePage(page))
},
businessGeneric: async ({ page }, use) => {
await use(new businessGeneric(page))
},
loginPage: async ({ page }, use) => {
    await use(new loginPage(page))
    }
})
export default test