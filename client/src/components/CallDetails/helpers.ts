import { Call } from '../../typings/api';
import { getDisplayDuration, getDisplayDateTime } from '../../utils';

export const getCallDetails = (call: Call) => {
  const length = getDisplayDuration(call.duration);
  const dateTime = getDisplayDateTime(call.timestamp);
  return {
    length,
    dateTime,
  };
};
