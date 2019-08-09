import { EmployeeWithCalls } from '../../typings/api';
import { getDisplayDuration } from '../../utils';

export const getEmployeeStats = (emp: EmployeeWithCalls) => {
  const allCallsLength = emp.calls.reduce((prev, cur) => cur.duration + prev, 0);
  const avgCallSecs = Math.round(allCallsLength / emp.calls.length);
  const avgCallLength = getDisplayDuration(avgCallSecs);

  const totalResolved = emp.calls.filter(call => call.status === 'resolved').length;

  const flaggedCalls = emp.calls.filter(call => call.status === 'flagged').length;
  return {
    avgCallLength,
    resolutionRate: `${((totalResolved * 100) / emp.calls.length).toFixed(1)}%`,
    flaggedCalls,
  };
};
