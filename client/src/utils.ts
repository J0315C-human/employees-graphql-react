export const getDisplayDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRem = seconds - minutes * 60;
  return `${minutes}:${secondsRem < 10 ? `0${secondsRem}` : secondsRem}`;
};
