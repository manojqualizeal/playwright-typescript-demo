import { expect } from "@playwright/test";
import * as locators from "../pagelocators/locators";
import basePage from "./basePage";
import * as configprop from "../utils/configProp";

class loginPage extends basePage {
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