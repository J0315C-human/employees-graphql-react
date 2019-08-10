export interface EmployeeLocation {
  street: string;
  city: string;
  state: string;
  postcode: string;
}

export interface EmployeeDetails {
  age: number;
  imageUrl: string;
}

export interface EmployeeContact {
  email: string;
  phone: string;
  username: string;
}

export interface Employee {
  name: string;
  id: string;
  location: EmployeeLocation;
  contact: EmployeeContact;
  details: EmployeeDetails;
}

export interface Call {
  id: string;
  duration: number;
  timestamp: number;
  caller: string;
  employee: string;
  transcript: { speaker: string; message: string }[];
  status: string;
}

export interface EmployeeWithCalls extends Employee {
  calls: Call[];
}
