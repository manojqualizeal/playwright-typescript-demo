import { expect } from "@playwright/test";
const path = require('path');

class playwrightUtil {
  constructor(page) {
    this.page = page;
  }

  async open(url) {
    await this.page.goto(url);
  }

  async openWithWait(url,timeInSeconds) {
    await this.page.goto(url,{ timeout: timeInSeconds});
  }

  async pause(){
    await this.page.pause();
  }


  // async isElementDisplayed(selector) {
  //   const element = await this.page.$(selector);
  //   return !!element;
  // }


  
  async getPageTitle() {
    return await this.page.title();
  }

  async getUrl() {
    return this.page.url();
  }

  async waitForLoadState(strState) {
    return this.page.waitForLoadState(strState);
  }

  async waitForPageLoad() {
    return this.page.waitForLoadState("networkidle");
  }

  async waitForPageLoadDomcontentloaded() {
    return this.page.waitForLoadState("domcontentloaded");
  }

  async wait() {
    return this.page.waitForTimeout(10000);
  }

  async wait(timeInSeconds) {
    return this.page.waitForTimeout(timeInSeconds * 1000);
  }

  async waitForSomeTime(timeInSeconds) {
    console.log('Additional Wait for '+timeInSeconds+' seconds.');
    await new Promise(resolve => setTimeout(resolve, (timeInSeconds*1000)));
  }

  async waitForNavigation(timeInSeconds) {
    await this.page.waitForNavigation({ timeout: timeInSeconds * 1000});
  }

  async waitForSelector(selector)
  {
    await this.page.waitForSelector(selector);
  }

  async waitForSelector1(selector,timeInSeconds)
  {
    await this.page.waitForSelector(selector,{ timeout: timeInSeconds * 1000,});
  }

  async waitForSelectorState(selector,strState,timeInSeconds)
  {
    await this.page.waitForSelector(selector,{ state:strState,timeout: timeInSeconds * 1000});
  }

  // async getElement(selector) {
  //   return await this.page.$(selector);
  // }

  async getElement(selector) {
    return await this.page.locator(selector);
  }
  
  async isElementDisplayed(selector) {
    const element = await this.page.locator(selector);
    return !!element;
  }

  async verifyElementPresent(selector) {
    const element = await this.page.locator(selector);
    expect.soft((!!element)).toBeTruthy();
  }

  async verifyElementAttached(identifier)
  {
    await expect(this.page.locator(identifier)).toBeAttached();
  }

  async verifyElementAttachedSoft(identifier)
  {
    await expect.soft(this.page.locator(identifier)).toBeAttached();
  }


  async verifyElementNotAttachedSoft(identifier)
  {
    await expect.soft(this.page.locator(identifier)).toBeAttached({attached:false});
  }

