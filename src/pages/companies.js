import { expect } from "@playwright/test";
import * as locators from "../page_objects/locators";
import * as commonLocators from "../page_objects/common_locators";
import * as login from "../page_objects/login";
import ApplicationGeneric from "./application_generic"
import * as configprop from "../utils/config_prop";
import * as companiesLocators from "../page_objects/companies_locators";
import * as applicationconstants from "../utils/application_constants";
import { text } from "stream/consumers";

class Companies extends ApplicationGeneric {
    constructor(page) {
        super(page);
    }

    async navigateToCompanies() {
        this.selectEntity(configprop.NavCompanies);
    }

    async verifyCreatedCompany(companyName) {
        this.checkRecordDisplayed(companyName);
    }

    async enterCompanyName(companyName) {
        if (companyName != undefined)
            await this.fillInputBox(companiesLocators.txtName, companyName);
    }

    async enterCompanyStreetAddress(streetAddress) {
        if (streetAddress != undefined)
            await this.fillInputBox(companiesLocators.txtStreetAddress, streetAddress);
    }


    async enterCompanyCity(city) {
        if (city != undefined)
            await this.fillInputBox(companiesLocators.txtCity, city);
    }

    async enterCompanySateNCountry(stateNCountry) {
        if (stateNCountry != undefined)
            await this.fillInputBox(companiesLocators.txtStateNCountry, stateNCountry);
    }

    async enterCompanyPostCode(postCode) {
        if (postCode != undefined)
            await this.fillInputBox(companiesLocators.txtPostCode, postCode);
    }

    async enterCompanyAddressCountry(addressCountry) {
        if (addressCountry != undefined)
            await this.selectItemFromDropdown(companiesLocators.btnAddressCountry, commonLocators.listDropDown, addressCountry);
    }
    async enterEmail(objCompanyData) {
        if (objCompanyData.Email != undefined) {
            await this.fillInputBox(companiesLocators.txtEmail, objCompanyData.Email);
            await this.fillInputBox(companiesLocators.txtEmailType, objCompanyData.EmailType);
            await this.clickOnElement(companiesLocators.btnEmailAdd);
        }
    }
    async enterPhone(objCompanyData) {
        if (objCompanyData.Phone != undefined) {
            await this.fillInputBox(companiesLocators.txtPhoneNumber, objCompanyData.Number);
            await this.fillInputBox(companiesLocators.txtHomeNWorkNmobile, objCompanyData.PhoneType);
            await this.clickOnElement(companiesLocators.btnPhoneAdd);
        }
    }
    async enterTags(tags) {
        if (tags != undefined) {
            await this.selectValueFromAutoCompleteSearch(companiesLocators.txtTags, tags, 10);
        }
    }
    async enterDescription(description) {
        if (description != undefined) {
            await this.fillInputBox(companiesLocators.txtDescription, description);
        }
    }
    async enterIndustry(Industry) {
        if (Industry != undefined) {
            await this.fillInputBox(companiesLocators.txtIndustry, Industry);
        }
    }

    async enterNoOfEmp(NoOfEmp) {
        if (NoOfEmp != undefined) {
            await this.fillInputBox(companiesLocators.txtNoOfEmployees, NoOfEmp);
        }
    }

    async enterStockSymbol(StockSymbol) {
        if (StockSymbol != undefined) {
            await this.fillInputBox(companiesLocators.txtStockSymbol, StockSymbol);
        }
    }

    async enterAnnualRevenue(AnnualRevenue) {
        if (AnnualRevenue != undefined) {
            await this.fillInputBox(companiesLocators.txtAnnualRevenue, AnnualRevenue);
        }
    }

    async setPriority(Priority) {
        if (Priority != undefined) {
            await this.selectItemFromDropdown(companiesLocators.btnPriority, commonLocators.listDropDown, Priority);
        }
    }

    async setStatus(Status) {
        if (Status != undefined) {
            await this.selectItemFromDropdown(companiesLocators.btnStatus, commonLocators.listDropDown, Status);
        }
    }

    async setSource(Source) {
        if (Source != undefined) {
            await this.selectItemFromDropdown(companiesLocators.btnSource, commonLocators.listDropDown, Source);
        }
    }

    async setCategory(Category) {
        if (Category != undefined) {
            await this.selectItemFromDropdown(companiesLocators.btnCategory, commonLocators.listDropDown, Category);
        }
    }

    async enterVATNumber(VATNumber) {
        if (VATNumber != undefined) {
            await this.fillInputBox(companiesLocators.txtVatNumber, VATNumber);
        }
    }

    async enterIdentifier(Identifier) {
        if (Identifier != undefined) {
            await this.fillInputBox(companiesLocators.txtIdentifier, Identifier);
        }
    }


    async enterDetails(objCompanyData) {

        await this.enterCompanyName(objCompanyData.Name);
        await this.enterCompanyStreetAddress(objCompanyData.StreetAddress);
        await this.enterCompanyCity(objCompanyData.City);
        await this.enterCompanySateNCountry(objCompanyData.SateNCountry);
        await this.enterCompanyPostCode(objCompanyData.PostCode);
        await this.enterEmail(objCompanyData);
        await this.enterPhone(objCompanyData);
        await this.enterTags(objCompanyData.Tags);
        await this.enterDescription(objCompanyData.Description);
        await this.enterIndustry(objCompanyData.Industry);
        await this.enterNoOfEmp(objCompanyData.NoOfEmp);
        await this.enterStockSymbol(objCompanyData.StockSymbol);
        await this.enterAnnualRevenue(objCompanyData.AnnualRevenue);
        await this.setPriority(objCompanyData.Priority);
        await this.setStatus(objCompanyData.Status);
        await this.setSource(objCompanyData.Source);
        await this.setCategory(objCompanyData.Category);
        await this.enterVATNumber(objCompanyData.VATNumber);
        await this.enterIdentifier(objCompanyData.Identifier);

    }

    async save() {
        await this.clickOnElement(commonLocators.btnSave);
        await this.wait();
    }

    async createCompany(objCompanyData) {
        await this.clickOnCreate();

        await this.enterDetails(objCompanyData);

        //after filling data

        await this.save();
        await this.waitForSomeTime(2);

    }



    async editCompany(strCompany, objCompanyData) {
        await this.selectEntity(configprop.NavCompanies);

        await this.performTableOperation(strCompany, configprop.operationEditType);

        await this.waitForLoadState(configprop.waitStatedomcontentloaded);

        await this.waitForLoadState(configprop.waitStatenetworkidle);

        await this.createCompany(objCompanyData);

    }

    async deleteAndPurge(cName) {

        await this.deleteRecord(cName);

        await this.waitForSomeTime(2);

        await this.checkRecordNotDisplayed(cName);

        await this.rubbishBin("Company", cName, "Purge", "OK");

        await this.checkRecordNotDisplayed(cName);

        await this.waitForSomeTime(2);
    }

    async verifyMandatoryField(text) {
        await this.verifyToHaveText(commonLocators.inLineErrMsg, text);
    }

    async verifyCompanyFieldLength(text) {
        await this.verifyToHaveText(commonLocators.lengthErrorMsg, text);
    }

}
export default Companies;