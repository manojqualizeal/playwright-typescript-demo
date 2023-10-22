import { expect } from "@playwright/test";
import * as locators from "../pagelocators/locators";
import * as commonLocators from "../pagelocators/commonLocators";
import playwrightUtil from "../utils/playwrightUtil";
import * as configprop from "../utils/configProp";

class applicationGeneric extends playwrightUtil {
    constructor(page) {
      super(page);
    }

    async checkRecordDisplayed(strValue)
    {
        const selector = commonLocators.recordName.replace('%s',strValue);
        await this.verifyElementAttached(selector);
    }

    async checkRecordNotDisplayed(strValue)
    {
        const selector = commonLocators.recordName.replace('%s',strValue);
        await this.verifyElementNotAttached(selector);
    }

    async performTableOperation(sSearchValue, operation) {
        let selector;
        const timeout = configprop.SHORT_TIMEOUT;
    
        switch (operation.toLowerCase()) {
            case "view":
                selector = commonLocators.tableviewIcon.replace('%s',sSearchValue);
                break;
            case "edit":
                selector = commonLocators.tableeditIcon.replace('%s',sSearchValue);
                break;
            case "delete":
                selector = commonLocators.tableDeleteIcon.replace('%s',sSearchValue);
                break;
            case "call":
                selector = commonLocators.tablecallIcon.replace('%s',sSearchValue);
                break;    
            case "check":
                selector = commonLocators.tablecheckbox.replace('%s',sSearchValue);
                break;        
            default:
                console.error("Invalid operation:", operation);
                return;
        }

         //Wait for the selector
         await this.waitForSelector1(selector,configprop.MEDIUM_TIMEOUT);
    
       if(operation.toLowerCase() === "check")
       {

        await this.checkElement(selector);

       }else{      

        await this.clickOnElement(selector);
       }

    }

    async performActionsOnPopUp(strOperationName)
    {
        const selector = commonLocators.popUpOperation.replace('%s',strValue);
        
        //Wait for the selector
        await this.waitForSelector1(selector,configprop.MEDIUM_TIMEOUT);

        await this.clickOnElement(selector);
    }

    async deleteRecord(sValue, popUpOperation)  
    {
        await this.performTableOperation(sValue, "delete");

        await this.performActionsOnPopUp(popUpOperation);
    }

        /*PopUp verification*/
    async checkPopupIsDisplayed(sHeaderName) 
    {
        const selector = commonLocators.popUpHeader.replace('%s',sHeaderName); 
        
        await this.verifyElementAttached(selector);
    }

    async selectEntity(sEntityName)
    {

        const selector = commonLocators.lnkLeftPaneEntityName.replace('%s',sEntityName); 

        await this.hover(commonLocators.lnkHome);

        await this.clickOnElement(selector);

        await this.checkPageHeader(sEntityName);
    }

    async checkPageHeader(sEntityName)
    {
        const selector = commonLocators.pageVerificationName.replace('%s',sEntityName);

        await this.waitForSelector(selector);
        
        await this.verifyElementAttached(selector);
    }

    async createButton(strHeaderName)
    {

        await this.clickOnElement(commonLocators.btnCreate);

        await this.checkPageHeader(strHeaderName);

    }

      async selectItemFromDropdown(StrbtnSelector,strListSelector,strDropDownvalue)
        {
            let bFlag = false;
            try
             {

                await this.clickOnElement(StrbtnSelector);

                await this.waitForSomeTime(1);

                await this.waitForSelector1(strListSelector,20);

                // locator for suggested values
                const options = this.page.locator(strListSelector);

                const optionsCount = await options.count();

                console.log(optionsCount);

                if (!options) {
                    //throw new Error(`Element with selector ${searchitemlist} not found.`);
                    expect(false,`Element with selector ${strListSelector} not found.`).toBeTruthy();
                }
                for(let i=0;i<optionsCount;i++)
                {
                    const strOptionValue = await options.nth(i).textContent();
                    console.log(strOptionValue);
                    if(strOptionValue.includes(strDropDownvalue))
                    {
                        // click and break lloop
                        await options.nth(i).click();
                        //await option.click();
                        bFlag = true;
                        break;
                    }
                }

            }catch(error)
            {
                console.log(`selectItemFromDropdown : ${error.message}`);
                throw new Error(`selectItemFromDropdown : ${error.message}`);
            }
            if(!bFlag)
                {
                    expect(false,`Value with : ${strDropDownvalue} not found.`).toBeTruthy(); 
                }
        }


async selectValueFromAutoCompleteSearch(strSearchBoxSelector,strvalue,timeInSeconds)
      {
          let bFlag = false;
          try
            {
              await this.fillInputBox(strSearchBoxSelector,strvalue);
    
              await this.waitForSelector1(commonLocators.listSearchCombox,timeInSeconds);
  
              // locator for suggested values
              const options = this.page.locator(commonLocators.listSearchCombox);
  
              const optionsCount = await options.count();
  
              console.log(optionsCount);
  
              if (!options) {
                  throw new Error(`Element with selector ${searchitemlist} not found.`);
              } 
          
              for(let i=0;i<optionsCount;i++)
              {
                  const strOptionValue = await options.nth(i).textContent();
                  console.log(strOptionValue);
                  if(strOptionValue.includes(strvalue))
                  {
                      // click and break lloop
                      await options.nth(i).click();
                      //await option.click();
                      bFlag = true;
                      break;
                  }
              }
              }catch(error){
                  console.log(error.message);
              }
              if(!bFlag)
              {
                  // await this.expect(() => {
                  //     throw new Error(`Value with : ${strOptionSelectValue} not found.`);
                  //   }).toThrow()
  
                  console.log("entered false")
  
                  expect(false,`Value with : ${strvalue} not found.`).toBeTruthy();
  
                  //   await expect(() => {
                  //     throw new Error(`Value with : ${strOptionSelectValue} not found.`);
                  //   }).toThrowError();  
              }
              
      }  

    
    async selectValueFromAutoCompleteUsingType(identifier, text){
        await this.page.locator(identifier).clear();
        await this.page.locator(identifier).type(text);
        await this.page.locator(identifier).focus();
        await this.waitForSomeTime(5);
        await this.page.locator(identifier).press('Tab');
      }

} 
export default applicationGeneric;