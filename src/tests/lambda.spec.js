

const { chromium } = require('playwright')
const { expect } = require('@playwright/test');
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Single Build',
      'name': 'Playwright Sample Test',
      'user': "vignesh.ponna",
      'accessKey': "TTcZMa4Yszygocm0Kjw5yZWfHK75z7vKgLdC45Rx7RWaw6rRjZ",
      'network': true,
      'video': true,
      'console': true,
      'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
      'tunnelName': '', // Optional
      'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
      'playwrightClientVersion': playwrightClientVersion
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()

  await page.goto("https://duckduckgo.com");

  let element = await page.locator("[name=\"q\"]");
  await element.click();
  await element.type("LambdaTest");
  await element.press("Enter");
  const title = await page.title()

  try {
    expect(title).toEqual('LambdaTest at DuckDuckGo')
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
    await teardown(page, browser)
  } catch (e) {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
    await teardown(page, browser)
    throw e
  }

})()




test.describe('@smoke: Login as a user and Verify login is successful',
	() => {
		test('New Application', async ({
			playwrightUtil,
			applicationGeneric,
            loginPage,
			companies
		}) => {

            const capabilities = {
                'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
                'browserVersion': 'latest',
                'LT:Options': {
                  'platform': 'Windows 10',
                  'build': 'Playwright Single Build',
                  'name': 'Playwright Sample Test',
                  'user': "vignesh.ponna",
                  'accessKey': "TTcZMa4Yszygocm0Kjw5yZWfHK75z7vKgLdC45Rx7RWaw6rRjZ",
                  'network': true,
                  'video': true,
                  'console': true,
                  'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
                  'tunnelName': '', // Optional
                  'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
                  'playwrightClientVersion': playwrightClientVersion
                }
              }
            
              const browser = await chromium.connect({
                wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
              })


                await test.step(`Open the URL and Enter Username and Password & Verify the user is logged in`, async () => 
				{

					await loginPage.login(configprop.UserName,configprop.PassWord);

					await loginPage.verifyLoginIsSuccessful();

					// await applicationGeneric.selectValueFromAutoCompleteSearch(companiesLocators.txtTags,"Demo deal",10);

					// await applicationGeneric.selectItemFromDropdown(companiesLocators.btnPriority,commonLocators.listDropDown,"Medium");

					// await playwrightUtil.waitForSomeTime(10);

      
			})

			await test.step(`Create Company`, async () =>
			 {

				await companies.navigateToCompanies();

				// await applicationGeneric.selectEntity(configprop.NavCompanies);

				await applicationGeneric.createButton("Create new Company");

				const objCompanyData = await objReadData.readSingleRowtestdataFromExcel("CRM.xlsx","Companies","TC1");

				await companies.createCompany(objCompanyData);

				await companies.navigateToCompanies();

				await companies.verifyCreatedCompany(objCompanyData.Name);

				await companies.deleteAndPurge(objCompanyData.Name);


	         })

    });
});

async function teardown(page, browser) {
    await page.close();
    await browser.close();
  }