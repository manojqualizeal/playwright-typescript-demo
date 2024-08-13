// @ts-check
import test from '../../fixtures/fixture';
import * as locators from "../../page_objects/locators";
import * as companiesLocators from "../../page_objects/companies_locators";
import * as commonLocators from "../../page_objects/common_locators";
import * as configprop from "../../utils/config_prop";
import dataHandling from "../../utils/data_handling";
import * as applicationconstants from "../../utils/application_constants";
import { chromium } from '@playwright/test';


let objReadData = new dataHandling();

test.describe('Create Company without mandatory parameters',
	() => {
		test('Create Company without Mandatory Fields', async ({
			applicationGeneric,
			loginPage,
			companies
		}) => {
			const objCompanyData = await objReadData.readSingleRowtestdataFromExcel("CRM.xlsx", "Companies", "TC1");

			await test.step(`Open the URL and Enter Username and Password & Verify the user is logged in`, async () => {

				await loginPage.login(configprop.UserName, configprop.PassWord);

				await loginPage.verifyLoginIsSuccessful();

			})

			await test.step(`Create Company`, async () => {

				await companies.navigateToCompanies();

				await applicationGeneric.clickOnCreate();

				objCompanyData.Name = "";

				await companies.enterDetails(objCompanyData);

				await companies.save();

				await companies.verifyMandatoryField(applicationconstants.errorMessageForMandatoryFieldNameCompany);


			})

		});
	});