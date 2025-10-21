import { expect, test } from "@playwright/test";

test.describe('@companyapi',
	() => {
        let company_id = null;
        test("create", async ({request, baseURL})=>{
            let res = await request.post(baseURL + "companies/", {
                headers: {
                    Authorization: `token ${process.env.API_TOKEN}`, // Set Authorization header with token
                  },              
                data: {"name":"D'Amore Inc"},
                });
        let status = res.status();
        console.log(`Login request status: ${status}`);

        // if (status !== 200) {
        //   throw new Error(`Login failed with status code: ${status}`);
        // }

        const responseData = await res.json();  
        console.log('Login response data:', responseData);
        console.log(responseData.response.result.id);

        company_id = responseData.response.result.id;

        res = await request.get(baseURL + `companies/${company_id}/`);

        status = res.status();
        console.log(`Login request status: ${status}`);


        const search_data = await res.json();

        console.log(search_data.response.results.name);
        expect(search_data.response.results.name).toEqual("D'Amore Inc");

        }); 
    });