import { request, expect } from '@playwright/test';

class BaseAPI{
    constructor(baseURL){
        this.baseURL = baseURL;
    }

    async getAuthToken(username, password){
        const endpoint = `auth/`;
        let payload = {
            "email": username,
            "password": password,
        }
        const data = await this.post(endpoint, {}, payload);
        this.token = data.response.token;
        return this.token;
    }

    async post(endpoint, headers, payload){
        const context = await request.newContext();
        const response = await context.post(this.baseURL + endpoint, {
            headers: headers,
            data: payload,
        });
        expect(response.status()).toBe(201);
        return await response.json();
    }

    async get(endpoint, headers, payload){
        const context = await request.newContext();
        const response = await context.get(this.baseURL + endpoint, {
            headers: headers,
            data: payload,
        });
        expect(response.status()).toBe(200);
        return await response.json();
    }

    async delete(endpoint, headers, payload){
        const context = await request.newContext();
        const response = await context.delete(this.baseURL + endpoint, {
            headers: headers,
            data: payload,
        });
        expect(response.status()).toBe(200);
        return await response.json();
    }
}

export default BaseAPI;