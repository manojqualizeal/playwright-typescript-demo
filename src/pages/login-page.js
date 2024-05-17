import { expect } from "@playwright/test";
import * as locators from "../page-objects/locators";
import * as commonLocators from "../page-objects/common-locators";
import * as login from "../page-objects/login";
import playwrightUtil from "../utils/playwright-util";
import applicationGeneric from "./application-generic"
import * as configprop from "../utils/config-prop";

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