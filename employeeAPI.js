const { RESTDataSource } = require('apollo-datasource-rest');
const data = require('./data.js');

class EmployeeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://randomuser.me/api/';
    // add indices as 'ids'
    this.employees = data.map((emp, i) => ({ ...emp, id: `${i}` }));
  }

  employeeReducer(emp, order) {
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
        age: emp.dob.age,
        imageUrl: emp.picture.large,
      }
    }
  }

  async real_getAllEmployees() {
    const response = await this.get('', { results: 100, seed: 'abc' });
    return response.results && Array.isArray(response.results)
    ? response.results.map(emp => this.employeeReducer(emp))
    : [];
  }

  getAllEmployees( { offset, limit }) {
    const startIdx = offset || 0;
    return this.employees.slice(startIdx, startIdx + limit);
  }

  getEmployeeById( {id} ) {
    return this.employees[parseInt(id)];
  }
}

module.exports = EmployeeAPI;