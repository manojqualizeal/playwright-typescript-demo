// @ts-check
import test from '../../fixtures/fixture';
import * as locators from "../../page_objects/locators";
import * as companiesLocators from "../../page_objects/companies_locators";
import * as commonLocators from "../../page_objects/common_locators";
import * as configprop from "../../utils/config_prop";
import dataHandling from "../../utils/data_handling";
import { chromium } from '@playwright/test';


let objReadData = new dataHandling();


test.describe('@company Create Company',
	() => {
		test('Create Company', async ({
			loginPage,
			companies
		}) => {
			const objCompanyData = await objReadData.readSingleRowtestdataFromExcel("CRM.xlsx","Companies","TC1");
			//const objCompanyData = objReadData.getData("Company");
			await test.step(`Open the URL and Enter Username and Password & Verify the user is logged in`, async () => {

				await loginPage.login(configprop.UserName, configprop.PassWord);

				await loginPage.verifyLoginIsSuccessful();

				// await applicationGeneric.selectValueFromAutoCompleteSearch(companiesLocators.txtTags,"Demo deal",10);

				// await applicationGeneric.selectItemFromDropdown(companiesLocators.btnPriority,commonLocators.listDropDown,"Medium");

				// await playwrightUtil.waitForSomeTime(10);


			})

			await test.step(`Create Company`, async () => {

				await companies.navigateToCompanies();

				// await applicationGeneric.selectEntity(configprop.NavCompanies);

				await companies.createButton("Create new Company");

				await companies.createCompany(objCompanyData);

				await companies.navigateToCompanies();

				await companies.verifyCreatedCompany(objCompanyData.Name);


			})
			await test.step(`delete and purge`, async () => {
				await companies.deleteAndPurge(objCompanyData.Name);
			})

		});
	});
