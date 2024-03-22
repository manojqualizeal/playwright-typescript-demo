import { expect } from "@playwright/test";
import * as locators from "../pageobjects/locators";
import * as commonLocators from "../pageobjects/commonLocators";
import * as login from "../pageobjects/login";
import playwrightUtil from "../utils/playwrightUtil";
import applicationGeneric from "./applicationGeneric"
import * as configprop from "../utils/configProp";
import * as contactsLocators from "../pageobjects/contactsLocators";
import * as applicationconstants from "../utils/applicationconstants";

class contacts extends applicationGeneric {
     constructor(page) {
        super(page);
    }

    async navigateToContacts(){
        this.selectEntity(configprop.NavContacts);
    }

    async verifyCreatedContact(contactName){
        this.checkRecordDisplayed(contactName);
    }

    async enterFirstName(firstName){
        await this.fillInputBox(contactsLocators.txtFirstName, firstName);
    }

    async enterLastName(lastName){
        await this.fillInputBox(contactsLocators.txtLastName, lastName);
    }

    async enterMiddleName(middleName){
        await this.fillInputBox(contactsLocators.txtMiddleName, middleName);
    }

    async enterEmail(email){
        await this.fillInputBox(contactsLocators.txtEmail, email);
    }
    
    async enterAddress(address){
        await this.fillInputBox(contactsLocators.address, address);
    }

    async enterCity(city){
        await this.fillInputBox(contactsLocators.city, city);
    }

    async enterState(state){
        await this.fillInputBox(contactsLocators.state, state);
    }

    async enterZip(zip){
        await this.fillInputBox(contactsLocators.zip, zip);
    }

    // async enterAddressCountry(addressCountry){
    //     await this.selectItemFromDropdown(,commonLocators.listDropDown, addressCountry);
    // }

    async enterDetails(objCompanyData){
            //strCompanyName = Math.floor(Math.random() * (100000 - 10000) ) + 10000;

        //strCompanyName = strCompanyName.toString();

        // strCompanyName = this.getRndInteger(10000,100000);
        // await this.fillInputBox(companiesLocators.txtName,objCompanyData.Name);
        
        if(objCompanyData.First_name){
            await this.enterFirstName(objCompanyData.First_name);
        }

        if(objCompanyData.Last_name){
            await this.enterLastName(objCompanyData.Last_name);
        }

        if(objCompanyData.Middle_name){
            await this.enterMiddleName(objCompanyData.Middle_name);
        }

        if(objCompanyData.Address_street){
            await this.enterAddress(objCompanyData.Address_street);
        }

        if(objCompanyData.Address_city){
            await this.enterCity(objCompanyData.Address_city);
        }

        if(objCompanyData.Address_state){
            await this.enterState(objCompanyData.Address_state);
        }

        if(objCompanyData.Zip){
            await this.enterZip(objCompanyData.Zip);
        }

        if(objCompanyData.Phone_Number)
        {
            // await this.selectItemFromDropdown(contactsLocators.btnPhoneCountry,commonLocators.listDropDown,objCompanyData.Phone);

            if(objCompanyData.Phone_Number_Type)
            {
                await this.fillInputBox(contactsLocators.phoneNumber, objCompanyData.Phone_Number);

                await this.fillInputBox(contactsLocators.phoneNumberType, objCompanyData.Phone_Number_Type);

                await this.clickOnElement(contactsLocators.btnPhoneAdd);

            }
        } 

        if(objCompanyData.Email)
        {
            await this.fillInputBox(contactsLocators.txtEmail, objCompanyData.Email);

            await this.fillInputBox(contactsLocators.txtEmailType, objCompanyData.EmailType);

            await this.clickOnElement(contactsLocators.btnEmailAdd);

        }

        // if(objCompanyData.Tags)
        // {
        //     await this.selectValueFromAutoCompleteSearch(contactsLocators.txtTags, objCompanyData.Tags, 10);
        // }

        if(objCompanyData.Status)
        {
            await this.selectItemFromDropdown(contactsLocators.btnStatus, commonLocators.listDropDown, objCompanyData.Status);
        }

        if(objCompanyData.Source)
        {
            await this.selectItemFromDropdown(contactsLocators.btnSource, commonLocators.listDropDown, objCompanyData.Source);
        }

        if(objCompanyData.Category)
        {
            await this.selectItemFromDropdown(contactsLocators.btnCategory, commonLocators.listDropDown, objCompanyData.Category);
        }

        if(objCompanyData.Identifier)
        {
            await this.fillInputBox(contactsLocators.txtIdentifier,objCompanyData.Identifier);
        }
    }

    async save(){
        await this.clickOnElement(commonLocators.btnSave);
    }

    async createContact(objCompanyData)
    {
        await this.enterDetails(objCompanyData);

        //after filling data

        await this.save();

        await this.waitForLoadState(configprop.waitStatedomcontentloaded);

        await this.waitForLoadState(configprop.waitStatenetworkidle);

        await this.waitForSomeTime(10);

        await this.checkPageHeader(objCompanyData.First_name + " " + objCompanyData.Last_name);

    }

    async deleteAndPurge(contactName){

        await this.deleteRecord(contactName);

        await this.waitForSomeTime(2);

        await this.checkRecordNotDisplayed(contactName);

        await this.rubbishBin("Contact", contactName, "Purge", "OK");

        await this.checkRecordNotDisplayed(contactName);

        await this.waitForSomeTime(2);
    }

    async verifyMandatoryField(text){
        await this.verifyToHaveText(contactsLocators.inLineErrMsg, text);
    }

    async verifyCompanyFieldLength(text){
        await this.verifyToHaveText(contactsLocators.lengthErrorMsg, text);
    }
   
} 
export default contacts;