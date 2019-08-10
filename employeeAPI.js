const { RESTDataSource } = require('apollo-datasource-rest');
const data = require('./data.js');
const faker = require('faker');

const getFakeNumCalls = () => faker.random.number(20) + 2;
const sortByTimestampAscending = (x, y) => x.timestamp - y.timestamp;
const sortByTimestampDescending = (x, y) => y.timestamp - x.timestamp;

class EmployeeAPI extends RESTDataSource {
  constructor() {
    super();
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

  employeeReducer(emp) {
    return {
      ...emp,
      calls: this.getEmployeeCalls(emp.id),
    }
  }
  
  setSeed(employeeId, callId = 0){
    faker.seed(1000 * (parseInt(`${employeeId}`) + 1) + parseInt(`${callId}`));
  }

  getEmployeeCalls(employeeId) {
    this.setSeed(employeeId);
    const numCalls = getFakeNumCalls();
    const calls = new Array(numCalls).fill(null).map((_, i) => 
      this.getEmployeeCall(employeeId, i)
    );
    return calls.sort(sortByTimestampDescending);
  }

  getEmployeeCall(employeeId, callIndex) {
    if (!this.employees[employeeId]) return null;
    this.setSeed(employeeId, callIndex);
    const callerName = faker.name.firstName() + ' ' + faker.name.lastName();
    const transcript = this.getCallTranscript(employeeId, callIndex);
    const secondsPerMessage = faker.random.number(45) + 7;
    return {
      id: `${employeeId}-${callIndex}`,
      duration: transcript.length * secondsPerMessage + faker.random.number(100),
      timestamp: faker.random.number(157766400) + 1407682335,
      status: faker.random.arrayElement(['flagged', 'unresolved', 'resolved']),
      caller: callerName,
      transcript, 
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
    this.setSeed(empId);
    const numCalls = getFakeNumCalls();
    if (callIdx >= numCalls ) return null;
    return this.getEmployeeCall(empId, parseInt(callNum));
  }

  getAllEmployees( { offset, limit, search } ) {
    const startIdx = offset || 0;
    const query = search ? search.trim().toLowerCase() : '';
    const filtered = this.employees.filter(emp => emp.name.toLowerCase().includes(query))
    return filtered.slice(startIdx, startIdx + limit).map(this.employeeReducer);
  }

  getEmployeeById( { id } ) {
    const emp = this.employees[parseInt(id)];
    return emp ? this.employeeReducer(emp) : null;
  }

  getCalls( { offset, limit, search } ) {
    const startIdx = offset || 0;
    const query = search ? search.trim().toLowerCase() : '';
    const allCalls = this.employees.reduce((calls, curEmp) => {
      return calls.concat(this.getEmployeeCalls(curEmp.id))
    }, []);
    const filtered = allCalls.filter(call => call.caller.toLowerCase().includes(query))
    return filtered
      .sort(sortByTimestampDescending)
      .slice(startIdx, startIdx + limit);
  }
}

module.exports = EmployeeAPI;