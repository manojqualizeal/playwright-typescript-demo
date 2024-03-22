import { expect } from "@playwright/test";
import * as locators from "../pageobjects/locators";
import * as commonLocators from "../pageobjects/commonLocators";
import * as login from "../pageobjects/login";
import playwrightUtil from "../utils/playwrightUtil";
import applicationGeneric from "./applicationGeneric"
import * as configprop from "../utils/configProp";
import * as companiesLocators from "../pageobjects/companiesLocators";
import * as applicationconstants from "../utils/applicationconstants";
import { text } from "stream/consumers";

class companies extends applicationGeneric {
    constructor(page) {
      super(page);
    }

    async navigateToCompanies(){
        this.selectEntity(configprop.NavCompanies);
    }

    async verifyCreatedCompany(companyName){
        this.checkRecordDisplayed(companyName);
    }

    async enterCompanyName(companyName){
        await this.fillInputBox(companiesLocators.txtName, companyName);
    }

    async enterCompanyStreetAddress(streetAddress){
        await this.fillInputBox(companiesLocators.txtStreetAddress, streetAddress);
    }

    async enterCompanyCity(city){
        await this.fillInputBox(companiesLocators.txtCity, city);
    }

    async enterCompanySateNCountry(sateNCountry){
        await this.fillInputBox(companiesLocators.txtStateNCountry, sateNCountry);
    }

    async enterCompanyPostCode(postCode){
        await this.fillInputBox(companiesLocators.txtPostCode, postCode);
    }

    async enterCompanyAddressCountry(addressCountry){
        await this.selectItemFromDropdown(companiesLocators.btnAddressCountry,commonLocators.listDropDown, addressCountry);
    }

    async enterDetails(objCompanyData){
            //strCompanyName = Math.floor(Math.random() * (100000 - 10000) ) + 10000;

        //strCompanyName = strCompanyName.toString();

        // strCompanyName = this.getRndInteger(10000,100000);
        // await this.fillInputBox(companiesLocators.txtName,objCompanyData.Name);
        
        if(objCompanyData.Name){
            await this.enterCompanyName(objCompanyData.Name);
        }
    //     if(objCompanyData.Access)
    //     {
    //         
    //         await this.clickOnElement(companiesLocators.btnAccess);

    //         await this.selectItemFromDropdown(companiesLocators.btnAllowUsers,commonLocators.listDropDown,objCompanyData.Access);

    //     }

        if(objCompanyData.StreetAddress){
            await this.enterCompanyStreetAddress(objCompanyData.StreetAddress);
        }

        if(objCompanyData.City){
            await this.enterCompanyCity(objCompanyData.City);
        }

        if(objCompanyData.SateNCountry){
            await this.enterCompanySateNCountry(objCompanyData.SateNCountry);
        }

        if(objCompanyData.PostCode){
            await this.enterCompanyPostCode(objCompanyData.PostCode);
        }

        if(objCompanyData.AddressCountry){
            await this.enterCompanyAddressCountry(objCompanyData.AddressCountry);
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
    }

    async save(){
        await this.clickOnElement(commonLocators.btnSave);
    }

    async createCompany(objCompanyData)
    {
        await this.enterDetails(objCompanyData);

        //after filling data

        await this.save();

        await this.waitForLoadState(configprop.waitStatedomcontentloaded);

        await this.waitForLoadState(configprop.waitStatenetworkidle);

        await this.waitForSomeTime(10);

        await this.checkPageHeader(objCompanyData.Name);

    }



    async editCompany(strCompany,objCompanyData)
    {
        await this.selectEntity(configprop.NavCompanies);

        await this.performTableOperation(strCompany,configprop.operationEditType);

        await this.waitForLoadState(configprop.waitStatedomcontentloaded);

        await this.waitForLoadState(configprop.waitStatenetworkidle);

        await this.createCompany(objCompanyData);
            
    }

    // async deleteCompany(cName)
    // {

    //     await this.deleteRecord(cName);

    //     // await this.waitForLoadState(configprop.waitStatedomcontentloaded);

    //     // await this.waitForLoadState(configprop.waitStatenetworkidle);

    //     await this.waitForSomeTime(2);

    //     await this.checkRecordNotDisplayed(cName);

    // }

    async deleteAndPurge(cName){

        await this.deleteRecord(cName);

        await this.waitForSomeTime(2);

        await this.checkRecordNotDisplayed(cName);

        await this.rubbishBin("Company", cName, "Purge", "OK");

        await this.checkRecordNotDisplayed(cName);

        await this.waitForSomeTime(2);
    }

    async verifyMandatoryField(text){
        await this.verifyToHaveText(commonLocators.inLineErrMsg, text);
    }

    async verifyCompanyFieldLength(text){
        await this.verifyToHaveText(commonLocators.lengthErrorMsg, text);
    }
   
} 
export default companies;