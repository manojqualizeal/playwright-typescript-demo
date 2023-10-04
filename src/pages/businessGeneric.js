import { expect } from "@playwright/test";
import * as locators from "../pagelocators/locators";
import basePage from "../pages/basePage";

class businessGeneric extends basePage {
    constructor(page) {
      super(page);
    }

    async selectValueFromAutoCompleteSearchInHomeScreen(strvalue,strOptionSelectValue)
    {
        let bFlag = false;
        try{
            await this.fillInputBox(locators.txthomeSearchClient,strvalue);

            const searchitemlist = locators.listSearchItems;

            await this.waitForSelector1(searchitemlist,80);

            // locator for suggested values
            const options = this.page.locator(searchitemlist);
            //const options = this.getElement(searchitemlist);

            //const options = this.getElements(searchitemlist);

            const optionsCount = await options.count();

            console.log(optionsCount);

            //const options = page.$$(searchitemlist);

            if (!options) {
                throw new Error(`Element with selector ${searchitemlist} not found.`);
            }
        
             //const options = this.getElement("//div/ul[@id='pr_id_1_list']/li");

        
            for(let i=0;i<optionsCount;i++)
            {
                const strOptionValue = await options.nth(i).textContent();
                console.log(strOptionValue);
                if(strOptionValue.includes(strOptionSelectValue))
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

                expect(false,`Value with : ${strOptionSelectValue} not found.`).toBeTruthy();

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


      async selectValueFromAutoCompleteSearch(strSearchBoxSelector,strListBoxSelector,strvalue,strOptionSelectValue,timeInSeconds)
      {
          let bFlag = false;
          try{
              await this.fillInputBox(strSearchBoxSelector,strvalue);
  
              const searchitemlist = strListBoxSelector;
  
              await this.waitForSelector1(searchitemlist,timeInSeconds);
  
              // locator for suggested values
              const options = this.page.locator(searchitemlist);
              //const options = this.getElement(searchitemlist);
  
              //const options = this.getElements(searchitemlist);
  
              const optionsCount = await options.count();
  
              console.log(optionsCount);
  
              //const options = page.$$(searchitemlist);
  
              if (!options) {
                  throw new Error(`Element with selector ${searchitemlist} not found.`);
              }
          
               //const options = this.getElement("//div/ul[@id='pr_id_1_list']/li");
  
          
              for(let i=0;i<optionsCount;i++)
              {
                  const strOptionValue = await options.nth(i).textContent();
                  console.log(strOptionValue);
                  if(strOptionValue.includes(strOptionSelectValue))
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
  
                  expect(false,`Value with : ${strOptionSelectValue} not found.`).toBeTruthy();
  
                  //   await expect(() => {
                  //     throw new Error(`Value with : ${strOptionSelectValue} not found.`);
                  //   }).toThrowError();  
              }
              
      }  

    async selectValuefromDropDownAppGeneric(StrbtnSelector,strListSelector,strDropDownvalue)
    {
        let bFlag = false;
        try{

            await this.clickOnElement(StrbtnSelector);

            await this.waitForSomeTime(3);

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
            console.log(`selectValuefromDropDownAppGeneric : ${error.message}`);
            throw new Error(`selectValuefromDropDownAppGeneric : ${error.message}`);
        }
        if(!bFlag)
            {
                expect(false,`Value with : ${strDropDownvalue} not found.`).toBeTruthy(); 
            }
    }

    async selectTab(strTabSelector,expectToBe)
    {
        try
        {
            let bFlag = await this.getElementAttributeValue(strTabSelector,"aria-expanded");

            //bFlag = Boolean(bFlag);
            if(expectToBe)
            {
                if(bFlag==="false")
                {
                    await this.clickOnElement(strTabSelector);
                }
            }
            else{
                if(bFlag==="true")
                {
                    await this.clickOnElement(strTabSelector);
                }
            }
        }catch(error)
        {
            console.log(error.message);
            throw new Error(error.message);
        }

        await this.waitForSomeTime(1);

    }

    async waitForSpinnerToGoOff(timeInSeconds)
    {
        await this.waitForSelectorState(locators.modalspinner,'detached',timeInSeconds);
    }

} 
export default businessGeneric;