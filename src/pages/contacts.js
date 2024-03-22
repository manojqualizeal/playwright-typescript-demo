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

    async enterDetails(objContactData){
            //strCompanyName = Math.floor(Math.random() * (100000 - 10000) ) + 10000;

        //strCompanyName = strCompanyName.toString();

        // strCompanyName = this.getRndInteger(10000,100000);
        // await this.fillInputBox(companiesLocators.txtName,objContactData.Name);
        
        if(objContactData.First_name){
            await this.enterFirstName(objContactData.First_name);
        }

        if(objContactData.Last_name){
            await this.enterLastName(objContactData.Last_name);
        }

        if(objContactData.Middle_name){
            await this.enterMiddleName(objContactData.Middle_name);
        }

        if(objContactData.Address_street){
            await this.enterAddress(objContactData.Address_street);
        }

        if(objContactData.Address_city){
            await this.enterCity(objContactData.Address_city);
        }

        if(objContactData.Address_state){
            await this.enterState(objContactData.Address_state);
        }

        if(objContactData.Zip){
            await this.enterZip(objContactData.Zip);
        }

        if(objContactData.Phone_Number)
        {
            // await this.selectItemFromDropdown(contactsLocators.btnPhoneCountry,commonLocators.listDropDown,objContactData.Phone);

            if(objContactData.Phone_Number_Type)
            {
                await this.fillInputBox(contactsLocators.phoneNumber, objContactData.Phone_Number);

                await this.fillInputBox(contactsLocators.phoneNumberType, objContactData.Phone_Number_Type);

                await this.clickOnElement(contactsLocators.btnPhoneAdd);

            }
        } 

        if(objContactData.Email)
        {
            await this.fillInputBox(contactsLocators.txtEmail, objContactData.Email);

            await this.fillInputBox(contactsLocators.txtEmailType, objContactData.EmailType);

            await this.clickOnElement(contactsLocators.btnEmailAdd);

        }

        // if(objContactData.Tags)
        // {
        //     await this.selectValueFromAutoCompleteSearch(contactsLocators.txtTags, objContactData.Tags, 10);
        // }

        if(objContactData.Status)
        {
            await this.selectItemFromDropdown(contactsLocators.btnStatus, commonLocators.listDropDown, objContactData.Status);
        }

        if(objContactData.Source)
        {
            await this.selectItemFromDropdown(contactsLocators.btnSource, commonLocators.listDropDown, objContactData.Source);
        }

        if(objContactData.Category)
        {
            await this.selectItemFromDropdown(contactsLocators.btnCategory, commonLocators.listDropDown, objContactData.Category);
        }

        if(objContactData.Identifier)
        {
            await this.fillInputBox(contactsLocators.txtIdentifier,objContactData.Identifier);
        }
    }

    async save(){
        await this.clickOnElement(commonLocators.btnSave);
    }

    async createContact(objContactData)
    {
        await this.enterDetails(objContactData);

        //after filling data

        await this.save();

        await this.waitForLoadState(configprop.waitStatedomcontentloaded);

        await this.waitForLoadState(configprop.waitStatenetworkidle);

        await this.waitForSomeTime(10);

        await this.checkPageHeader(objContactData.First_name + " " + objContactData.Last_name);

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