  async isElementVisible(selector, errorMessage) {
    await this.page.waitForSelector(selector);
    const element = this.page.locator(selector);
    try {
      const isVisible = await element.isVisible();
      expect(isVisible).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async isElementNotVisible(selector) {
    const element = this.page.locator(selector);
    return expect(element).toBeHidden;
  }

  async isElementEnabled(selector, errorMessage) {
    await this.page.waitForSelector(selector);
    const element = this.page.locator(selector);
    try {
      const isEnabled = await element.isEnabled();
      expect(isEnabled).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async isElementChecked(selector, errorMessage) {
    await this.page.waitForSelector(selector);
    const element = this.page.locator(selector);
    try {
      const isChecked = await element.isChecked();
      expect(isChecked).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async getElements(selector) {
    this.waitForSomeTime(30);
    return await this.page.$$(selector);
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async waitAndClick(selector) {
    await this.page.waitForSelector(selector);
    return this.page.click(selector);
  }

  async clickFirstEle(selector){
    const ele =  await this.page.waitForSelector(selector.first());
    return this.page.click(ele);
  }

  

  async waitAndHardClick(selector) {
    await this.page.waitForSelector(selector);
    return await this.page.$eval(selector, (element) => element.click());
  }

  async waitAndFill(selector, text) {
    await this.page.waitForSelector(selector);
    await this.page.fill(selector, text);
  }

  async waitAndType(Selector, text) {
    await this.page.waitForSelector(Selector);
    await this.page.click(Selector, { clickCount: 3 });
    await this.page.keyboard.press("Backspace");
    await this.page.type(Selector, text);
  }

  async keyPress(selector, key) {
    this.page.press(selector, key);
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }

  async getInnerText(selector) {
    const element = await this.page.$(selector);
    return await element.innerText();
  }

  async getTextContent(selector) {
    const element = await this.page.locator(selector);

    if (!element) {
      throw new Error(`Element with selector ${selector} not found.`);
    }
    try {
      return await element.textContent();
    } catch (error) {
      throw new Error(
        `Error retrieving text content for element with selector ${selector}: ${error.message}`
      );
    }
  }

    async clickOnElement(identifier){
      await this.page.locator(identifier).click();
  }

  async mouseHover(identifier){
      await this.page.locator(identifier).hover();
  }

  async fillInputBox(identifier, text){
      await this.page.locator(identifier).fill(text);
  }

  async fillInputBoxWithClear(identifier, text){
    await this.page.locator(identifier).clear();
    await this.page.locator(identifier).fill(text);
}

  async dblClickOnElement(identifier){
      await this.page.locator(identifier).dblclick();
  }

  async focusOnElement(identifier){
      await this.page.locator(identifier).focus();
  }


  async compareTextContent(selector, expectedTextContent) {
    expect.soft((await this.getTextContent(selector)) === expectedTextContent ).toBeTruthy();
  }

  async verifyTextPresent(text) {
    
    let selector = "//*[contains(text(),'" + text + "')]";

    //let selector = "//*[contains(text(),'safafa')]";

    let bFlag;

    try{
      //const element = await this.page.waitForSelector(selector);

      const element = await this.page.waitForSelector(selector,{ state:'attached',timeout: 10 * 1000});

      //await this.waitForSomeTime(10);

      //const element = await this.page.locator(selector).waitFor({ state:'attached',timeout: 10 * 1000});

      //element.waitFor({ state:strState,timeout: timeInSeconds * 1000})

      bFlag = !!element;

    }catch(error)
    {
      console.log("verifyTextPresentSoft error:" + error.message);
      bFlag = false;
    }

    return bFlag;
  }


  async verifyElementText(selector, text) {
    await this.page.waitForSelector(selector);
    const textValue = await this.page.textContent(selector);
    return expect.soft(textValue.trim()).toBe(text);
  }

  async verifyElementContainsText(selector, text) {
    await this.page.waitForSelector(selector);
    return await expect.soft(this.page.locator(selector)).toContainText(text);
  }


  async verifyElementAttribute(selector, attribute, value) {
    await this.page.waitForSelector(selector);
    const textValue = await this.page.getAttribute(selector, attribute);
    return expect.soft(textValue.trim()).toBe(value);
  }

  async verifyContainsUrl(url){
      await expect(page).toHaveURL(url);
  }

  async verifyToHaveText(identifier, expectedText){
      await expect.soft(this.page.locator(identifier)).toHaveText(expectedText);
  }

  async verifyToHaveVlue(identifier, inputFieldText){
      await expect.soft(this.page.locator(identifier)).toHaveValue(inputFieldText);
  }

  async verifyContainText(identifier, expectedText){
    await expect.soft(this.page.locator(identifier)).toContainText(expectedText);
  }

  async verifyToHaveAttrbutes(attr, value){
      await expect.soft(this.page.locator(identifier)).toHaveAttribute(attr, value);
  }

  async verifyToHaveCss(key, value){  
      await expect.soft(this.page.locator(identifier)).toHaveCSS(key, value);
  }

  async verifyElementIsVisible(identifier){
      await expect.soft(this.page.locator(identifier)).isVisible();
  }

  async verifyRadioBtnChecked(identifier){
      await expect.soft(this.page.locator(identifier)).toBeChecked();
  }

  async verifyTextBoxEditable(identifier){
      await expect.soft(this.page.locator(identifier)).toBeEditable();
  }

  async verifyTextBoxEnabled(identifier){
      await expect.soft(this.page.locator(identifier)).toBeEnabled();
  }

  async verifyElementFocused(identifier){
      await expect.soft(this.page.locator(identifier)).toBeFocused();
  }


  async verifyJSElementValue(selector, text) {
		const textValue = await this.page.$eval(selector, element => element.value)
		return expect(textValue.trim()).toBe(text)
	}

  async selectValueFromDropdown(selector, text) {
    await this.page.waitForSelector(selector);
    const dropdown = await this.page.locator(selector);
    return await dropdown.selectOption({ value: text });
  }

  async getValue(selector) {
    const element = await this.page.$(selector);
    return await element.inputValue();
  }
  async screenshot(path) {
    await this.page.screenshot({ path });
  }

  async waitForURL(url) {
    await this.page.waitForURL(url);
  }

  async waitForHidden(selector, options = {}) {
    await this.page.waitForSelector(selector, { state: "hidden", ...options });
  }

  async getFirstElementFromTheList(selector) {
    const rows = this.page.locator(selector);
    const count = await rows.count();
    for (let i = 0; i < count; ++i) {
      const firstItem = await rows.nth(0).textContent();
      return firstItem;
    }
  }

  async getLastElementFromTheList(selector) {
    const rows = this.page.locator(selector);
    const count = await rows.count();
    for (let i = 0; i < count; ++i) {
      const lastItem = await rows.nth(i).textContent();
      return lastItem;
    }
  }

  async switchToFrame(selector) {
    const frame = await this.page.$(selector);
    const frameContent = await frame.contentFrame();
    if (!frameContent) {
      throw new Error("Frame not found or cannot be accessed.");
    }
    this.page = frameContent;
  }

  async switchToMainFrame() {
    await this.page.waitForLoadState();
    this.page = await this.page.mainFrame();
  }

  async getTexts(selector) {
    const elements = await this.getElements(selector);
    const texts = await Promise.all(
      elements.map((element) => element.innerText())
    );
    return texts;
  }

  async getElementAttributeValue(selector, attribute) {
    await this.page.waitForSelector(selector);
    const textValue = await this.page.getAttribute(selector, attribute);
    return textValue;
  }


  async elementIsVisible(selector) {
    await this.page.waitForSelector(selector, { state: "visible" });
  }

  async elementIsNotVisible(selector) {
    const element = await this.page.$(selector);
    return element === null || !(await element.isVisible());
  }

  async readJsonFile(filePath) {
    try {
      const jsonData = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(jsonData);
      return data;
    } catch (error) {
      console.error("Error reading JSON file:", error);
      throw error;
    }
  }

  async getCount(selector) {
    await this.page.waitForSelector(selector);
    const count = await page.$$eval(selector, (elements) => elements.length);
    return count;
  }

  async hover(selector){
    await this.page.waitForSelector(selector);
    await this.page.hover(selector)
  }

  async hoverAndClick(selector, selector2) {
    await this.page.waitForSelector(selector);
    const element = await this.page.$(selector);
    await this.page.hover(element);
    await this.page.click(element.locator(selector2))

  }

async checkElement(selector){
  await this.page.check(selector)
}

async clickFirstElement(selector){
  await this.page.locator(selector).first().click()
}

async hoverFirstElement(selector){
 await this.page.locator(selector).first().hover();

}


async getElementByRole(attribute, name){
  await this.page.getByRole(`$attribute`, {name:`$name`});
}



async getFrame(){
  return  this.page.frame(frameLocator)
}


async takeScreenShot() {
  return expect(await this.page.screenshot()).toMatchSnapshot(
    'MyScreenShot.png'
  )
}

async upLoadFile(selector, fileName)
{
  let filePath = path.resolve('src');

  filePath = path.join(filePath, 'testdata', fileName);

  await this.page.locator(selector).setInputFiles(filePath);

  this.waitForSomeTime(4);
}

async scrollIntoViewIfNeed(selector)
{
    await this.page.locator(selector).scrollIntoViewIfNeeded();
}

async scrollbottom()
{
  await this.page.evaluate(() => {
     window.scrollTo(0, document.body.scrollHeight);
    });
}

 getRndInteger(min, max) {
	const number = Math.floor(Math.random() * (max - min) ) + min;
	return number.toString();
}

}


export default playwrightUtil;