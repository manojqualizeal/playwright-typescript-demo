import { expect } from "@playwright/test";
import * as locators from "../pageobjects/locators";
import * as commonLocators from "../pageobjects/commonLocators";
import * as login from "../pageobjects/login";
import playwrightUtil from "../utils/playwrightUtil";
import applicationGeneric from "../pages/applicationGeneric"
import * as configprop from "../utils/configProp";

class loginPage extends applicationGeneric {
    constructor(page) {
      super(page);
    }

async login(strUserName,strPassword)
{
    await this.open(configprop.URL);

    await this.waitForPageLoadDomcontentloaded();

    await this.fillInputBox(login.txtEmail,strUserName);

    await this.fillInputBox(login.txtPassword,strPassword);

    await this.clickOnElement(login.btnLogin);
          
    await this.waitForLoadState(configprop.waitStatenetworkidle);

    await this.waitForLoadState(configprop.waitStatedomcontentloaded);

}

async verifyLoginIsSuccessful()
{
    await this.verifyElementAttached(commonLocators.lnkHome);
}

async logout()
{
    await this.clickOnElement(commonLocators.btnTopHeaderMenuSettings);

    await this.clickOnElement(login.btnLogout)
}

   
} 
export default loginPage;