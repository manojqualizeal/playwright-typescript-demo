// @ts-check
import {expect} from "@playwright/test";
import test from '../fixtures/fixture'
import * as locators from "../pagelocators/locators";
import * as configprop from "../utils/configProp";


test.describe('@smoke: Login as a user and Verify login is successful',
	() => {
		test('New Application', async ({
			playwrightUtil,
			applicationGeneric,
            loginPage
		}) => {
                await test.step(`Open the URL and Enter Username and Password & Verify the user is logged in`, async () => {

                await loginPage.login(configprop.UserName,configprop.PassWord);

                await loginPage.verifyLoginIsSuccessful();

				await applicationGeneric.selectEntity(configprop.NavCompanies) ;

				await playwrightUtil.waitForSomeTime(10);

      
			})

//             await test.step(`Enter Info`, async () => {

//                 await basePage.open(configprop.URL1);

//                 await basePage.waitForPageLoadDomcontentloaded();

//                 await basePage.clickOnElement(locators.btnGraph);

//                 await basePage.verifyElementAttached(locators.txtPrice);

//                 await businessGeneric.selectValuefromDropDownAppGeneric(locators.btnselectCustomer,locators.listBoxGeneral,"customer 1");

//                 await basePage.waitForSomeTime(40);


//             })

    });
});




// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });