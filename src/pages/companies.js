import { expect } from "@playwright/test";
import * as locators from "../pagelocators/locators";
import * as commonLocators from "../pagelocators/commonLocators";
import * as login from "../pagelocators/login";
import playwrightUtil from "../utils/playwrightUtil";
import applicationGeneric from "./applicationGeneric"
import * as configprop from "../utils/configProp";
import * as companiesLocators from "../pagelocators/companiesLocators";


let strCompanyName = "" ;

class companies extends applicationGeneric {
    constructor(page) {
      super(page);
    }



async createCompany(objCompanyData)
{
    //strCompanyName = Math.floor(Math.random() * (100000 - 10000) ) + 10000;

    //strCompanyName = strCompanyName.toString();

    strCompanyName = this.getRndInteger(10000,100000);

    await this.fillInputBox(companiesLocators.txtName,strCompanyName);

    if(objCompanyData.Access)
    {
        
        await this.clickOnElement(companiesLocators.btnAccess);

        await this.selectItemFromDropdown(companiesLocators.btnAllowUsers,commonLocators.listDropDown,objCompanyData.Access);

    }

    if(objCompanyData.StreetAddress)
    {
        await this.fillInputBox(companiesLocators.txtStreetAddress,objCompanyData.StreetAddress);

        await this.fillInputBox(companiesLocators.txtCity,objCompanyData.City);

        await this.fillInputBox(companiesLocators.txtStateNCountry,objCompanyData.SateNCountry);

        await this.fillInputBox(companiesLocators.txtPostCode,objCompanyData.PostCode);

        await this.selectItemFromDropdown(companiesLocators.btnAddressCountry,commonLocators.listDropDown,objCompanyData.AddressCountry);

        await this.clickOnElement(companiesLocators.btnAddressAdd);

    }

    if(objCompanyData.Phone)
    {
        await this.selectItemFromDropdown(companiesLocators.btnPhoneCountry,commonLocators.listDropDown,objCompanyData.Phone);

        if(objCompanyData.Number)
        {
            await this.fillInputBox(companiesLocators.txtPhoneNumber,objCompanyData.Number);

            await this.fillInputBox(companiesLocators.txtHomeNWorkNmobile,objCompanyData.PhoneType);

            await this.clickOnElement(companiesLocators.btnPhoneAdd);

        }
    } 

    if(objCompanyData.Email)
    {
        await this.fillInputBox(companiesLocators.txtEmail,objCompanyData.Email);

        await this.fillInputBox(companiesLocators.txtEmailType,objCompanyData.EmailType);

        await this.clickOnElement(companiesLocators.btnEmailAdd);

    }

    if(objCompanyData.Tags)
    {
        await this.selectValueFromAutoCompleteSearch(companiesLocators.txtTags,objCompanyData.Tags,10);
    }

    if(objCompanyData.Description)
    {
        await this.fillInputBox(companiesLocators.txtDescription,objCompanyData.Description);
    }

    if(objCompanyData.Industry)
    {
        await this.fillInputBox(companiesLocators.txtIndustry,objCompanyData.Industry);
    }

    if(objCompanyData.NoOfEmp)
    {
        await this.fillInputBox(companiesLocators.txtNoOfEmployees,objCompanyData.NoOfEmp);
    }

    if(objCompanyData.StockSymbol)
    {
        await this.fillInputBox(companiesLocators.txtStockSymbol,objCompanyData.StockSymbol);
    }

    if(objCompanyData.AnnualRevenue)
    {
        await this.fillInputBox(companiesLocators.txtAnnualRevenue,objCompanyData.AnnualRevenue);
    }

    if(objCompanyData.Priority)
    {
        await this.selectItemFromDropdown(companiesLocators.btnPriority,commonLocators.listDropDown,objCompanyData.Priority);
    }

    if(objCompanyData.Status)
    {
        await this.selectItemFromDropdown(companiesLocators.btnStatus,commonLocators.listDropDown,objCompanyData.Status);
    }

    if(objCompanyData.Source)
    {
        await this.selectItemFromDropdown(companiesLocators.btnSource,commonLocators.listDropDown,objCompanyData.Source);
    }

    if(objCompanyData.Category)
    {
        await this.selectItemFromDropdown(companiesLocators.btnCategory,commonLocators.listDropDown,objCompanyData.Category);
    }

    if(objCompanyData.VATNumber)
    {
        await this.fillInputBox(companiesLocators.txtVatNumber,objCompanyData.VATNumber);
    }

    if(objCompanyData.Identifier)
    {
        await this.fillInputBox(companiesLocators.txtIdentifier,objCompanyData.Identifier);
    }

        await this.clickOnElement(commonLocators.btnSave);

        await this.waitForLoadState(configprop.waitStatedomcontentloaded);

        await this.waitForLoadState(configprop.waitStatenetworkidle);

        await this.waitForSomeTime(10);

    }



    async editCompany(strCompany,objCompanyData)
    {
        await this.selectEntity(configprop.NavCompanies);

        await this.performTableOperation(strCompany,configprop.operationEditType);

        await this.waitForLoadState(configprop.waitStatedomcontentloaded);

        await this.waitForLoadState(configprop.waitStatenetworkidle);

        await this.createCompany(objCompanyData);
            
    }

    async deleteCompany()
    {
        await this.selectEntity(configprop.NavCompanies);

        await this.deleteRecord(strCompanyName);

        await this.waitForLoadState(configprop.waitStatedomcontentloaded);

        await this.waitForLoadState(configprop.waitStatenetworkidle);

        await this.checkRecordNotDisplayed(strCompanyName);

    }
   
} 
export default companies;