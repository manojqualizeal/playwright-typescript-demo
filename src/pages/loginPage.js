import { expect } from "@playwright/test";
import * as locators from "../pagelocators/locators";
import playwrightUtil from "../utils/playwrightUtil";
import applicationGeneric from "../pages/applicationGeneric"
import * as configprop from "../utils/configProp";

class loginPage extends applicationGeneric {
    constructor(page) {
      super(page);
    }

async login()
{
    await this.open(configprop.URL);

    await this.waitForPageLoadDomcontentloaded();

    await this.fillInputBox(locators.loginusernameInput,configprop.UserName);

    await this.fillInputBox(locators.loginpasswordInput,configprop.PassWord);

    await this.clickOnElement(locators.loginButton);
          
    await this.waitForPageLoadDomcontentloaded();

   
}

async verifyLoginIsSuccessful()
{
    await this.verifyElementAttached(locators.txtDashBoard);
}

   
} 
export default loginPage;