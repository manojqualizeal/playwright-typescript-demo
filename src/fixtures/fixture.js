import { test as fixture } from './facade'
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




export default test