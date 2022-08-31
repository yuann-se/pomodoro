export const generateRandomString = () => Math.random().toString(36).substring(2, 15);

export const secondsToTime = (sec: number) => {
  let hours: number | null = Math.floor(sec / 60 / 60);
  let minutes: number | null = Math.floor(sec / 60 - hours * 60);
  let seconds: number | null = Math.floor(sec - hours * 60 * 60 - minutes * 60);

  const hoursStr = hours ? `${hours} ч` : '';
  const minStr = minutes ? `${minutes} мин` : '';
  const secStr = seconds && !hours && !minutes ? `${seconds} сек` : '';

  return `${hoursStr} ${minStr} ${secStr}`
}
