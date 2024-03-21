// @ts-check
import test from '../../fixtures/fixture';
import * as locators from "../../pageobjects/locators";
import * as companiesLocators from "../../pageobjects/companiesLocators";
import * as commonLocators from "../../pageobjects/commonLocators";
import * as configprop from "../../utils/configProp";
import dataHandling from "../../utils/dataHandling";
import { chromium } from '@playwright/test';


let objReadData = new dataHandling();

// test.use(chromium.override({
// 	connect: async (options) => {
// 	  const capabilities = {
// 		// ... your LambdaTest options
// 	  };
// 	  options.wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
// 	  return chromium.connect(options);
// 	}
//   }));

test.describe('Create Company',
	() => {
		test('New Application', async ({
			applicationGeneric,
            loginPage,
			companies
		}) => {
                await test.step(`Open the URL and Enter Username and Password & Verify the user is logged in`, async () => 
				{

					await loginPage.login(configprop.UserName,configprop.PassWord);

					await loginPage.verifyLoginIsSuccessful();

					// await applicationGeneric.selectValueFromAutoCompleteSearch(companiesLocators.txtTags,"Demo deal",10);

					// await applicationGeneric.selectItemFromDropdown(companiesLocators.btnPriority,commonLocators.listDropDown,"Medium");

					// await playwrightUtil.waitForSomeTime(10);

      
			})

			await test.step(`Create Company`, async () =>
			 {

				await companies.navigateToCompanies();

				// await applicationGeneric.selectEntity(configprop.NavCompanies);

				await applicationGeneric.createButton("Create new Company");

				const objCompanyData = await objReadData.readSingleRowtestdataFromExcel("CRM.xlsx","Companies","TC1");

				await companies.createCompany(objCompanyData);

				await companies.navigateToCompanies();

				await companies.verifyCreatedCompany(objCompanyData.Name);

				await companies.deleteAndPurge(objCompanyData.Name);


	         })

    });
});




// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });