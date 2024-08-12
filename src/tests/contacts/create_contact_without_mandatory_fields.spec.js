// @ts-check
import test from '../../fixtures/fixture';
import * as locators from "../../page_objects/locators";
import * as companiesLocators from "../../page_objects/companies_locators";
import * as commonLocators from "../../page_objects/common_locators";
import * as configprop from "../../utils/config_prop";
import dataHandling from "../../utils/data_handling";
import { chromium } from '@playwright/test';
import * as applicationconstants from "../../utils/application_constants";



let objReadData = new dataHandling();


test.describe('@contact Create Contact',
	() => {
		test('Create Contact with max length', async ({
			applicationGeneric,
			loginPage,
			contacts
		}) => {
			const objContactData = await objReadData.readSingleRowtestdataFromExcel("CRM.xlsx", "Contacts", "TC-01");

			await test.step(`Open the URL and Enter Username and Password & Verify the user is logged in`, async () => {

				await loginPage.login(configprop.UserName, configprop.PassWord);

				await loginPage.verifyLoginIsSuccessful();

				// await applicationGeneric.selectValueFromAutoCompleteSearch(companiesLocators.txtTags,"Demo deal",10);

				// await applicationGeneric.selectItemFromDropdown(companiesLocators.btnPriority,commonLocators.listDropDown,"Medium");

				// await playwrightUtil.waitForSomeTime(10);


			})

			await test.step(`Create Contact`, async () => {
				let firstName = objContactData.First_name;

				await contacts.navigateToContacts();

				// Step 1 : Try to Create Contact with No First Name

				await contacts.createButton("Create New Contact");

				objContactData.First_name = null;

				await contacts.enterDetails(objContactData);

				await contacts.save();

				await contacts.verifyMandatoryField(applicationconstants.errInlineMsgForContactFirstName);

				// Step 2 : Try to Create Contact with No Last Name

				await contacts.navigateToContacts();

				await contacts.createButton("Create New Contact");

				objContactData.First_name = firstName;

				objContactData.Last_name = null;

				await contacts.enterDetails(objContactData);

				await contacts.save();

				await contacts.verifyMandatoryField(applicationconstants.errInlineMsgForContactLastName);


			})

		});
	});