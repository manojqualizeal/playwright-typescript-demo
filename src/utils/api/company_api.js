import BaseAPI from "./base_api";


class CompanyAPI extends BaseAPI {
  constructor(baseURL) {
    super(baseURL);
  }

  async createCompany(payload) {
    const headers = {
      "content-type": "application/json",
      "Authorization": `Token ${this.token}`,
    }
    const endpoint = `companies/`;
    const response = await this.post(endpoint, headers, payload);
    return response.response.result.id;
  }

  async getCompanyByID(id) {
    const headers = {
      "Authorization": `Token ${this.token}`,
    }
    const endpoint = `companies/${id}/`;
    const payload = {};
    const response = await this.get(endpoint, headers, payload);
    return response;
  }

  async deleteByID(id) {
    const headers = {
      "Authorization": `Token ${this.token}`,
    }
    const endpoint = `companies/?company_id=${id}`;
    const payload = {};
    const response = await this.delete(endpoint, headers, payload);
    return response.response.success;
  }
}



export default CompanyAPI;