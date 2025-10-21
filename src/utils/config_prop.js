export const URL = process.env.URL +'';
export const UserName =  process.env.USERNAME + '';
export const PassWord = process.env.PASSWORD + '';
export const waitStatedomcontentloaded = 'domcontentloaded';
export const waitStatenetworkidle = 'networkidle';
export const waitStateLoad = 'load';
export const SHORT_TIMEOUT = 5;
export const MEDIUM_TIMEOUT = 20;
export const LONG_TIMEOUT = 45;
export const NavHome = 'Home';
export const NavCalendar = 'Calendar';
export const NavCompanies = 'Companies';
export const NavContacts = 'Contacts';
export const NavDeals = 'Deals';
export const NavTasks = 'Tasks';
export const NavCases = 'Cases';
export const NavCalls = 'Calls';
export const NavDocuments = 'Documents';
export const NavEmail = 'Email';
export const NavCampaigns = 'Campaigns';
export const NavForms = 'Forms';
export const NavReports = 'Reports';
export const operationViewType = "view";
export const operationEditType = "edit";
export const operationDeleteType = "delete";
export const operationcallType = "call";
export const operationcheckType = "check";

const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

// LambdaTest capabilities
const capabilities = {
  'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  'browserVersion': 'latest',
  'LT:Options': {
    'platform': 'Windows 10',
    'build': 'Playwright JS Build',
    'name': 'Playwright Test',
    'user': process.env.LT_USERNAME,
    'accessKey': process.env.LT_ACCESS_KEY,
    'network': true,
    'video': true,
    'console': true,
    'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
    'tunnelName': '', // Optional
    'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    'playwrightClientVersion': playwrightClientVersion
  }
}

export default capabilities;