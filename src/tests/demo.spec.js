// @ts-check
import {expect} from "@playwright/test";
import test from '../fixtures/fixture'
import * as locators from "../pagelocators/locators";
import * as companiesLocators from "../pagelocators/companiesLocators";
import * as commonLocators from "../pagelocators/commonLocators";
import * as configprop from "../utils/configProp";
import dataHandling from "../utils/dataHandling";

let objReadData = new dataHandling();


test.describe('@smoke: Login as a user and Verify login is successful',
	() => {
		test('New Application', async ({
			playwrightUtil,
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