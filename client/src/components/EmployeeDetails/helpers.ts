import { EmployeeWithCalls } from '../../typings/api';

export const getEmployeeStats = (emp: EmployeeWithCalls) => {
  const allCallsLength = emp.calls.reduce((prev, cur) => cur.duration + prev, 0);
  const avgCallSecs = Math.round(allCallsLength / emp.calls.length);
  const minutes = Math.floor(avgCallSecs / 60);
  const seconds = avgCallSecs - minutes * 60;
  const avgCallLength = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  const totalResolved = emp.calls.filter(call => call.status === 'resolved').length;

  const flaggedCalls = emp.calls.filter(call => call.status === 'flagged').length;
  return {
    avgCallLength,
    resolutionRate: `${((totalResolved * 100) / emp.calls.length).toFixed(1)}%`,
    flaggedCalls,
  };
};
