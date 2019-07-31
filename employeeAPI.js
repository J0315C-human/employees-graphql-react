const { RESTDataSource } = require('apollo-datasource-rest');

class EmployeeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://randomuser.me/api/';
  }

  employeeReducer(emp) {
    return {
      name: emp.name.first + ' ' + emp.name.last,
      location: {
        street: emp.location.street,
        city: emp.location.city,
        state: emp.location.state,
        postcode: emp.location.postcode,
      },
      details: {
        email: emp.email,
        phone: emp.phone,
        username: emp.login.username,
        age: emp.dob.age
      }
    }
  }

  async getAllEmployees() {
    const response = await this.get('', { results: 10, seed: 'abc' });
    return response.results && Array.isArray(response.results)
    ? response.results.map(emp => this.employeeReducer(emp))
    : [];
  }

}

module.exports = EmployeeAPI;