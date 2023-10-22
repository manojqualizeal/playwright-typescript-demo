import { expect } from "@playwright/test";
import * as locators from "../pagelocators/locators";
import * as commonLocators from "../pagelocators/commonLocators";
import * as login from "../pagelocators/login";
import playwrightUtil from "../utils/playwrightUtil";
import applicationGeneric from "./applicationGeneric"
import * as configprop from "../utils/configProp";

class companies extends applicationGeneric {
    constructor(page) {
      super(page);
    }

async createCompany(objCompanyData)
{
    
}
   
} 
export default companies;