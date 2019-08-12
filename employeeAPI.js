const { RESTDataSource } = require('apollo-datasource-rest');
const data = require('./data.js');
const faker = require('faker');

const getFakeNumCalls = () => faker.random.number(20) + 2;
const sortByTimestampAscending = (x, y) => x.timestamp - y.timestamp;
const sortByTimestampDescending = (x, y) => y.timestamp - x.timestamp;
const toTitleCase = (words) => {
  const parts = words.split(' ');
  return parts.map((part) => part[0].toUpperCase() + part.slice(1)).join(' ');
}

const filterEmployeesBySearch = (employees, search) => {
  const query = search ? search.trim().toLowerCase() : '';
  return employees.filter(emp => emp.name.toLowerCase().includes(query))
}

const filterCallsBySearchAndStatus = (calls, search, status) => {
  const query = search ? search.trim().toLowerCase() : '';
  return calls.filter(call => !status || status === 'all' || call.status === status)
    .filter(call => 
      call.caller.toLowerCase().includes(query)
  || call.employee.toLowerCase().includes(query))
  ;
}

/** The data returned from these methods are heavily faked with faker.js, using IDs as seed values to 
 * maintain consistent return values and give the appearance of a "real" database.
 */
class EmployeeAPI extends RESTDataSource {
  constructor() {
    super();
    this.employees = data.map(emp => ({
      ...emp,
      name: toTitleCase(emp.name),
      location: {
        ...emp.location,
        city: toTitleCase(emp.location.city),
        state: toTitleCase(emp.location.state),
      }
    }));
    this.getEmployeeCalls = this.getEmployeeCalls.bind(this);
    this.employeeReducer = this.
    employeeReducer.bind(this);
    this.getCallTranscript = this.getCallTranscript.bind(this);
    this.getEmployeeById = this.getEmployeeById.bind(this);
    this.getAllEmployees = this.getAllEmployees.bind(this);
    this.getEmployeeCall = this.getEmployeeCall.bind(this);
    this.setSeed = this.setSeed.bind(this);
    this.getAllCalls = this.getAllCalls.bind(this);
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
    const emp = this.employees[employeeId];
    if (!emp) return null;

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
      employee: emp.name,
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
    return filterEmployeesBySearch(this.employees, search)
      .slice(startIdx, startIdx + limit).map(this.employeeReducer);
  }

  getEmployeesPageCount( { limitPerPage, search } ) {
    const filtered = filterEmployeesBySearch(this.employees, search);
    return Math.ceil(filtered.length / limitPerPage);
  }

  getEmployeeById( { id } ) {
    const emp = this.employees[parseInt(id)];
    return emp ? this.employeeReducer(emp) : null;
  }

  getAllCalls () {
    return this.employees.reduce((calls, curEmp) => {
      return calls.concat(this.getEmployeeCalls(curEmp.id))
    }, []);
  }

  getCalls( { offset, limit, search, status } ) {
    const startIdx = offset || 0;
    const allCalls = this.getAllCalls();
    return filterCallsBySearchAndStatus(allCalls, search, status)
      .sort(sortByTimestampDescending)
      .slice(startIdx, startIdx + limit);
  }

  getCallsPageCount( { limitPerPage, search, status }) {
    const allCalls = this.getAllCalls();
    const filtered = filterCallsBySearchAndStatus(allCalls, search, status);
    return Math.ceil(filtered.length / limitPerPage);
  }

  getReports() {
    const allCalls = this.getAllCalls();
    const {
      callDurationTotal,
      totalResolved,
      totalFlagged,
    } = allCalls.reduce((prev, cur) => {
      if (cur.status === 'resolved'){
        prev.totalResolved += 1;
      } else if (cur.status === 'flagged'){
        prev.totalFlagged += 1;
      }
      prev.callDurationTotal += cur.duration;
      return prev;
    }, {
      callDurationTotal: 0,
      totalResolved : 0,
      totalFlagged: 0,
    });

    return {
      avgCallLength: Math.round(callDurationTotal / allCalls.length),
      resolutionRate: totalResolved / allCalls.length,
      callsFlagged: totalFlagged,
      numEmployees: this.employees.length,
      numCalls: allCalls.length,
    }
  }
}

module.exports = EmployeeAPI;