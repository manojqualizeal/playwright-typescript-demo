// @ts-check
import test from '../../fixtures/fixture';
import * as locators from "../../pageobjects/locators";
import * as companiesLocators from "../../pageobjects/companiesLocators";
import * as commonLocators from "../../pageobjects/commonLocators";
import * as configprop from "../../utils/configProp";
import * as applicationconstants from "../../utils/applicationconstants";

import dataHandling from "../../utils/dataHandling";
import { chromium } from '@playwright/test';


let objReadData = new dataHandling();

test.describe('create company with max length',
	() => {
		test('New Application', async ({
			applicationGeneric,
            loginPage,
			companies
		}) => {

			const objCompanyData = await objReadData.readSingleRowtestdataFromExcel("CRM.xlsx","Companies","TC1");

                await test.step(`Open the URL and Enter Username and Password & Verify the user is logged in`, async () => 
				{

					await loginPage.login(configprop.UserName,configprop.PassWord);

					await loginPage.verifyLoginIsSuccessful();

					// await applicationGeneric.selectValueFromAutoCompleteSearch(companiesLocators.txtTags,"Demo deal",10);

					// await applicationGeneric.selectItemFromDropdown(companiesLocators.btnPriority,commonLocators.listDropDown,"Medium");

					// await playwrightUtil.waitForSomeTime(10);

      
				});

				await test.step(`Create Company`, async () =>
				{

					await companies.navigateToCompanies();

					// await applicationGeneric.selectEntity(configprop.NavCompanies);

					await applicationGeneric.createButton("Create new Company");

					const objCompanyData = await objReadData.readSingleRowtestdataFromExcel("CRM.xlsx","Companies","TC1");

					objCompanyData.Name = companies.generateString(applicationconstants.companyMaxLength);

					await companies.createCompany(objCompanyData);

					await companies.navigateToCompanies();

					await companies.verifyCreatedCompany(objCompanyData.Name);


		         });

				await test.step(`delete and purge`, async()=>{

					await companies.deleteAndPurge(objCompanyData.Name);
					
				})

			
    });
});