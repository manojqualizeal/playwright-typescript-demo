import CompanyAPI from "./company_api";

import { test } from "@playwright/test";

test.describe('@companyapi',
    () => {
        test("create", async () => {
            const baseURL = process.env.API_URL;
            var companyAPI = new CompanyAPI(baseURL);

            const username = process.env.USERNAME;
            const password = process.env.PASSWORD;

            const token = await companyAPI.getAuthToken(username, password);
            console.log("Token: " + token);

            const payload = { "name": "Naruto", "description": "Alter amplexus adduco copia. Canto territo accendo sapiente animus volup. Quibusdam audentia calcar ipsam.", "url": "https://wide-eyed-ethyl.net/", "private": true, "rating": 0, "tags": ["volaticus"] }
            const id = await companyAPI.createCompany(payload);
            console.log("Company is created with id: " + id);

            const companyResponse = await companyAPI.getCompanyByID(id);
            console.log("Response from retreving company details with id " + id + " is ");
            console.log(companyResponse);

            const deleteResponse = await companyAPI.deleteByID(id);
            console.log("Delete response is " + deleteResponse);
        });
    });

