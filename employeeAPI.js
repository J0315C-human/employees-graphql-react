const { RESTDataSource } = require('apollo-datasource-rest');
const data = require('./data.js');
const faker = require('faker');

class EmployeeAPI extends RESTDataSource {
  constructor() {
    super();
    // this.baseURL = 'https://randomuser.me/api/';
    // add indices as 'ids'
    this.employees = data;
    this.getEmployeeCalls = this.getEmployeeCalls.bind(this);
    this.employeeReducer = this.
    employeeReducer.bind(this);
    this.getCallTranscript = this.getCallTranscript.bind(this);
    this.getEmployeeById = this.getEmployeeById.bind(this);
    this.getAllEmployees = this.getAllEmployees.bind(this);
    this.getEmployeeCall = this.getEmployeeCall.bind(this);
    this.setSeed = this.setSeed.bind(this);
  }

  // employeeReducer(emp, order) {
  //   return {
  //     name: emp.name.first + ' ' + emp.name.last,
  //     id: `${order}`,
  //     location: {
  //       street: emp.location.street,
  //       city: emp.location.city,
  //       state: emp.location.state,
  //       postcode: emp.location.postcode,
  //     },
  //     details: {
  //       age: emp.dob.age,
  //       imageUrl: emp.picture.large,
  //     },
  //     contact: {
  //       email: emp.email,
  //       phone: emp.phone,
  //       username: emp.login.username,
  //     }
  //   }
  // }

  employeeReducer(emp) {
    return {
      ...emp,
      calls: this.getEmployeeCalls(emp.id),
    }
  }
  
  setSeed(employeeId, callId = 0){
    faker.seed(1000 * parseInt(employeeId) + parseInt(callId));
  }

  getEmployeeCalls(employeeId) {
    this.setSeed(employeeId);
    const numCalls = faker.random.number(10) + 2;
    return new Array(numCalls).fill(null).map((_, i) => 
      this.getEmployeeCall(employeeId, i)
    )
  }

  getEmployeeCall(employeeId, callIndex) {
    if (!this.employees[employeeId]) return null;
    this.setSeed(employeeId, callIndex);
    const callerName = faker.name.firstName() + ' ' + faker.name.lastName();
    return {
      id: `${employeeId}-${callIndex}`,
      duration: faker.random.number(),
      timestamp: faker.random.number(220838400) + 1344352809,
      status: faker.random.arrayElement(['flagged', 'unresolved', 'resolved']),
      caller: callerName,
      transcript: this.getCallTranscript(employeeId, callIndex),
    };
  }

  getCallTranscript(employeeId, callIndex) {
    this.setSeed(employeeId, callIndex);
    const callerName = faker.name.firstName() + ' ' + faker.name.lastName();
    const emp = this.employees[employeeId];
    const numMessages = faker.random.number(10) + 5;
    return new Array(numMessages).fill(null).map((_, i) => ({
      speaker: i % 2 === 0 ? emp.name : callerName,
      message: faker.lorem.sentences(faker.random.number(3) + 1),
    }))
  }

  getCallById( { id }) {
    const [ empId, callNum ] = id.split('-');
    const callIdx = parseInt(callNum);
    this.setSeed(empId)
    const numCalls = faker.random.number(10) + 2;
    if (callIdx >= numCalls ) return null;
    return this.getEmployeeCall(empId, parseInt(callNum));
  }

  // async getAllEmployees( { offset, limit }) {
  //   const response = await this.get('', { results: 100, seed: 'abc' });
  //   return response.results && Array.isArray(response.results)
  //   ? response.results.map(this.employeeReducer)
  //   : [];
  // }

  getAllEmployees( { offset, limit }) {
    const startIdx = offset || 0;
    return this.employees.slice(startIdx, startIdx + limit).map(this.employeeReducer);
  }

  getEmployeeById( { id } ) {
    const emp = this.employees[parseInt(id)];
    return emp ? this.employeeReducer(emp) : null;
  }
}

module.exports = EmployeeAPI;