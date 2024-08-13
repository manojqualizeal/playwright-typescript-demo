import { expect } from "@playwright/test";
import * as locators from "../page_objects/locators";
import * as commonLocators from "../page_objects/common_locators";
import * as login from "../page_objects/login";
import playwrightUtil from "../utils/playwright_util";
import ApplicationGeneric from "./application_generic"
import * as configprop from "../utils/config_prop";
import * as contactsLocators from "../page_objects/contacts_locators";
import * as applicationconstants from "../utils/application_constants";

class Contacts extends ApplicationGeneric {
    constructor(page) {
        super(page);
    }

    async navigateToContacts() {
        this.selectEntity(configprop.NavContacts);
    }

    async verifyCreatedContact(contactName) {
        this.checkRecordDisplayed(contactName);
    }

    async  enterFirstName(firstName) {
        if (firstName != undefined) {
            await this.enterFirstName(firstName);
        }
    }
    
    async  enterLastName(lastName) {
        if (lastName != undefined) {
            await this.enterLastName(lastName);
        }
    }
    
    async  enterMiddleName(middleName) {
        if (middleName != undefined) {
            await this.enterMiddleName(middleName);
        }
    }
    
    async  enterAddress(addressStreet) {
        if (addressStreet != undefined) {
            await this.enterAddress(addressStreet);
        }
    }
    
    async  enterCity(addressCity) {
        if (addressCity != undefined) {
            await this.enterCity(addressCity);
        }
    }
    
    async  enterState(addressState) {
        if (addressState != undefined) {
            await this.enterState(addressState);
        }
    }
    
    async  enterZip(zip) {
        if (zip != undefined) {
            await this.enterZip(zip);
        }
    }
    
    async  enterPhoneNumber(phoneNumber, phoneNumberType) {
        if (phoneNumber != undefined && phoneNumberType != undefined) {
            await this.fillInputBox(contactsLocators.phoneNumber, phoneNumber);
            await this.fillInputBox(contactsLocators.phoneNumberType, phoneNumberType);
            await this.clickOnElement(contactsLocators.btnPhoneAdd);
        }
    }
    
    async  enterEmail(email, emailType) {
        if (email != undefined && emailType != undefined) {
            await this.fillInputBox(contactsLocators.txtEmail, email);
            await this.fillInputBox(contactsLocators.txtEmailType, emailType);
            await this.clickOnElement(contactsLocators.btnEmailAdd);
        }
    }
    
    async  setStatus(status) {
        if (status != undefined) {
            await this.selectItemFromDropdown(contactsLocators.btnStatus, commonLocators.listDropDown, status);
        }
    }
    
    async  setSource(source) {
        if (source != undefined) {
            await this.selectItemFromDropdown(contactsLocators.btnSource, commonLocators.listDropDown, source);
        }
    }
    
    async  setCategory(category) {
        if (category != undefined) {
            await this.selectItemFromDropdown(contactsLocators.btnCategory, commonLocators.listDropDown, category);
        }
    }
    
    async  enterIdentifier(identifier) {
        if (identifier != undefined) {
            await this.fillInputBox(contactsLocators.txtIdentifier, identifier);
        }
    }
    

    async enterDetails(objContactData) {
            await this.enterFirstName(objContactData.First_name);

            await this.enterLastName(objContactData.Last_name);
      
            await this.enterMiddleName(objContactData.Middle_name);
      
            await this.enterAddress(objContactData.Address_street);
        
            await this.enterCity(objContactData.Address_city);
   
            await this.enterState(objContactData.Address_state);
   
            await this.enterZip(objContactData.Zip);

            await this.enterPhoneNumber(objContactData.Phone_Number, objContactData.Phone_Number_Type);
        
            await this.enterEmail(objContactData.Email, objContactData.EmailType);
            
            await this.setStatus(objContactData.Status);
            
            await this.setSource(objContactData.Source);
            
            await this.setCategory(objContactData.Category);
            
            await this.enterIdentifier(objContactData.Identifier);
            
    }

    async save() {
        await this.clickOnElement(commonLocators.btnSave);
    }

    async createContact(objContactData) {

        await this.clickOnCreate();
        
        await this.enterDetails(objContactData);

        //after filling data

        await this.save();

        await this.waitForLoadState(configprop.waitStatedomcontentloaded);

        await this.waitForLoadState(configprop.waitStatenetworkidle);

        await this.waitForSomeTime(10);

        await this.checkPageHeader(objContactData.First_name + " " + objContactData.Last_name);

    }

    async deleteAndPurge(contactName) {

        await this.deleteRecord(contactName);

        await this.waitForSomeTime(2);

        await this.checkRecordNotDisplayed(contactName);

        await this.rubbishBin("Contact", contactName, "Purge", "OK");

        await this.checkRecordNotDisplayed(contactName);

        await this.waitForSomeTime(2);
    }

    async verifyMandatoryField(text) {
        await this.verifyToHaveText(contactsLocators.inLineErrMsg, text);
    }

    async verifyCompanyFieldLength(text) {
        await this.verifyToHaveText(contactsLocators.lengthErrorMsg, text);
    }

}
export default Contacts;