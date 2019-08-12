import { format } from 'date-fns';

export const getDisplayDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRem = seconds - minutes * 60;
  return `${minutes}:${secondsRem < 10 ? `0${secondsRem}` : secondsRem}`;
};

export const getDisplayDateTime = (timestamp: number) => format(new Date(timestamp * 1000), 'MMM Do, YYYY h:mm a');

export const getRouteDepth = (path: string) => {
  return path.split('/').filter(part => part !== '').length;
};
