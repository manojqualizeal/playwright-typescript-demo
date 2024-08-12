import { test as setup } from "@playwright/test";
import CompanyAPI from "../../utils/api/company-api";


setup("authenticate", async ({ request, baseURL }) => {
  const obj = new CompanyAPI();
  const data = await obj.getLoginToken("navyanalli9@gmail.com", "Lvuhdad55@");
  console.log(data);
  // const data = await obj.getCompanyData("e60303e2-43a5-44c4-a4a4-7751a68cf609");
  // console.log(data);

});